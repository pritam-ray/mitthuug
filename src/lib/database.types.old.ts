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
      users: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          phone?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          role?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          short_description: string
          price: number
          image_url: string
          images: string[]
          category: string
          stock: number
          in_stock: boolean
          featured: boolean
          nutrition_facts: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description: string
          short_description: string
          price: number
          image_url: string
          images?: string[]
          category?: string
          stock?: number
          in_stock?: boolean
          featured?: boolean
          nutrition_facts?: Json | null
        }
        Update: {
          name?: string
          slug?: string
          description?: string
          short_description?: string
          price?: number
          image_url?: string
          images?: string[]
          stock?: number
          in_stock?: boolean
          featured?: boolean
          nutrition_facts?: Json | null
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          user_id: string | null
          customer_name: string
          customer_email: string
          customer_phone: string
          shipping_address: string
          billing_address: string | null
          items: Json
          subtotal: number
          tax: number
          delivery_fee: number
          total_amount: number
          status: string
          payment_status: string
          payment_method: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          order_number: string
          user_id?: string | null
          customer_name: string
          customer_email: string
          customer_phone: string
          shipping_address: string
          billing_address?: string | null
          items: Json
          subtotal: number
          tax?: number
          delivery_fee?: number
          total_amount: number
          status?: string
          payment_status?: string
          payment_method?: string | null
          notes?: string | null
        }
        Update: {
          status?: string
          payment_status?: string
          notes?: string | null
        }
      }
      reviews: {
        Row: {
          id: string
          product_id: string
          user_id: string | null
          name: string
          email: string | null
          rating: number
          title: string
          text: string
          verified_purchase: boolean
          helpful_count: number
          status: string
          created_at: string
        }
      }
      analytics: {
        Row: {
          id: string
          user_id: string | null
          session_id: string | null
          event_type: string
          event_data: Json | null
          page: string | null
          referrer: string | null
          device: string | null
          browser: string | null
          ip_address: string | null
          timestamp: string
        }
        Insert: {
          user_id?: string | null
          session_id?: string | null
          event_type: string
          event_data?: Json | null
          page?: string | null
          referrer?: string | null
          device?: string | null
          browser?: string | null
          ip_address?: string | null
        }
      }
    }
  }
}
