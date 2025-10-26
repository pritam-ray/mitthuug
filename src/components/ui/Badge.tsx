import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  pill = false,
  className = '' 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-colors';
  
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-white',
    error: 'bg-error text-white',
    info: 'bg-info text-white',
    outline: 'bg-transparent border-2 border-primary text-primary',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  const roundedStyle = pill ? 'rounded-full' : 'rounded';

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${roundedStyle} ${className}`}
    >
      {children}
    </motion.span>
  );
};

export default Badge;
