import React, { forwardRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, placeholder, size = 'md', className = '', ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const baseStyles = 'w-full border rounded-lg transition-all focus:outline-none focus:ring-2 appearance-none bg-white dark:bg-gray-800';
    const normalStyles = 'border-gray-300 focus:border-primary focus:ring-primary/20';
    const errorStyles = 'border-error focus:border-error focus:ring-error/20';
    
    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`${baseStyles} ${error ? errorStyles : normalStyles} ${sizes[size]} ${className} pr-10`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronDown 
              className={`w-5 h-5 transition-colors ${
                isFocused ? 'text-primary' : 'text-gray-400'
              }`} 
            />
          </div>
        </div>
        {error && <p className="mt-1 text-sm text-error">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
