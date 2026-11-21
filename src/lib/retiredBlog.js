import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Articles and topic archives retired by content consolidation (see
// src/data/retiredBlogSlugs.json). Read with fs, like cmsPostFixes.json, so the
// same module works in Astro pages and plain Node scripts.
const retired = JSON.parse(readFileSync(join(process.cwd(), 'src/data/retiredBlogSlugs.json'), 'utf8'));

export const retiredArticles = retired.articles || {};
export const retiredTopicArchives = retired.topicArchives || {};

export function isRetiredArticle(slug) {
  return Object.prototype.hasOwnProperty.call(retiredArticles, slug);
}

export function isRetiredTopic(slug) {
  return Object.prototype.hasOwnProperty.call(retiredTopicArchives, slug);
}

// Where a retired internal path now lives, or null if the path is not retired.
export function retiredDestination(pathname) {
  const path = String(pathname || '').replace(/\/+$/, '');
  const article = path.match(/^\/blog\/([^/]+)$/);
  if (article && isRetiredArticle(article[1])) return retiredArticles[article[1]];
  const topic = path.match(/^\/blog\/topics\/([^/]+)$/);
  if (topic && isRetiredTopic(topic[1])) return retiredTopicArchives[topic[1]];
  return null;
}

// Point links in a rendered article body at the destination of any retired
// page, so CMS-held bodies never link to a redirect. A link that would now
// point at the article it sits in is unwrapped and its words kept.
export function rewriteRetiredLinks(document, currentPath) {
  for (const anchor of [...document.querySelectorAll('a[href]')]) {
    const href = anchor.getAttribute('href') || '';
    const match = href.match(/^(?:https?:\/\/(?:www\.)?brightforge(?:seo\.com|\.com\.ph))?(\/[^?#]*)([?#].*)?$/);
    if (!match) continue;
    const destination = retiredDestination(match[1]);
    if (!destination) continue;
    if (destination === currentPath) {
      anchor.replaceWith(...anchor.childNodes);
    } else {
      anchor.setAttribute('href', destination);
    }
  }
}
