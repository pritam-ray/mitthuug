import { useState, useEffect } from 'react';
import { reviewsApi } from '../services/api';

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
  users?: {
    id: string;
    email: string;
    user_metadata?: {
      name?: string;
      avatar_url?: string;
    };
  };
}

export const useReviews = (productId: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await reviewsApi.getByProductId(productId);
        setReviews(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch reviews'));
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
    percentage: reviews.length > 0
      ? (reviews.filter((r) => r.rating === stars).length / reviews.length) * 100
      : 0,
  }));

  return {
    reviews,
    loading,
    error,
    averageRating,
    ratingDistribution,
    totalReviews: reviews.length,
  };
};

export const useCreateReview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createReview = async (review: {
    product_id: string;
    rating: number;
    title: string;
    comment: string;
  }) => {
    try {
      setLoading(true);
      setError(null);

      const newReview = await reviewsApi.create(review);
      return newReview;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create review');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createReview, loading, error };
};
