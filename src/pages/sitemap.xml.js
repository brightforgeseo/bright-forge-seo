import { getAllBlogPosts } from '../lib/contentful.js';
import { authors } from '../lib/authors.js';

const SITE = 'https://brightforge.com.ph';
const SKIP = new Set(['404', 'thanks', 'sitemap.xml']);

function pagePathToUrl(file) {
  let rel = file.replace(/^\/src\/pages\//, '').replace(/\.astro$/, '');
  if (rel.includes('[')) return null;
  const base = rel.split('/').pop();
  if (SKIP.has(base)) return null;
  if (rel.endsWith('/index')) rel = rel.slice(0, -6);
  if (rel === 'index' || rel === '') return `${SITE}/`;
  return `${SITE}/${rel}/`;
}

export async function GET() {
  const pageFiles = Object.keys(import.meta.glob('./**/*.astro'));
  const staticUrls = [];
  for (const file of pageFiles) {
    const loc = pagePathToUrl(`/src/pages/${file.replace(/^\.\//, '')}`);
    if (loc) staticUrls.push(loc);
  }

  const posts = await getAllBlogPosts();
  const blogUrls = posts
    .filter((p) => p.slug)
    .map((p) => `${SITE}/blog/${p.slug}/`);

  const authorUrls = Object.keys(authors).map((slug) => `${SITE}/authors/${slug}/`);

  const urls = [...new Set([...staticUrls, ...blogUrls, ...authorUrls, `${SITE}/editorial-standards/`])];
  urls.sort((a, b) => a.localeCompare(b));

  const today = new Date().toISOString().slice(0, 10);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
