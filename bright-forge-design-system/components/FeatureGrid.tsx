import React from 'react';
import { Card, CardContent } from './Card';

export interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface FeatureGridProps {
  title: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
}

/**
 * Bright Forge Feature Grid Component
 * Responsive grid that displays features/services
 *
 * @example
 * const features = [
 *   { title: 'Feature 1', description: 'Description here' },
 *   { title: 'Feature 2', description: 'Description here' },
 * ];
 *
 * <FeatureGrid
 *   title="Our Services"
 *   features={features}
 *   columns={3}
 * />
 */
export const FeatureGrid: React.FC<FeatureGridProps> = ({
  title,
  features,
  columns = 3,
}) => {
  const gridColsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  };

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridColsClass[columns]} gap-6`}>
        {features.map((feature, index) => (
          <Card key={index} className="text-center">
            <CardContent>
              {feature.icon && (
                <div className="flex justify-center mb-4">{feature.icon}</div>
              )}
              <h3 className="font-semibold text-xl text-orange-500 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
