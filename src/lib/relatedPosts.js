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

export function pickRelatedPosts(posts, current, limit = 4) {
  const currentTags = tagSet(current);
  const others = (posts || []).filter((post) => post?.slug && post.slug !== current.slug);
  const ranked = others
    .map((post) => {
      const overlap = [...tagSet(post)].filter((tag) => currentTags.has(tag)).length;
      const time = post.publishDate instanceof Date ? post.publishDate.getTime() : 0;
      return { post, overlap, time };
    })
    .sort((a, b) => b.overlap - a.overlap || b.time - a.time);

  const picked = [];
  const used = new Set();
  for (const row of ranked) {
    if (row.overlap === 0) continue;
    picked.push(row.post);
    used.add(row.post.slug);
    if (picked.length >= limit) break;
  }
  if (picked.length < limit) {
    for (const row of ranked) {
      if (used.has(row.post.slug)) continue;
      picked.push(row.post);
      used.add(row.post.slug);
      if (picked.length >= limit) break;
    }
  }

  return picked.map((post) => ({
    title: post.title,
    excerpt: post.excerpt || '',
    slug: post.slug,
    image: post.featuredImage || undefined,
    publishDate: formatDate(post.publishDate)
  }));
}
