import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
}

interface ReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  onWriteReview?: () => void;
}

const Reviews: React.FC<ReviewsProps> = ({
  reviews,
  averageRating,
  totalReviews,
  ratingDistribution,
  onWriteReview,
}) => {
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating-high' | 'rating-low'>('recent');

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'helpful':
        return b.helpful - a.helpful;
      case 'rating-high':
        return b.rating - a.rating;
      case 'rating-low':
        return a.rating - b.rating;
      case 'recent':
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizes = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
    };

    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`${sizes[size]} ${
              index < rating ? 'text-warning fill-warning' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8 border-b border-gray-200">
        {/* Overall Rating */}
        <div className="text-center lg:text-left">
          <div className="text-5xl font-bold text-gray-900 mb-2">
            {averageRating.toFixed(1)}
          </div>
          {renderStars(Math.round(averageRating), 'lg')}
          <p className="text-gray-600 mt-2">Based on {totalReviews} reviews</p>
          {onWriteReview && (
            <Button
              variant="outline"
              size="md"
              onClick={onWriteReview}
              className="mt-4"
            >
              Write a Review
            </Button>
          )}
        </div>

        {/* Rating Distribution */}
        <div className="lg:col-span-2 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingDistribution[star as keyof typeof ratingDistribution];
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

            return (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 w-12">
                  {star} star
                </span>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, delay: (5 - star) * 0.1 }}
                    className="h-full bg-warning"
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="font-display text-xl font-semibold">
          Customer Reviews ({totalReviews})
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="recent">Most Recent</option>
          <option value="helpful">Most Helpful</option>
          <option value="rating-high">Highest Rating</option>
          <option value="rating-low">Lowest Rating</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="pb-6 border-b border-gray-200 last:border-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{review.author}</span>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-xs text-success">
                        <CheckCircle className="w-3 h-3" />
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  {renderStars(review.rating, 'sm')}
                </div>
                <time className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>

              {review.title && (
                <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
              )}

              <p className="text-gray-700 leading-relaxed mb-3">{review.comment}</p>

              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span>Helpful ({review.helpful})</span>
              </button>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No reviews yet. Be the first to review!</p>
            {onWriteReview && (
              <Button variant="primary" size="md" onClick={onWriteReview}>
                Write a Review
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
