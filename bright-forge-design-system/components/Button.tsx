import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'link';
  children: React.ReactNode;
}

/**
 * Bright Forge Button Component
 *
 * @example
 * // Primary button
 * <Button variant="primary">Get Started</Button>
 *
 * // Link button
 * <Button variant="link">Learn More</Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variantStyles = {
      primary: 'bg-orange-500 hover:bg-orange-600 text-white rounded-md px-6 py-3 text-sm',
      link: 'text-orange-500 hover:text-orange-600 p-0 underline-offset-4 hover:underline',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
