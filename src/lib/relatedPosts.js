function tagSet(post) {
  return new Set((post.tags || []).map((tag) => String(tag).toLowerCase()));
}

function formatDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

const STOP = new Set(['the', 'and', 'for', 'with', 'from', 'that', 'what', 'when', 'how', 'why', 'your', 'you', 'are', 'not', 'without', 'into', 'seo', 'philippines', 'philippine']);

function titleWords(post) {
  return new Set(
    String(post.title || '')
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length > 2 && !STOP.has(word))
  );
}

// Rank by how specific the shared topics are, then by shared headline words.
// A tag carried by nearly every article says little about relatedness, so it
// earns almost nothing; recency only breaks ties. Without this weighting every
// article showed the same handful of newest posts.
export function pickRelatedPosts(posts, current, limit = 4) {
  const all = (posts || []).filter((post) => post?.slug);
  const tagCount = new Map();
  for (const post of all) for (const tag of tagSet(post)) tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
  const total = Math.max(all.length, 1);
  const currentTags = tagSet(current);
  const currentWords = titleWords(current);
  const ranked = all
    .filter((post) => post.slug !== current.slug)
    .map((post) => {
      let score = 0;
      for (const tag of tagSet(post)) {
        if (currentTags.has(tag)) score += Math.log(total / (tagCount.get(tag) || 1));
      }
      for (const word of titleWords(post)) if (currentWords.has(word)) score += 0.75;
      const time = post.publishDate instanceof Date ? post.publishDate.getTime() : 0;
      return { post, score, time };
    })
    .sort((x, y) => y.score - x.score || y.time - x.time || x.post.slug.localeCompare(y.post.slug));
  const picked = ranked.slice(0, limit).map((row) => row.post);

  return picked.map((post) => ({
    title: post.title,
    excerpt: post.excerpt || '',
    slug: post.slug,
    image: post.featuredImage || undefined,
    publishDate: formatDate(post.publishDate)
  }));
}
