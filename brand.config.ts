/**
 * Bright Forge Brand Configuration
 *
 * This file contains all brand design tokens extracted from the Bright Forge SEO project.
 * It can be used across any JavaScript framework (Next.js, Astro, Remix, SvelteKit, etc.)
 */

export const brandConfig = {
  // Brand Identity
  name: "Bright Forge",
  tagline: "Leading SEO Agency",

  // Color Palette
  colors: {
    // Primary brand colors
    primary: {
      orange: "#f97316",      // orange-500 - main brand color
      orangeHover: "#ea580c", // orange-600 - hover states
    },

    // Accent colors
    accent: {
      pink: "#fdf2f8",        // pink-50 - background accents
      green: "#22c55e",       // green-500 - success/checkmarks
    },

    // Neutral colors
    neutral: {
      gray50: "#f9fafb",
      gray300: "#d1d5db",
      gray600: "#4b5563",     // text-gray-600 - secondary text
      gray700: "#374151",     // text-gray-700 - body text
      gray800: "#1f2937",     // text-gray-800 - primary text
      white: "#ffffff",
      black: "#000000",
    },
  },

  // Typography
  typography: {
    fontFamily: {
      sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },

    fontSize: {
      // Headings
      h1: {
        mobile: "2.25rem",    // text-4xl (36px)
        desktop: "3rem",      // text-5xl (48px)
        fontWeight: "700",    // font-bold
        lineHeight: "tight",
      },
      h2: {
        base: "1.875rem",     // text-3xl (30px)
        fontWeight: "700",
        lineHeight: "1.2",
      },
      h3: {
        base: "1.25rem",      // text-xl (20px)
        fontWeight: "600",    // font-semibold
        lineHeight: "1.75",
      },

      // Body text
      body: {
        base: "1rem",         // text-base (16px)
        large: "1.125rem",    // text-lg (18px)
        small: "0.875rem",    // text-sm (14px)
      },
    },
  },

  // Spacing Scale (Tailwind-based)
  spacing: {
    1: "0.25rem",    // 4px
    2: "0.5rem",     // 8px
    3: "0.75rem",    // 12px
    4: "1rem",       // 16px
    6: "1.5rem",     // 24px
    8: "2rem",       // 32px
    10: "2.5rem",    // 40px
    12: "3rem",      // 48px
  },

  // Layout
  layout: {
    // Responsive breakpoints
    breakpoints: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },

    // Container padding
    containerPadding: {
      mobile: "1.5rem",     // p-6
      desktop: "3rem",      // p-12
    },

    // Section gaps
    sectionGap: "2.5rem",   // gap-10
  },

  // Component Styles
  components: {
    // Button styles
    button: {
      primary: {
        backgroundColor: "#f97316",        // bg-orange-500
        backgroundColorHover: "#ea580c",   // hover:bg-orange-600
        textColor: "#ffffff",              // text-white
        padding: "0.75rem 1.5rem",         // py-3 px-6
        borderRadius: "0.375rem",          // rounded-md
        fontSize: "0.875rem",              // text-sm
        fontWeight: "500",                 // font-medium
        transition: "colors 200ms",
      },

      link: {
        textColor: "#f97316",              // text-orange-500
        textColorHover: "#ea580c",         // hover:text-orange-600
        padding: "0",
        textDecoration: "none",
      },
    },

    // Card styles
    card: {
      backgroundColor: "#ffffff",
      borderRadius: "0.5rem",              // rounded-lg
      borderWidth: "1px",
      borderColor: "#e5e7eb",
      boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",  // shadow-sm
      padding: "1.5rem",                   // p-6

      // Special card variants
      variants: {
        accent: {
          backgroundColor: "#fdf2f8",      // bg-pink-50
        },
      },
    },

    // Form input styles
    input: {
      padding: "0.75rem",                  // p-3
      borderRadius: "0.375rem",            // rounded
      borderWidth: "1px",
      borderColor: "#d1d5db",              // border-gray-300
      focusRing: "#f97316",                // focus:ring-orange-500
      focusBorder: "#f97316",              // focus:border-orange-500
      backgroundColor: "#ffffff",
      width: "100%",
    },
  },

  // Section Patterns
  sections: {
    // Hero section pattern
    hero: {
      layout: "grid",
      gridCols: { mobile: "1", desktop: "2" },
      gap: "2.5rem",
      alignItems: "center",
    },

    // Feature grid pattern
    featureGrid: {
      layout: "grid",
      gridCols: { mobile: "1", tablet: "2", desktop: "3" },
      gap: "1.5rem",
    },

    // Process steps pattern
    processSteps: {
      layout: "grid",
      gridCols: { mobile: "1", desktop: "4" },
      gap: "1.5rem",
    },

    // Contact/CTA section
    contactCTA: {
      backgroundColor: "#fdf2f8",          // bg-pink-50
      borderRadius: "0.75rem",             // rounded-xl
      padding: { mobile: "1.5rem", desktop: "2.5rem" },
      layout: "grid",
      gridCols: { mobile: "1", desktop: "2" },
      gap: "2.5rem",
    },
  },

  // Design Principles
  designPrinciples: {
    borderRadius: {
      default: "0.375rem",     // rounded-md
      large: "0.75rem",        // rounded-xl
      image: "0.75rem",        // rounded-xl for images
    },

    boxShadow: {
      default: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      large: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",  // shadow-lg
    },

    transitions: {
      colors: "200ms ease-in-out",
    },
  },

  // SEO defaults
  seo: {
    defaultTitle: "Bright Forge SEO | Leading SEO Agency",
    defaultDescription: "Bright Forge SEO helps businesses thrive online with focused strategies.",
    siteName: "Bright Forge SEO",
    twitterHandle: "@brightforgeseo",
    ogImage: "/og-image.jpg",
  },
} as const;

// Type exports for TypeScript projects
export type BrandConfig = typeof brandConfig;
export type BrandColors = typeof brandConfig.colors;
export type BrandTypography = typeof brandConfig.typography;
