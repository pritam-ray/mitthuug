import { useState, useEffect } from 'react';
import { wishlistApi } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  products?: {
    id: string;
    name: string;
    price: number;
    image_url: string;
    stock: number;
  };
}

export const useWishlist = () => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  const fetchWishlist = async () => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await wishlistApi.get();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch wishlist'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const addToWishlist = async (productId: string) => {
    try {
      await wishlistApi.add(productId);
      await fetchWishlist(); // Refresh list
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to add to wishlist');
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      await wishlistApi.remove(productId);
      await fetchWishlist(); // Refresh list
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to remove from wishlist');
    }
  };

  const isInWishlist = (productId: string) => {
    return items.some((item) => item.product_id === productId);
  };

  return {
    items,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
};
