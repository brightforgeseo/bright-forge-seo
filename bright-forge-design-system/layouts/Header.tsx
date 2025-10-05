import React from 'react';
import { Button } from '../components/Button';

export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderProps {
  logo?: string;
  brandName: string;
  navLinks: NavLink[];
  ctaText?: string;
  ctaLink?: string;
}

/**
 * Bright Forge Header Layout Component
 * Sticky header with responsive mobile menu
 *
 * @example
 * <Header
 *   brandName="My Business"
 *   navLinks={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Services', href: '/services' },
 *   ]}
 *   ctaText="Contact Us"
 *   ctaLink="/contact"
 * />
 */
export const Header: React.FC<HeaderProps> = ({
  logo,
  brandName,
  navLinks,
  ctaText,
  ctaLink,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            {logo && (
              <img src={logo} alt={`${brandName} logo`} className="h-8 w-auto" />
            )}
            <span className="text-xl font-bold text-gray-900">{brandName}</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
            {ctaText && ctaLink && (
              <a href={ctaLink}>
                <Button variant="primary">{ctaText}</Button>
              </a>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 hover:text-orange-500 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {ctaText && ctaLink && (
                <a href={ctaLink}>
                  <Button variant="primary" className="w-full">
                    {ctaText}
                  </Button>
                </a>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
