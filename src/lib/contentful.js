import { createClient } from 'contentful';

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
    width = 1200,
    quality = 80,
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

// Fetch all blog posts with selected fields
export async function getAllBlogPosts() {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'blogPost',
      order: '-fields.dateTime', // Sort by publication date, newest first
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
    
    // Transform the data structure to be easier to work with
    return entries.items.map(item => ({
      id: item.sys.id,
      title: item.fields.title,
      slug: item.fields.slug,
      excerpt: item.fields.excerpt,
      publishDate: new Date(item.fields.dateTime), // Use dateTime field but map to publishDate in our app
      author: item.fields.author,
      featuredImage: item.fields?.featuredImage?.fields?.file?.url
        ? optimizeContentfulImage(`https:${item.fields.featuredImage.fields.file.url}`)
        : null,
      tags: item.fields.tags || [],
      showInfographic: item.fields.showInfographic === true
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Fetch a single blog post by slug
export async function getBlogPostBySlug(slug) {
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
      featuredImage: item.fields?.featuredImage?.fields?.file?.url
        ? optimizeContentfulImage(`https:${item.fields.featuredImage.fields.file.url}`)
        : null,
      tags: item.fields.tags || [],
      showInfographic: item.fields.showInfographic === true
    };
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
}
