import React from 'react';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;
  href: string;
  icon?: React.ReactNode;
}

export interface FooterProps {
  brandName: string;
  tagline?: string;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  copyrightText?: string;
}

/**
 * Bright Forge Footer Layout Component
 * Multi-column footer with brand, links, and social
 *
 * @example
 * <Footer
 *   brandName="My Business"
 *   tagline="Your tagline"
 *   sections={[
 *     {
 *       title: 'Company',
 *       links: [{ label: 'About', href: '/about' }],
 *     },
 *   ]}
 * />
 */
export const Footer: React.FC<FooterProps> = ({
  brandName,
  tagline,
  sections,
  socialLinks,
  copyrightText,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-white text-xl font-bold mb-2">{brandName}</h3>
            {tagline && <p className="text-gray-400 text-sm">{tagline}</p>}

            {/* Social Links */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex gap-4 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.href}
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                    aria-label={social.platform}
                  >
                    {social.icon || social.platform}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Footer Sections */}
          {sections?.map((section, index) => (
            <div key={index}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-orange-500 transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          {copyrightText || `© ${currentYear} ${brandName}. All rights reserved.`}
        </div>
      </div>
    </footer>
  );
};
