export const DISPLAY_H1_BY_SLUG = {
  'ai-seo-transformation': 'AI SEO Transformation',
  'ai-tools-for-seo-and-content-creation': 'AI Tools for SEO and Content Creation',
  'answer-engine-revolution': 'The Answer Engine Revolution',
  'google-search-console-geotargeting-configuration-and-regional-performance':
    'Google Search Console Geotargeting Configuration and Regional Performance',
  'hyperlocal-seo-and-community-engagement': 'Hyperlocal SEO and Community Engagement',
  'importance-of-local-seo-for-small-businesses': 'Importance of Local SEO for Small Businesses',
  'optimizing-for-zero-click-searches-and-featured-snippets-in-2025':
    'Optimizing for Zero-Click Searches and Featured Snippets in 2025',
  'semantic-keywords-and-lsi-integration-a-surgical-approach-to-content':
    'Semantic Keywords and LSI Integration a Surgical Approach to Content'
};

export function displayH1(slug, fallback) {
  return DISPLAY_H1_BY_SLUG[slug] || fallback;
}

export function topicSlug(tag) {
  return String(tag || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function topicLabel(slug) {
  const named = {
    seo: 'SEO',
    ai: 'AI',
    local: 'Local SEO',
    business: 'Small Business'
  };
  if (named[slug]) return named[slug];
  return slug
    .split('-')
    .map((word) => (word === 'seo' ? 'SEO' : word === 'ai' ? 'AI' : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(' ');
}

export function groupPostsByTopic(posts, min = 3) {
  const map = new Map();
  for (const post of posts || []) {
    const tags = post.tags?.length ? post.tags : ['seo'];
    for (const tag of tags) {
      const slug = topicSlug(tag);
      if (!slug) continue;
      if (!map.has(slug)) map.set(slug, []);
      map.get(slug).push(post);
    }
  }
  return [...map.entries()]
    .map(([slug, topicPosts]) => ({ slug, label: topicLabel(slug), posts: topicPosts }))
    .filter((group) => group.posts.length >= min)
    .sort((a, b) => b.posts.length - a.posts.length || a.slug.localeCompare(b.slug));
}
