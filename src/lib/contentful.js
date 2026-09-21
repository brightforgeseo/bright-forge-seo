import { createClient } from 'contentful';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { getLocalBlogPosts, getLocalBlogPostBySlug } from './localBlog.js';

// Initialize the Contentful client with hardcoded credentials to ensure it works
export const contentfulClient = createClient({
  space: '9obxkyo987ei',
  accessToken: 'CSBCBWiKyeTVnWGBwmdqw5D1vOmAsLkCYkla0ZQoEPw',
  environment: 'master' // 'master' is the default environment for Contentful spaces
});

// Helper function to optimize Contentful images
function optimizeContentfulImage(url, options = {}) {
  if (!url) return null;

  const {
    width = 800,
    quality = 72,
    format = 'webp'
  } = options;

  // Add Contentful image optimization parameters
  const params = new URLSearchParams({
    w: width.toString(),
    q: quality.toString(),
    fm: format
  });

  return `${url}?${params.toString()}`;
}

// Keep featured imagery version-controlled. Contentful owns the article body,
// while a matching local WebP replaces its historical generated asset.
function getLocalFeaturedImage(slug) {
  if (!slug) return null;
  const relative = `/images/blog/${slug}.webp`;
  return existsSync(join(process.cwd(), 'public', relative))
    ? `${relative}?v=real-photo-bacf9da`
    : null;
}

// Fetch all blog posts with selected fields
let allPostsCache;

export async function getAllBlogPosts() {
  if (allPostsCache) return allPostsCache;
  try {
    const raw = [];
    let skip = 0;
    const limit = 100;
    while (true) {
      const entries = await contentfulClient.getEntries({
        content_type: 'blogPost',
        order: '-fields.dateTime',
        limit,
        skip,
        select: [
          'fields.title',
          'fields.slug',
          'fields.excerpt',
          'fields.dateTime',
          'fields.author',
          'fields.featuredImage',
          'fields.tags',
          'fields.showInfographic'
        ]
      });
      raw.push(...entries.items);
      skip += entries.items.length;
      if (!entries.items.length || skip >= entries.total) break;
    }

    const remote = raw
    .filter((item) => item.fields?.slug)
    .map((item) => ({
      id: item.sys.id,
      title: item.fields.title,
      slug: item.fields.slug,
      excerpt: item.fields.excerpt,
      publishDate: new Date(item.fields.dateTime),
      author: item.fields.author,
      featuredImage: getLocalFeaturedImage(item.fields.slug) || (
        item.fields?.featuredImage?.fields?.file?.url
          ? optimizeContentfulImage(`https:${item.fields.featuredImage.fields.file.url}`)
          : null
      ),
      tags: item.fields.tags || [],
      showInfographic: item.fields.showInfographic === true
    }));
    const local = getLocalBlogPosts();
    const remoteSlugs = new Set(remote.map((p) => p.slug));
    allPostsCache = [...local.filter((p) => !remoteSlugs.has(p.slug)), ...remote].sort(
      (a, b) => b.publishDate - a.publishDate
    );
    return allPostsCache;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    allPostsCache = getLocalBlogPosts();
    return allPostsCache;
  }
}

// Fetch a single blog post by slug
export async function getBlogPostBySlug(slug) {
  const local = getLocalBlogPostBySlug(slug);
  if (local) {
    return {
      ...local,
      content: null,
      contentHtml: local.contentHtml
    };
  }
  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1
    });

    if (entries.items.length === 0) {
      return null;
    }

    const item = entries.items[0];
    
    return {
      id: item.sys.id,
      title: item.fields.title,
      slug: item.fields.slug,
      excerpt: item.fields.excerpt,
      content: item.fields.content,
      publishDate: new Date(item.fields.dateTime),  // Use dateTime field but map to publishDate in our app
      author: item.fields.author,
      featuredImage: getLocalFeaturedImage(item.fields.slug) || (
        item.fields?.featuredImage?.fields?.file?.url
          ? optimizeContentfulImage(`https:${item.fields.featuredImage.fields.file.url}`)
          : null
      ),
      tags: item.fields.tags || [],
      showInfographic: item.fields.showInfographic === true
    };
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
}
