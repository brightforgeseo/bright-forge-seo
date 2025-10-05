import React from 'react';
import { Button } from './Button';

export interface HeroProps {
  title: string;
  highlightedText?: string;
  subtitle: string;
  ctaText: string;
  ctaLink?: string;
  onCtaClick?: () => void;
  imageSrc: string;
  imageAlt: string;
}

/**
 * Bright Forge Hero Section Component
 * Two-column layout with text on left, image on right
 * Stacks on mobile
 *
 * @example
 * <Hero
 *   title="Your Main Headline"
 *   highlightedText="Key Word"
 *   subtitle="Your value proposition"
 *   ctaText="Get Started"
 *   ctaLink="/contact"
 *   imageSrc="/hero.jpg"
 *   imageAlt="Hero image description"
 * />
 */
export const Hero: React.FC<HeroProps> = ({
  title,
  highlightedText,
  subtitle,
  ctaText,
  ctaLink,
  onCtaClick,
  imageSrc,
  imageAlt,
}) => {
  return (
    <section className="grid md:grid-cols-2 items-center gap-10">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          {title}{' '}
          {highlightedText && (
            <span className="text-orange-500">{highlightedText}</span>
          )}
        </h1>
        <p className="mt-4 text-lg text-gray-600">{subtitle}</p>
        {ctaLink ? (
          <a href={ctaLink}>
            <Button className="mt-6">{ctaText}</Button>
          </a>
        ) : (
          <Button className="mt-6" onClick={onCtaClick}>
            {ctaText}
          </Button>
        )}
      </div>
      <img
        src={imageSrc}
        alt={imageAlt}
        className="rounded-xl shadow-lg w-full h-auto object-cover"
      />
    </section>
  );
};
