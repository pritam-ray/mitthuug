import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helperText, 
    leftIcon, 
    rightIcon, 
    fullWidth = false, 
    className = '', 
    ...props 
  }, ref) => {
    const baseStyles = 'block w-full px-4 py-3 text-brand-dark bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1';
    const errorStyles = error 
      ? 'border-error focus:border-error focus:ring-error' 
      : 'border-border focus:border-brand-primary focus:ring-brand-primary';
    const iconPadding = leftIcon ? 'pl-11' : rightIcon ? 'pr-11' : '';
    
    const inputClassName = `${baseStyles} ${errorStyles} ${iconPadding} ${className}`;
    
    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="block text-sm font-medium text-brand-secondary mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-primary">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={inputClassName}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-brand-primary">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-error">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-2 text-sm text-brand-secondary opacity-70">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
