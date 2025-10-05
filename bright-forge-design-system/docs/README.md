# Bright Forge Design System

A reusable component library and design system based on the Bright Forge SEO brand. This is **not a template or starter project** - it's a collection of components, layouts, and brand configuration that can be dropped into any new or existing project.

## 📦 What's Included

- **Brand Configuration** (`config/brand.config.ts`) - All design tokens (colors, typography, spacing)
- **Tailwind Preset** (`config/tailwind.preset.js`) - Plug-and-play Tailwind configuration
- **Reusable Components** - Button, Card, Hero, FeatureGrid, ContactCTA
- **Layout Components** - Header, Footer
- **TypeScript Types** - Fully typed for better DX

## 🎨 Brand Design Tokens

### Colors
- **Primary**: Orange (#f97316) with hover state (#ea580c)
- **Accents**: Pink (#fdf2f8), Green (#22c55e)
- **Neutrals**: Full gray scale

### Typography
- System font stack for optimal performance
- Predefined heading sizes (H1, H2, H3)
- Body text sizes (base, large, small)

### Spacing & Layout
- Consistent spacing scale (4px - 48px)
- Responsive breakpoints (sm, md, lg, xl)
- Standard section patterns

## 🚀 Usage

### 1. Copy this folder into your project

```bash
# Copy the entire design system folder
cp -r bright-forge-design-system /path/to/your-project/
```

### 2. Install dependencies

Make sure your project has these installed:

```bash
npm install react react-dom tailwindcss
# For TypeScript projects
npm install -D typescript @types/react @types/react-dom
```

### 3. Configure Tailwind CSS

In your `tailwind.config.js`:

```javascript
module.exports = {
  presets: [
    require('./bright-forge-design-system/config/tailwind.preset.js')
  ],
  content: [
    './bright-forge-design-system/**/*.{ts,tsx}',
    // ... your other content paths
  ],
  // ... rest of your config
}
```

### 4. Import and use components

```tsx
import { Button, Card, Hero } from './bright-forge-design-system/components';
import { Header, Footer } from './bright-forge-design-system/layouts';
import { brandConfig } from './bright-forge-design-system/config/brand.config';

// Use in your pages
function MyPage() {
  return (
    <>
      <Header
        brandName={brandConfig.name}
        navLinks={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
        ]}
      />

      <Hero
        title="Your Headline"
        highlightedText="Goes Here"
        subtitle="Your value proposition"
        ctaText="Get Started"
        ctaLink="/contact"
        imageSrc="/hero.jpg"
        imageAlt="Hero image"
      />

      <Footer brandName={brandConfig.name} />
    </>
  );
}
```

## 📚 Component Documentation

### Button

```tsx
import { Button } from './bright-forge-design-system/components';

// Primary button
<Button variant="primary">Click Me</Button>

// Link button
<Button variant="link">Learn More</Button>
```

### Card

```tsx
import { Card } from './bright-forge-design-system/components';

// Default card
<Card>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>

// Accent card (pink background)
<Card variant="accent">
  <p>Highlighted content</p>
</Card>
```

### Hero Section

```tsx
import { Hero } from './bright-forge-design-system/components';

<Hero
  title="Main Headline"
  highlightedText="Key Word"
  subtitle="Supporting text"
  ctaText="Get Started"
  ctaLink="/contact"
  imageSrc="/hero.jpg"
  imageAlt="Description"
/>
```

### Feature Grid

```tsx
import { FeatureGrid } from './bright-forge-design-system/components';

const features = [
  { title: 'Feature 1', description: 'Description here' },
  { title: 'Feature 2', description: 'Description here' },
];

<FeatureGrid
  title="Our Services"
  features={features}
  columns={3}
/>
```

### Contact CTA

```tsx
import { ContactCTA } from './bright-forge-design-system/components';

<ContactCTA
  title="Get in touch"
  highlightedText="today"
  description="Let's work together"
  contactInfo={{
    email: 'hello@example.com',
    phone: '(123) 456-7890',
  }}
  onSubmit={(formData) => {
    // Handle form submission
  }}
/>
```

### Header

```tsx
import { Header } from './bright-forge-design-system/layouts';

<Header
  brandName="My Business"
  logo="/logo.png"
  navLinks={[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ]}
  ctaText="Contact"
  ctaLink="/contact"
/>
```

### Footer

```tsx
import { Footer } from './bright-forge-design-system/layouts';

<Footer
  brandName="My Business"
  tagline="Your tagline"
  sections={[
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ]}
/>
```

## 🎯 Using Brand Config

Access brand values programmatically:

```tsx
import { brandConfig } from './bright-forge-design-system/config/brand.config';

// Use in your custom components
const MyComponent = () => (
  <div style={{ color: brandConfig.colors.primary.orange }}>
    {brandConfig.name}
  </div>
);

// Access spacing
const spacing = brandConfig.spacing[6]; // "1.5rem"

// Access typography
const h1Size = brandConfig.typography.fontSize.h1.desktop; // "3rem"
```

## 🔧 Customization

### For Client Projects

1. **Keep original design system intact** - Don't modify the files directly
2. **Override as needed** in your project's tailwind config or component styles
3. **For significant changes**, copy the design system and create a client-specific version

### Creating Client-Specific Version

```bash
# Copy and rename for a specific client
cp -r bright-forge-design-system client-name-design-system

# Modify the config/brand.config.ts with client colors
# Update config/tailwind.preset.js
# Customize components as needed
```

## 📱 Responsive Design

All components are mobile-first:
- **Mobile**: Base styles (single column)
- **Tablet (md: 768px)**: Two columns where appropriate
- **Desktop (lg: 1024px)**: Full multi-column layouts

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Focus states on all interactive elements
- Screen reader support
- Keyboard navigation support

## 🌐 Framework Compatibility

This design system works with:
- **Next.js** (App Router or Pages Router)
- **Remix**
- **Gatsby**
- **Create React App**
- Any React-based framework that supports Tailwind CSS

## 📄 License

This design system is property of Bright Forge SEO and for use in Bright Forge client projects.

---

## 🆘 Need Help?

Refer to individual component files for inline documentation and examples.
