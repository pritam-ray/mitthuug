import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  variant = 'rectangular',
  width,
  height,
  animation = true
}) => {
  const baseStyles = 'bg-gray-200 dark:bg-gray-700';
  
  const variants = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };

  const style: React.CSSProperties = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1rem' : '100%'),
  };

  const skeletonElement = (
    <div 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={style}
    />
  );

  if (!animation) return skeletonElement;

  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className="w-full"
    >
      {skeletonElement}
    </motion.div>
  );
};

interface ProductCardSkeletonProps {
  count?: number;
}

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <Skeleton variant="rectangular" height="200px" />
          <div className="space-y-2">
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </div>
          <Skeleton variant="rectangular" height="40px" />
        </div>
      ))}
    </>
  );
};

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  color = 'text-primary',
  className = '' 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <motion.div
      className={`${sizes[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <svg
        className={`${sizes[size]} ${color}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </motion.div>
  );
};

interface LoadingOverlayProps {
  message?: string;
  fullScreen?: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  message = 'Loading...', 
  fullScreen = false 
}) => {
  const containerClass = fullScreen 
    ? 'fixed inset-0 z-overlay' 
    : 'absolute inset-0';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${containerClass} bg-white/80 dark:bg-gray-900/80 flex flex-col items-center justify-center`}
    >
      <Spinner size="lg" />
      {message && <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">{message}</p>}
    </motion.div>
  );
};
