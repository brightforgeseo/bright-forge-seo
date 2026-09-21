import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const DIR = path.join(process.cwd(), 'src/data/local-blog');
const BLOG_IMAGE_VERSION = 'real-photo-bacf9da';

function versionBlogImage(image) {
  if (!image || !image.startsWith('/images/blog/')) return image || null;
  return `${image}?v=${BLOG_IMAGE_VERSION}`;
}

function parseFrontmatter(raw) {
  if (!raw.startsWith('---')) return { data: {}, body: raw };
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return { data: {}, body: raw };
  const fm = raw.slice(4, end).trim();
  const body = raw.slice(end + 4).replace(/^\s+/, '');
  const data = {};
  for (const line of fm.split('\n')) {
    const i = line.indexOf(':');
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (val.startsWith('[') && val.endsWith(']')) {
      data[key] = val
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else {
      data[key] = val;
    }
  }
  return { data, body };
}

export function getLocalBlogPosts() {
  if (!fs.existsSync(DIR)) return [];
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.md'));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(DIR, file), 'utf8');
      const { data, body } = parseFrontmatter(raw);
      if (!data.slug || !data.title) return null;
      const html = marked.parse(body, { async: false });
      return {
        id: `local-${data.slug}`,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || '',
        publishDate: data.date ? new Date(data.date) : new Date(),
        author: data.author || 'Ben Lowe',
        featuredImage: versionBlogImage(data.image),
        tags: data.tags || ['seo'],
        showInfographic: false,
        local: true,
        contentHtml: html,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.publishDate - a.publishDate);
}

export function getLocalBlogPostBySlug(slug) {
  return getLocalBlogPosts().find((p) => p.slug === slug) || null;
}
