import { useState, useEffect } from 'react';
import { productApi } from '../services/api';

export interface Product {
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
  is_new: boolean;
  is_bestseller: boolean;
  rating?: number;
  review_count?: number;
  sold_count?: number;
  weight?: string;
  ingredients?: string;
  nutrition_info?: Record<string, string>;
  created_at?: string;
  updated_at?: string;
}

interface UseProductsOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  featured?: boolean;
  autoFetch?: boolean;
}

export const useProducts = (options: UseProductsOptions = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { autoFetch = true, featured, ...filters } = options;

  useEffect(() => {
    if (!autoFetch) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        let data: Product[];
        if (featured) {
          data = await productApi.getFeatured();
        } else {
          data = await productApi.getAll(filters);
        }

        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch products'));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [autoFetch, featured, filters.category, filters.minPrice, filters.maxPrice, filters.search]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);

      let data: Product[];
      if (featured) {
        data = await productApi.getFeatured();
      } else {
        data = await productApi.getAll(filters);
      }

      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch products'));
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, refetch };
};

export const useProduct = (identifier: string, by: 'id' | 'slug' = 'slug') => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = by === 'slug'
          ? await productApi.getBySlug(identifier)
          : await productApi.getById(identifier);

        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch product'));
      } finally {
        setLoading(false);
      }
    };

    if (identifier) {
      fetchProduct();
    }
  }, [identifier, by]);

  return { product, loading, error };
};

export const useBestSellers = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await productApi.getBestSellers();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch best sellers'));
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  return { products, loading, error };
};
