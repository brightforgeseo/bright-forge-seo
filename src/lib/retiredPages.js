// Service pages folded into a consolidated page in Release 2 (November 2026).
// Key = retired path, value = the page its URL 301-redirects to (see public/_redirects).
export const retiredPages = {
  '/real-estate-seo-services/': '/industries/',
  '/finance-crypto-seo-services/': '/industries/',
  '/gaming-seo-services/': '/industries/',
  '/pet-seo-services/': '/industries/',
  '/development/nextjs/': '/development/',
  '/development/react/': '/development/',
  '/development/sveltekit/': '/development/',
};

// Point links in rendered article HTML at the destination, so bodies held in the CMS
// never link to a redirect. Only the href changes; the wording of the article is untouched.
export function rewriteRetiredPageLinks(html) {
  return String(html || '').replace(
    /href="(?:https?:\/\/(?:www\.)?brightforge(?:seo\.com|\.com\.ph))?(\/[^"?#]*?)\/?(["?#])/g,
    (match, path, tail) => {
      const destination = retiredPages[`${path}/`];
      return destination ? `href="${destination}${tail}` : match;
    }
  );
}
