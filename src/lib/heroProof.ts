// Public proof is deliberately bounded to published cases, not inferred outcomes.
export interface HeroCard { label: string; value: string; detail: string; href: string; source?: string; }
const caseCard = (slug: string, label: string, value: string, detail: string): HeroCard => ({ label, value, detail, href: `/case-studies/${slug}/`, source: `/case-studies/${slug}/` });
const bridal = caseCard('bridal-dress-designer-seo', 'Emily Bridalwear', '+137.5%', 'Organic clicks · 3-month comparison');
const leather = caseCard('leather-wallet-ecommerce-seo', 'Lost Dutchman Leather', '+49.3%', 'Organic clicks · published case study');
const pest = caseCard('pest-control-core-update-seo', 'Pest control recovery', '+128%', 'Organic clicks · 6-month comparison');
const legal = caseCard('injury-law-organic-growth', 'Personal-injury law firm', '+106.5%', 'Organic clicks · two 90-day periods · anonymised');
const builder = caseCard('custom-home-builder-search-growth', 'Custom home builder', '+33.8%', 'Organic clicks · two 90-day periods · anonymised');
const industrial = caseCard('industrial-parts-washing-search-growth', 'Industrial manufacturer', '+49.7%', '704 to 1,054 organic clicks · 90-day comparison');
const sports = caseCard('football-app-seo', 'TeamStats', '+34%', 'Organic clicks · published sports SaaS case');
const au = caseCard('speediance-au-fitness-seo', 'Speediance AU', '+66%', 'Site-wide organic clicks · 6-month comparison');
const nz = caseCard('speediance-nz-fitness-seo', 'Speediance NZ', '+177%', 'Site-wide organic clicks · 3-month comparison');
const uk = caseCard('speediance-uk-fitness-seo', 'Speediance UK', '+119%', 'Site-wide organic clicks · 3-month comparison');
const library: HeroCard = { label: 'The work, documented', value: 'See the evidence.', detail: 'Published case studies, comparisons and limitations', href: '/case-studies/' };
export function heroCards(path: string, context = ''): HeroCard[] {
  const p = path.replace(/\/$/, '') || '/';
  const topic = `${p} ${context}`.toLowerCase();
  let first: HeroCard = library;
  // A case-study page points to its own evidence rather than advertising an unrelated client.
  if (p.startsWith('/case-studies/')) {
    const known = [bridal, leather, pest, legal, builder, industrial, sports, au, nz, uk].find(c => c.href.replace(/\/$/, '') === p);
    first = known ? { ...known, href: p.endsWith('/speediance-uk-fitness-seo') ? '#campaign-measurement' : '#results' } : { label: 'This case study', value: 'Read the evidence.', detail: 'Scope, observations and limitations in the case below', href: '#results' };
  } else if (p === '/') first = bridal;
  else if (/legal|law-firm/.test(topic)) first = legal;
  else if (/construction|real-estate|home-builder/.test(topic)) first = builder;
  else if (/football|saas|sports/.test(topic)) first = sports;
  else if (/home-services|local-seo|recovery|core-update/.test(topic)) first = pest;
  else if (/industrial|manufactur|b2b/.test(topic)) first = industrial;
  else if (/seo-services-australia/.test(p)) first = au;
  else if (/seo-services-new-zealand/.test(p)) first = nz;
  else if (/seo-services-uk/.test(p)) first = uk;
  else if (/ecommerce|shopify|woocommerce/.test(topic)) first = leather;
  else if (/bridal|fashion/.test(topic)) first = bridal;
  // Development pages use an actual interactive work sample, not an unsupported SEO attribution.
  if (p.startsWith('/development')) first = { label: 'Built to be used', value: 'Explore the builds.', detail: 'Interactive examples, platforms and delivery checks', href: '/development/#workbench' };
  if (/ai-search|ai-overview|generative/.test(topic) && !p.startsWith('/case-studies/')) first = { label: 'AI search, in practice', value: 'Evidence first.', detail: 'Published AI search cases with clear evidence boundaries', href: '/case-studies/ai-sports-saas-geo/' };
  const second: HeroCard = p.startsWith('/authors/') ? { label: 'How we publish', value: 'People. Sources. Checks.', detail: 'Our editorial standards and review process', href: '/editorial-standards/' } : { label: 'Led by Ben Lowe', value: '15+', detail: 'Years in SEO · British-led, Philippines-based', href: '/about-us/' };
  const third: HeroCard = p.startsWith('/development')
    ? { label: 'Your next build', value: 'Define it. Build it.', detail: 'Discuss your website, platform and project scope', href: '/contact/' }
    : { label: 'Your next move', value: 'Find the gaps. Make a plan.', detail: 'Request an SEO review', href: p === '/contact' ? '#contact-form' : '/contact/' };
  if (/privacy-policy|terms-of-service|site-index|thanks|404/.test(p)) return [
    { label: 'Find your way', value: 'Every page.', detail: 'Services, markets, people and articles', href: '/site-index/' },
    { label: 'Useful reading', value: 'Clear answers.', detail: 'SEO and search guidance from our team', href: '/blog/' },
    { label: 'Need a hand?', value: 'Talk to us.', detail: 'Send your question to the team', href: '/contact/' }
  ];
  return [first, second, third];
}
