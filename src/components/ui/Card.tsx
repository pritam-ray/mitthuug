import React from 'react';
import { motion } from 'framer-motion';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'product' | 'review' | 'blog';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hover = false,
  className = '',
  onClick,
}) => {
  const baseStyles = 'bg-white rounded-2xl overflow-hidden border border-brand-sand/30 transition-all duration-300';
  
  const variantStyles = {
    default: 'p-6',
    product: 'group shadow-md hover:shadow-2xl',
    review: 'p-6 bg-brand-cream',
    blog: 'overflow-hidden',
  };
  
  const hoverStyles = hover ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1' : '';
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`;
  
  if (hover || onClick) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={combinedClassName}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
};

export default Card;
