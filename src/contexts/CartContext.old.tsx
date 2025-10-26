import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { trackAddToCart } from '../lib/analytics';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  stock: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  subtotal: number;
  tax: number;
  deliveryFee: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const TAX_RATE = 0.05;
const DELIVERY_FEE = 50;
const FREE_DELIVERY_THRESHOLD = 500;

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  discount?: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  subtotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'mitthuug_cart';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Load from localStorage on initial mount
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (error) {
          console.error('Failed to parse cart from localStorage:', error);
          return [];
        }
      }
    }
    return [];
  });

  // Save to localStorage whenever items change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setItems((prev) => {
      // Check if item already exists
      const existingIndex = prev.findIndex((i) => i.productId === item.productId);
      
      if (existingIndex >= 0) {
        // Update quantity if item exists
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + (item.quantity || 1),
        };
        return updated;
      }
      
      // Add new item
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // Calculate subtotal (before discounts)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Calculate total discount
  const totalDiscount = items.reduce((sum, item) => {
    const itemDiscount = item.discount || 0;
    const discountAmount = (item.price * itemDiscount / 100) * item.quantity;
    return sum + discountAmount;
  }, 0);

  // Calculate final total
  const total = subtotal - totalDiscount;

  // Total number of items in cart
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    subtotal,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
