// Auto-generated types from Supabase Database Schema
// Generated: October 23, 2025
// Last updated: After complete_ecommerce_schema migration

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          short_description: string | null
          price: number
          compare_at_price: number | null
          cost_price: number | null
          category: string
          subcategory: string | null
          tags: string[] | null
          image_url: string
          images: string[] | null
          sku: string | null
          barcode: string | null
          stock: number
          low_stock_threshold: number | null
          weight: number | null
          dimensions: Json | null
          nutrition_info: Json | null
          ingredients: string[] | null
          allergens: string[] | null
          rating: number
          review_count: number
          sold_count: number
          view_count: number
          is_featured: boolean
          is_active: boolean
          is_new: boolean
          is_bestseller: boolean
          meta_title: string | null
          meta_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          short_description?: string | null
          price: number
          compare_at_price?: number | null
          cost_price?: number | null
          category: string
          subcategory?: string | null
          tags?: string[] | null
          image_url: string
          images?: string[] | null
          sku?: string | null
          barcode?: string | null
          stock?: number
          low_stock_threshold?: number | null
          weight?: number | null
          dimensions?: Json | null
          nutrition_info?: Json | null
          ingredients?: string[] | null
          allergens?: string[] | null
          rating?: number
          review_count?: number
          sold_count?: number
          view_count?: number
          is_featured?: boolean
          is_active?: boolean
          is_new?: boolean
          is_bestseller?: boolean
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          short_description?: string | null
          price?: number
          compare_at_price?: number | null
          cost_price?: number | null
          category?: string
          subcategory?: string | null
          tags?: string[] | null
          image_url?: string
          images?: string[] | null
          sku?: string | null
          barcode?: string | null
          stock?: number
          low_stock_threshold?: number | null
          weight?: number | null
          dimensions?: Json | null
          nutrition_info?: Json | null
          ingredients?: string[] | null
          allergens?: string[] | null
          rating?: number
          review_count?: number
          sold_count?: number
          view_count?: number
          is_featured?: boolean
          is_active?: boolean
          is_new?: boolean
          is_bestseller?: boolean
          meta_title?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      product_variants: {
        Row: {
          id: string
          product_id: string
          name: string
          sku: string | null
          price: number
          compare_at_price: number | null
          stock: number
          image_url: string | null
          options: Json | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          name: string
          sku?: string | null
          price: number
          compare_at_price?: number | null
          stock?: number
          image_url?: string | null
          options?: Json | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          name?: string
          sku?: string | null
          price?: number
          compare_at_price?: number | null
          stock?: number
          image_url?: string | null
          options?: Json | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          product_id: string
          user_id: string
          rating: number
          title: string | null
          comment: string | null
          is_verified_purchase: boolean
          is_approved: boolean
          is_featured: boolean
          helpful_count: number
          images: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          user_id: string
          rating: number
          title?: string | null
          comment?: string | null
          is_verified_purchase?: boolean
          is_approved?: boolean
          is_featured?: boolean
          helpful_count?: number
          images?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          user_id?: string
          rating?: number
          title?: string | null
          comment?: string | null
          is_verified_purchase?: boolean
          is_approved?: boolean
          is_featured?: boolean
          helpful_count?: number
          images?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      review_helpful: {
        Row: {
          id: string
          review_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          review_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          review_id?: string
          user_id?: string
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          user_id: string | null
          customer_email: string
          customer_name: string
          customer_phone: string | null
          subtotal: number
          discount_amount: number
          shipping_cost: number
          tax_amount: number
          total: number
          shipping_address: Json
          billing_address: Json | null
          status: string
          payment_status: string
          payment_method: string | null
          payment_id: string | null
          coupon_code: string | null
          tracking_number: string | null
          tracking_url: string | null
          customer_notes: string | null
          admin_notes: string | null
          created_at: string
          updated_at: string
          paid_at: string | null
          shipped_at: string | null
          delivered_at: string | null
          cancelled_at: string | null
        }
        Insert: {
          id?: string
          order_number: string
          user_id?: string | null
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          subtotal: number
          discount_amount?: number
          shipping_cost?: number
          tax_amount?: number
          total: number
          shipping_address: Json
          billing_address?: Json | null
          status?: string
          payment_status?: string
          payment_method?: string | null
          payment_id?: string | null
          coupon_code?: string | null
          tracking_number?: string | null
          tracking_url?: string | null
          customer_notes?: string | null
          admin_notes?: string | null
          created_at?: string
          updated_at?: string
          paid_at?: string | null
          shipped_at?: string | null
          delivered_at?: string | null
          cancelled_at?: string | null
        }
        Update: {
          id?: string
          order_number?: string
          user_id?: string | null
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          subtotal?: number
          discount_amount?: number
          shipping_cost?: number
          tax_amount?: number
          total?: number
          shipping_address?: Json
          billing_address?: Json | null
          status?: string
          payment_status?: string
          payment_method?: string | null
          payment_id?: string | null
          coupon_code?: string | null
          tracking_number?: string | null
          tracking_url?: string | null
          customer_notes?: string | null
          admin_notes?: string | null
          created_at?: string
          updated_at?: string
          paid_at?: string | null
          shipped_at?: string | null
          delivered_at?: string | null
          cancelled_at?: string | null
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string | null
          variant_id: string | null
          product_name: string
          product_image: string | null
          sku: string | null
          price: number
          quantity: number
          discount_amount: number
          subtotal: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id?: string | null
          variant_id?: string | null
          product_name: string
          product_image?: string | null
          sku?: string | null
          price: number
          quantity: number
          discount_amount?: number
          subtotal: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string | null
          variant_id?: string | null
          product_name?: string
          product_image?: string | null
          sku?: string | null
          price?: number
          quantity?: number
          discount_amount?: number
          subtotal?: number
          created_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          full_name: string | null
          phone: string | null
          date_of_birth: string | null
          avatar_url: string | null
          preferences: Json | null
          loyalty_points: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          phone?: string | null
          date_of_birth?: string | null
          avatar_url?: string | null
          preferences?: Json | null
          loyalty_points?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          phone?: string | null
          date_of_birth?: string | null
          avatar_url?: string | null
          preferences?: Json | null
          loyalty_points?: number
          created_at?: string
          updated_at?: string
        }
      }
      addresses: {
        Row: {
          id: string
          user_id: string
          name: string
          phone: string
          address_line1: string
          address_line2: string | null
          city: string
          state: string
          pincode: string
          country: string
          address_type: string
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          phone: string
          address_line1: string
          address_line2?: string | null
          city: string
          state: string
          pincode: string
          country?: string
          address_type?: string
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          phone?: string
          address_line1?: string
          address_line2?: string | null
          city?: string
          state?: string
          pincode?: string
          country?: string
          address_type?: string
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      wishlist: {
        Row: {
          id: string
          user_id: string
          product_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          created_at?: string
        }
      }
      coupons: {
        Row: {
          id: string
          code: string
          description: string | null
          discount_type: string
          discount_value: number
          min_order_value: number | null
          max_discount_amount: number | null
          usage_limit: number | null
          usage_count: number
          per_user_limit: number
          valid_from: string
          valid_until: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          description?: string | null
          discount_type: string
          discount_value: number
          min_order_value?: number | null
          max_discount_amount?: number | null
          usage_limit?: number | null
          usage_count?: number
          per_user_limit?: number
          valid_from?: string
          valid_until?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          description?: string | null
          discount_type?: string
          discount_value?: number
          min_order_value?: number | null
          max_discount_amount?: number | null
          usage_limit?: number | null
          usage_count?: number
          per_user_limit?: number
          valid_from?: string
          valid_until?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      coupon_usage: {
        Row: {
          id: string
          coupon_id: string
          user_id: string | null
          order_id: string | null
          discount_amount: number
          created_at: string
        }
        Insert: {
          id?: string
          coupon_id: string
          user_id?: string | null
          order_id?: string | null
          discount_amount: number
          created_at?: string
        }
        Update: {
          id?: string
          coupon_id?: string
          user_id?: string | null
          order_id?: string | null
          discount_amount?: number
          created_at?: string
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          name: string | null
          source: string | null
          is_subscribed: boolean
          confirmed_at: string | null
          unsubscribed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          source?: string | null
          is_subscribed?: boolean
          confirmed_at?: string | null
          unsubscribed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          source?: string | null
          is_subscribed?: boolean
          confirmed_at?: string | null
          unsubscribed_at?: string | null
          created_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          featured_image: string | null
          author_id: string | null
          category: string | null
          tags: string[] | null
          meta_title: string | null
          meta_description: string | null
          status: string
          published_at: string | null
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          featured_image?: string | null
          author_id?: string | null
          category?: string | null
          tags?: string[] | null
          meta_title?: string | null
          meta_description?: string | null
          status?: string
          published_at?: string | null
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          featured_image?: string | null
          author_id?: string | null
          category?: string | null
          tags?: string[] | null
          meta_title?: string | null
          meta_description?: string | null
          status?: string
          published_at?: string | null
          view_count?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      mark_review_helpful: {
        Args: {
          review_uuid: string
          user_uuid: string
        }
        Returns: void
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
