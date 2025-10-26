import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

// Type aliases for easier use
type Product = Database['public']['Tables']['products']['Row'];
type OrderInsert = Database['public']['Tables']['orders']['Insert'];
type OrderItemInsert = Database['public']['Tables']['order_items']['Insert'];
type Review = Database['public']['Tables']['reviews']['Row'];

/**
 * Product API
 */
export const productApi = {
  // Get all products with optional filters
  async getAll(filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  }) {
    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true);

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.minPrice !== undefined) {
      query = query.gte('price', filters.minPrice);
    }

    if (filters?.maxPrice !== undefined) {
      query = query.lte('price', filters.maxPrice);
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as Product[];
  },

  // Get a single product by ID or slug
  async getById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Product;
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data as Product;
  },

  // Get featured products
  async getFeatured() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured', true)
      .limit(4);

    if (error) throw error;
    
    // If no featured products, fallback to all active products
    if (!data || data.length === 0) {
      const { data: allProducts, error: allError } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .limit(6);
      
      if (allError) throw allError;
      return allProducts as Product[];
    }
    
    return data as Product[];
  },

  // Get best sellers
  async getBestSellers() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('sold_count', { ascending: false })
      .limit(4);

    if (error) throw error;
    return data as Product[];
  },
};

/**
 * Reviews API
 */
export const reviewsApi = {
  // Get reviews for a product
  async getByProductId(productId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        users:user_id (
          id,
          email,
          user_metadata
        )
      `)
      .eq('product_id', productId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Review[];
  },

  // Create a review
  async create(review: {
    product_id: string;
    rating: number;
    title: string;
    comment: string;
  }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User must be logged in to review');

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        ...review,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update helpful count
  async markHelpful(reviewId: string) {
    const { data, error } = await supabase.rpc('increment_helpful_count', {
      review_id: reviewId,
    });

    if (error) throw error;
    return data;
  },
};

/**
 * Orders API
 */
export const ordersApi = {
  // Create a new order
  async create(orderData: {
    items: Array<{
      product_id: string;
      quantity: number;
      price: number;
    }>;
    shipping_address: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      state: string;
      pincode: string;
    };
    payment_method: string;
    coupon_code?: string;
  }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User must be logged in to place order');

    // Calculate totals
    const subtotal = orderData.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Apply coupon discount (simplified - should validate against coupons table)
    let discount = 0;
    if (orderData.coupon_code) {
      discount = subtotal * 0.1; // 10% discount for demo
    }

    // Calculate shipping
    const shipping = subtotal >= 499 ? 0 : 50;

    // Calculate total
    const total = subtotal - discount + shipping;

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        total: total,
        subtotal: subtotal,
        shipping_cost: shipping,
        discount: discount,
        status: 'pending',
        shipping_address: orderData.shipping_address,
        payment_method: orderData.payment_method,
        payment_status: 'pending',
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = orderData.items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return order;
  },

  // Get user's orders
  async getByUserId() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User must be logged in');

    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (*)
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get a single order
  async getById(orderId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User must be logged in');

    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (*)
        )
      `)
      .eq('id', orderId)
      .eq('user_id', user.id)
      .single();

    if (error) throw error;
    return data;
  },

  // Update order status (admin only - simplified for demo)
  async updateStatus(orderId: string, status: string) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

/**
 * Wishlist API
 */
export const wishlistApi = {
  // Get user's wishlist
  async get() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User must be logged in');

    const { data, error } = await supabase
      .from('wishlists')
      .select(`
        *,
        products (*)
      `)
      .eq('user_id', user.id);

    if (error) throw error;
    return data;
  },

  // Add to wishlist
  async add(productId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User must be logged in');

    const { data, error } = await supabase
      .from('wishlists')
      .insert({
        user_id: user.id,
        product_id: productId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Remove from wishlist
  async remove(productId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User must be logged in');

    const { error } = await supabase
      .from('wishlists')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId);

    if (error) throw error;
  },
};

/**
 * Addresses API
 */
export const addressesApi = {
  // Get user's addresses
  async get() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User must be logged in');

    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Add address
  async add(address: {
    label: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    is_default?: boolean;
  }) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User must be logged in');

    // If this is set as default, unset other defaults first
    if (address.is_default) {
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', user.id);
    }

    const { data, error } = await supabase
      .from('addresses')
      .insert({
        ...address,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update address
  async update(addressId: string, updates: Partial<{
    label: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    is_default: boolean;
  }>) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User must be logged in');

    // If setting as default, unset other defaults
    if (updates.is_default) {
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', user.id);
    }

    const { data, error } = await supabase
      .from('addresses')
      .update(updates)
      .eq('id', addressId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete address
  async delete(addressId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User must be logged in');

    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', addressId)
      .eq('user_id', user.id);

    if (error) throw error;
  },
};

/**
 * Newsletter API
 */
export const newsletterApi = {
  // Subscribe to newsletter
  async subscribe(email: string, name?: string) {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email,
        name,
        subscribed: true,
      })
      .select()
      .single();

    if (error) {
      // If email already exists, just return success
      if (error.code === '23505') {
        return { message: 'Already subscribed' };
      }
      throw error;
    }

    return data;
  },
};
