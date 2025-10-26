# MitthuuG API Documentation

Complete API reference for all backend services and integrations.

---

## Table of Contents

1. [Supabase API](#supabase-api)
2. [Custom React Hooks](#custom-react-hooks)
3. [Cart Context API](#cart-context-api)
4. [Auth Context API](#auth-context-api)
5. [Payment APIs](#payment-apis)
6. [Email APIs](#email-apis)

---

## Supabase API

### Products API

#### Get All Products

```typescript
import { productApi } from './services/api';

// Get all active products
const products = await productApi.getAll();

// Get products with filters
const filteredProducts = await productApi.getAll({
  category: 'Classic Collection',
  minPrice: 100,
  maxPrice: 200,
  search: 'jaggery'
});
```

**Parameters:**
- `category` (optional): Filter by category name
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `search` (optional): Search in name and description

**Returns:** `Product[]`

---

#### Get Product by ID

```typescript
const product = await productApi.getById('product-uuid');
```

**Parameters:**
- `id` (required): Product UUID

**Returns:** `Product`

---

#### Get Product by Slug

```typescript
const product = await productApi.getBySlug('classic-gud-bites');
```

**Parameters:**
- `slug` (required): URL-friendly product slug

**Returns:** `Product`

---

#### Get Featured Products

```typescript
const featuredProducts = await productApi.getFeatured();
```

**Returns:** `Product[]` (max 4 products)

---

#### Get Best Sellers

```typescript
const bestSellers = await productApi.getBestSellers();
```

**Returns:** `Product[]` (max 4 products, ordered by sold_count)

---

### Reviews API

#### Get Reviews for Product

```typescript
import { reviewsApi } from './services/api';

const reviews = await reviewsApi.getByProductId('product-uuid');
```

**Parameters:**
- `productId` (required): Product UUID

**Returns:** `Review[]` with user information

---

#### Create Review

```typescript
const review = await reviewsApi.create({
  product_id: 'product-uuid',
  rating: 5,
  title: 'Amazing product!',
  comment: 'Really loved the taste...'
});
```

**Parameters:**
- `product_id` (required): Product UUID
- `rating` (required): 1-5 stars
- `title` (required): Review title
- `comment` (required): Review text

**Returns:** `Review`

**Note:** User must be authenticated

---

#### Mark Review as Helpful

```typescript
await reviewsApi.markHelpful('review-uuid');
```

**Parameters:**
- `reviewId` (required): Review UUID

**Returns:** Updated helpful count

---

### Orders API

#### Create Order

```typescript
import { ordersApi } from './services/api';

const order = await ordersApi.create({
  items: [
    {
      product_id: 'product-uuid',
      quantity: 2,
      price: 149
    }
  ],
  shipping_address: {
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya@example.com',
    phone: '+919876543210',
    address: '123 Main Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001'
  },
  payment_method: 'card',
  coupon_code: 'WELCOME10' // optional
});
```

**Returns:** `Order` with order details and order_id

**Note:** User must be authenticated

---

#### Get User Orders

```typescript
const orders = await ordersApi.getByUserId();
```

**Returns:** `Order[]` with order_items and product details

**Note:** User must be authenticated

---

#### Get Single Order

```typescript
const order = await ordersApi.getById('order-uuid');
```

**Parameters:**
- `orderId` (required): Order UUID

**Returns:** `Order` with full details

---

### Wishlist API

#### Get Wishlist

```typescript
import { wishlistApi } from './services/api';

const wishlist = await wishlistApi.get();
```

**Returns:** `WishlistItem[]` with product details

---

#### Add to Wishlist

```typescript
await wishlistApi.add('product-uuid');
```

**Parameters:**
- `productId` (required): Product UUID

---

#### Remove from Wishlist

```typescript
await wishlistApi.remove('product-uuid');
```

**Parameters:**
- `productId` (required): Product UUID

---

### Addresses API

#### Get Addresses

```typescript
import { addressesApi } from './services/api';

const addresses = await addressesApi.get();
```

**Returns:** `Address[]` ordered by is_default

---

#### Add Address

```typescript
const address = await addressesApi.add({
  label: 'Home',
  firstName: 'Priya',
  lastName: 'Sharma',
  phone: '+919876543210',
  address: '123 Main Street',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400001',
  is_default: true
});
```

**Returns:** `Address`

---

#### Update Address

```typescript
const updated = await addressesApi.update('address-uuid', {
  is_default: true
});
```

**Parameters:**
- `addressId` (required): Address UUID
- `updates` (required): Partial address object

---

#### Delete Address

```typescript
await addressesApi.delete('address-uuid');
```

---

### Newsletter API

#### Subscribe

```typescript
import { newsletterApi } from './services/api';

await newsletterApi.subscribe('user@example.com', 'User Name');
```

**Parameters:**
- `email` (required): Email address
- `name` (optional): Subscriber name

---

## Custom React Hooks

### useProducts

```typescript
import { useProducts } from './hooks';

function ShopPage() {
  const { products, loading, error, refetch } = useProducts({
    category: 'Classic Collection',
    featured: false,
    autoFetch: true
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return <ProductGrid products={products} />;
}
```

**Options:**
- `category` (optional): Filter by category
- `minPrice` (optional): Min price filter
- `maxPrice` (optional): Max price filter
- `search` (optional): Search query
- `featured` (optional): Get only featured products
- `autoFetch` (optional, default: true): Auto-fetch on mount

**Returns:**
- `products`: Product array
- `loading`: Loading state
- `error`: Error object or null
- `refetch`: Function to manually refetch

---

### useProduct

```typescript
import { useProduct } from './hooks';

function ProductPage() {
  const { slug } = useParams();
  const { product, loading, error } = useProduct(slug, 'slug');

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!product) return <NotFound />;

  return <ProductDetail product={product} />;
}
```

**Parameters:**
- `identifier` (required): Product ID or slug
- `by` (optional, default: 'slug'): 'id' or 'slug'

---

### useOrders

```typescript
import { useOrders } from './hooks';

function AccountPage() {
  const { orders, loading, error } = useOrders();

  return (
    <div>
      {orders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
```

**Returns:**
- `orders`: Order array
- `loading`: Loading state
- `error`: Error object or null

---

### useCreateOrder

```typescript
import { useCreateOrder } from './hooks';

function CheckoutPage() {
  const { createOrder, loading, error } = useCreateOrder();

  const handleCheckout = async () => {
    try {
      const order = await createOrder({
        items: cartItems,
        shipping_address: shippingInfo,
        payment_method: 'card'
      });
      
      router.push(`/order-confirmation/${order.id}`);
    } catch (err) {
      console.error('Order failed:', err);
    }
  };

  return <CheckoutForm onSubmit={handleCheckout} />;
}
```

---

### useReviews

```typescript
import { useReviews } from './hooks';

function ProductPage({ productId }) {
  const { 
    reviews, 
    loading, 
    error, 
    averageRating, 
    ratingDistribution,
    totalReviews 
  } = useReviews(productId);

  return (
    <div>
      <RatingOverview 
        average={averageRating}
        total={totalReviews}
        distribution={ratingDistribution}
      />
      <ReviewsList reviews={reviews} />
    </div>
  );
}
```

---

### useWishlist

```typescript
import { useWishlist } from './hooks';

function ProductCard({ product }) {
  const { 
    items, 
    loading, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist 
  } = useWishlist();

  const inWishlist = isInWishlist(product.id);

  const toggleWishlist = async () => {
    if (inWishlist) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(product.id);
    }
  };

  return (
    <button onClick={toggleWishlist}>
      <Heart fill={inWishlist ? 'red' : 'none'} />
    </button>
  );
}
```

---

## Cart Context API

### useCart Hook

```typescript
import { useCart } from './contexts/CartContext';

function ProductPage({ product }) {
  const { 
    items,          // Cart items array
    addItem,        // Add item to cart
    removeItem,     // Remove item from cart
    updateQuantity, // Update item quantity
    clearCart,      // Clear all items
    total,          // Total price
    subtotal,       // Subtotal before discounts
    itemCount       // Total number of items
  } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: `cart-${product.id}`,
      productId: product.id,
      name: product.name,
      image: product.image_url,
      price: product.price,
      discount: product.discount || 0,
      quantity: 1 // optional, defaults to 1
    });
  };

  return (
    <div>
      <button onClick={handleAddToCart}>
        Add to Cart
      </button>
      <CartBadge count={itemCount} />
    </div>
  );
}
```

### CartItem Interface

```typescript
interface CartItem {
  id: string;           // Unique cart item ID
  productId: string;    // Product ID
  name: string;         // Product name
  image: string;        // Product image URL
  price: number;        // Product price
  quantity: number;     // Quantity in cart
  discount?: number;    // Discount percentage (optional)
}
```

---

## Auth Context API

### useAuth Hook

```typescript
import { useAuth } from './contexts/AuthContext';

function Header() {
  const { 
    user,       // Current user object or null
    loading,    // Auth loading state
    signIn,     // Sign in function
    signUp,     // Sign up function
    signOut,    // Sign out function
    resetPassword // Password reset function
  } = useAuth();

  if (loading) return <Loading />;

  return (
    <div>
      {user ? (
        <>
          <span>Welcome, {user.email}</span>
          <button onClick={signOut}>Logout</button>
        </>
      ) : (
        <button onClick={() => setShowAuth(true)}>Login</button>
      )}
    </div>
  );
}
```

### Sign In

```typescript
const { signIn } = useAuth();

const handleSignIn = async (email: string, password: string) => {
  try {
    await signIn(email, password);
    // User is now logged in
  } catch (error) {
    console.error('Sign in failed:', error.message);
  }
};
```

### Sign Up

```typescript
const { signUp } = useAuth();

const handleSignUp = async (email: string, password: string) => {
  try {
    await signUp(email, password);
    // User account created, check email for verification
  } catch (error) {
    console.error('Sign up failed:', error.message);
  }
};
```

### Sign Out

```typescript
const { signOut } = useAuth();

const handleSignOut = async () => {
  await signOut();
  router.push('/');
};
```

---

## Payment APIs

### Stripe Integration

```typescript
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

async function handleStripeCheckout(orderData) {
  const stripe = await stripePromise;
  
  // Create checkout session on backend
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  
  const { sessionId } = await response.json();
  
  // Redirect to Stripe Checkout
  const { error } = await stripe.redirectToCheckout({ sessionId });
  
  if (error) {
    console.error('Stripe error:', error);
  }
}
```

### Razorpay Integration

```typescript
declare global {
  interface Window {
    Razorpay: any;
  }
}

async function handleRazorpayCheckout(orderData) {
  // Create order on backend
  const response = await fetch('/api/create-razorpay-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  
  const { orderId, amount } = await response.json();
  
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: amount,
    currency: 'INR',
    name: 'MitthuuG',
    description: 'Order Payment',
    order_id: orderId,
    handler: function (response: any) {
      // Payment successful
      console.log('Payment ID:', response.razorpay_payment_id);
      console.log('Order ID:', response.razorpay_order_id);
    },
    prefill: {
      email: orderData.email,
      contact: orderData.phone
    },
    theme: {
      color: '#C6862E'
    }
  };
  
  const razorpay = new window.Razorpay(options);
  razorpay.open();
}
```

---

## Email APIs

### Send Transactional Email (Example with Resend)

```typescript
async function sendOrderConfirmation(order) {
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: order.email,
      subject: `Order Confirmation #${order.id}`,
      template: 'order-confirmation',
      data: {
        orderId: order.id,
        customerName: order.shipping_address.firstName,
        items: order.items,
        total: order.total,
        shippingAddress: order.shipping_address
      }
    })
  });
  
  return response.json();
}
```

---

## Error Handling

### Standard Error Response

All API functions throw errors with the following structure:

```typescript
try {
  const products = await productApi.getAll();
} catch (error) {
  console.error('Error:', error.message);
  // Display error to user
  toast.error(error.message);
}
```

### Common Error Codes

- **401 Unauthorized**: User not authenticated
- **403 Forbidden**: User doesn't have permission
- **404 Not Found**: Resource not found
- **422 Validation Error**: Invalid input data
- **500 Server Error**: Internal server error

---

## Rate Limiting

Supabase has built-in rate limiting:
- **Anonymous requests**: 60 requests per hour per IP
- **Authenticated requests**: 600 requests per hour per user

---

## Best Practices

### 1. Always Handle Loading States

```typescript
const { data, loading, error } = useProducts();

if (loading) return <LoadingSkeleton />;
if (error) return <ErrorMessage error={error} />;
```

### 2. Implement Error Boundaries

```typescript
<ErrorBoundary fallback={<ErrorPage />}>
  <ProductList />
</ErrorBoundary>
```

### 3. Use Optimistic Updates

```typescript
const addToCart = (product) => {
  // Update UI immediately
  setCart([...cart, product]);
  
  // Then sync with backend
  api.addToCart(product).catch(error => {
    // Revert on error
    setCart(cart.filter(item => item.id !== product.id));
    toast.error('Failed to add to cart');
  });
};
```

### 4. Cache API Responses

```typescript
// Use React Query or SWR for automatic caching
import { useQuery } from '@tanstack/react-query';

const { data: products } = useQuery({
  queryKey: ['products'],
  queryFn: () => productApi.getAll(),
  staleTime: 5 * 60 * 1000 // 5 minutes
});
```

### 5. Debounce Search Inputs

```typescript
import { useDebouncedValue } from './hooks/useDebouncedValue';

const [search, setSearch] = useState('');
const debouncedSearch = useDebouncedValue(search, 300);

useEffect(() => {
  if (debouncedSearch) {
    searchProducts(debouncedSearch);
  }
}, [debouncedSearch]);
```

---

## TypeScript Types

### Product

```typescript
interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price?: number;
  category: string;
  image_url: string;
  images?: string[];
  stock: number;
  is_featured: boolean;
  is_active: boolean;
  rating?: number;
  reviews_count?: number;
  sold_count?: number;
  weight?: string;
  ingredients?: string;
  nutrition_info?: Record<string, string>;
  created_at?: string;
  updated_at?: string;
}
```

### Order

```typescript
interface Order {
  id: string;
  user_id: string;
  total: number;
  subtotal: number;
  shipping_cost: number;
  discount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: string;
  shipping_address: ShippingAddress;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}
```

### Review

```typescript
interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string;
  comment: string;
  helpful_count: number;
  verified_purchase: boolean;
  created_at: string;
}
```

---

**For additional support, refer to:**
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Razorpay Documentation](https://razorpay.com/docs)
