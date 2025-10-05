import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent';
  children: React.ReactNode;
}

/**
 * Bright Forge Card Component
 *
 * @example
 * // Default card
 * <Card>
 *   <h3>Title</h3>
 *   <p>Content</p>
 * </Card>
 *
 * // Accent card (pink background)
 * <Card variant="accent">
 *   <p>Highlighted content</p>
 * </Card>
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', children, ...props }, ref) => {
    const baseStyles = 'rounded-lg border shadow-sm p-6';

    const variantStyles = {
      default: 'bg-white border-gray-200',
      accent: 'bg-pink-50 border-pink-100',
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);
