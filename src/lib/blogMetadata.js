// SEO-optimized metadata overrides for blog posts
// This overrides the default title and description from Contentful

export const blogMetadata = {
  'the-parasitic-relationship-why-ai-cant-kill-seo-even-if-it-wants-to': {
    title: 'Expert AI Won\'t Kill SEO | Bright Forge SEO',
    description: 'The Parasitic Relationship: Why AI Can\'t Kill SEO reveals why AI depends on SEO to survive, not the other way around. Learn more about our services now.'
  },
  'importance-of-local-seo-for-small-businesses': {
    title: 'Local SEO for Small Businesses | Bright Forge SEO',
    description: 'Discover why local SEO is crucial for small businesses looking to expand their visibility and connect with local customers. Contact us today.'
  },
  'ai-tools-for-seo-and-content-creation': {
    title: 'AI Tools for SEO & Content | Bright Forge SEO',
    description: 'Learn how to balance AI tools for SEO and content creation while keeping your brand\'s unique voice intact. Contact us today for more information.'
  },
  'hyperlocal-seo-and-community-engagement': {
    title: 'Hyperlocal SEO Community Engagement | Bright Forge SEO',
    description: 'Master hyperlocal SEO and community engagement to dominate neighborhood search results with Bright Forge SEO. Contact us today for more information.'
  },
  'optimizing-for-zero-click-searches-and-featured-snippets-in-2025': {
    title: 'Zero-Click Search Optimization Guide | Bright Forge SEO',
    description: 'Learn strategies for optimizing for zero-click searches and featured snippets in 2025 with Bright Forge SEO. Contact us today for more information.'
  },
  'ai-seo-transformation': {
    title: 'AI Reckoning SEO Strategy | Bright Forge SEO',
    description: 'The AI Reckoning: Transformation, Not Termination, for Search Engine Optimisation explores how AI is reshaping SEO strategy. Contact us today.'
  },
  'answer-engine-revolution': {
    title: 'AI Overviews Strategy Guide | Bright Forge SEO',
    description: 'Master the Answer Engine Revolution: A Strategic Guide to Dominance in the Era of AI Overviews, AI Mode, and LLM Search with Bright Forge SEO.'
  }
};

// Helper function to get metadata for a slug
export function getBlogMetadata(slug) {
  return blogMetadata[slug] || null;
}
