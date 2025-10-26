import { useState, useEffect } from 'react';
import { ordersApi } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface Order {
  id: string;
  user_id: string;
  total: number;
  subtotal: number;
  shipping_cost: number;
  discount: number;
  status: string;
  payment_status: string;
  payment_method: string;
  shipping_address: Record<string, string>;
  created_at: string;
  updated_at: string;
  order_items?: Array<{
    id: string;
    product_id: string;
    quantity: number;
    price: number;
    products?: {
      name: string;
      image_url: string;
    };
  }>;
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await ordersApi.getByUserId();
        setOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch orders'));
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return { orders, loading, error };
};

export const useOrder = (orderId: string) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await ordersApi.getById(orderId);
        setOrder(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch order'));
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  return { order, loading, error };
};

export const useCreateOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createOrder = async (orderData: {
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
  }) => {
    try {
      setLoading(true);
      setError(null);

      const order = await ordersApi.create(orderData);
      return order;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create order');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createOrder, loading, error };
};
