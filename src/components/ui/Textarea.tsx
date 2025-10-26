import React, { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, resize = 'vertical', className = '', ...props }, ref) => {
    const baseStyles = 'w-full px-4 py-3 border rounded-lg transition-colors focus:outline-none focus:ring-2';
    const normalStyles = 'border-gray-300 focus:border-primary focus:ring-primary/20';
    const errorStyles = 'border-error focus:border-error focus:ring-error/20';
    
    const resizeStyles = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`${baseStyles} ${error ? errorStyles : normalStyles} ${resizeStyles[resize]} ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-error">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
