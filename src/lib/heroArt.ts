// Page-specific hero evidence. Inner pages show a real Search Console comparison from a published
// case study in place of the shared illustration. Every figure is copied from the case study it links to
// (and matches src/lib/heroProof.ts); change the case study first, then this file.
export interface HeroArt { name: string; sector: string; image: string; alt: string; width: number; height: number; figure: string; period: string; href: string; }
// Hero and proof-band copies are 1200 px wide WebP versions of the case-study screenshots (the originals stay on the case pages).
const SMALL = (file: string) => (/(bridal-dress-seo|speediance-uk-storefront)/.test(file) ? file : file.replace(/\.(webp|png)$/, '-1200.webp'));
const img = (file: string) => encodeURI(`/images/case-studies/${SMALL(file)}`);
const CASES: Record<string, HeroArt> = {
  bridal: { name: 'Emily Bridalwear', sector: 'UK bridal retailer', image: img('bridal-dress-seo.webp'), alt: 'Google Search Console comparison for Emily Bridalwear: 17.6K clicks against 7.41K in the same period a year earlier', width: 1031, height: 410, figure: '7,410 to 17,600 organic clicks', period: 'Three months against the same three months a year earlier', href: '/case-studies/bridal-dress-designer-seo/' },
  leather: { name: 'Lost Dutchman Leather', sector: 'Leather goods store', image: img('leather-wallet-ecommerce-seo.webp'), alt: 'Google Search Console comparison for Lost Dutchman Leather: 22.7K clicks against 15.2K', width: 2070, height: 862, figure: '15,200 to 22,700 organic clicks', period: 'Three months against the same three months a year earlier', href: '/case-studies/leather-wallet-ecommerce-seo/' },
  teamstats: { name: 'TeamStats', sector: 'UK football team management app', image: img('football-app-seo-case-study.webp'), alt: 'Google Search Console comparison for TeamStats: 268K clicks against 200K', width: 2060, height: 836, figure: '200,000 to 268,000 organic clicks', period: 'Three months against the same three months a year earlier', href: '/case-studies/football-app-seo/' },
  au: { name: 'Speediance Australia', sector: 'Fitness equipment store', image: img('SEO Case Study- Increasing Organic Traffic for Speediance AU – Fitness Equipment Supplier .webp'), alt: 'Google Search Console comparison for Speediance Australia: 10.9K clicks against 6.55K in the previous six months', width: 1914, height: 834, figure: '6,550 to 10,900 organic clicks', period: 'Six months against the previous six', href: '/case-studies/speediance-au-fitness-seo/' },
  nz: { name: 'Speediance New Zealand', sector: 'Fitness equipment store', image: img('SEO Case Study- Boosting Organic Traffic for Speediance NZ – Gym Equipment Supplier .webp'), alt: 'Google Search Console comparison for Speediance New Zealand: 2.57K clicks against 927 in the previous six months', width: 1914, height: 820, figure: '927 to 2,570 organic clicks', period: 'Six months against the previous six', href: '/case-studies/speediance-nz-fitness-seo/' },
  pest: { name: 'ThermoPest', sector: 'UK pest control company', image: img('SEO Case Study- Recovering and Growing Organic Traffic for a Pest Control Firm After Core Update .webp'), alt: 'Google Search Console comparison for ThermoPest: 23.5K clicks against 10.3K in the previous six months', width: 1914, height: 840, figure: '10,300 to 23,500 organic clicks', period: 'Six months against the previous six', href: '/case-studies/pest-control-core-update-seo/' },
  conscient: { name: 'Conscient', sector: 'UK B2B consultancy', image: img('SEO Case Study- Increasing Organic Traffic for a Consulting Firm .webp'), alt: 'Google Search Console comparison for Conscient: 15.7K clicks against 13.2K in the previous six months', width: 1908, height: 828, figure: '13,200 to 15,700 organic clicks', period: 'Six months against the previous six', href: '/case-studies/consulting-firm-seo/' },
  boiler: { name: 'Boiler and heating spares retailer', sector: 'UK ecommerce', image: img('SEO Case Study- Driving Sustained Growth for a Boiler & Heating Spares Supplier .webp'), alt: 'Google Search Console comparison for a boiler and heating spares retailer: 16.6K clicks against 14.1K', width: 1920, height: 824, figure: '14,100 to 16,600 organic clicks', period: 'Successive six-month periods', href: '/case-studies/boiler-heating-spares-seo/' },
  phoenix: { name: 'Phoenix Brighton Spa', sector: 'Beauty salon and spa', image: img('SEO Case Study- Growing Organic Traffic for Phoenix Spa and Beauty – Beauty Salon and Spa .webp'), alt: 'Google Search Console comparison for Phoenix Brighton Spa across two six-month periods', width: 1896, height: 808, figure: '', period: 'Six months against the previous six', href: '/case-studies/phoenix-spa-beauty-seo/' },
  auction: { name: 'Car auction platform', sector: 'Marketplace, anonymized', image: img('SEO Case Study- Expanding Organic Reach for a Car Auction Platform .webp'), alt: 'Google Search Console comparison for a car auction platform: 419K clicks against 398K in the previous six months', width: 1884, height: 822, figure: '398,000 to 419,000 organic clicks', period: 'Six months against the previous six', href: '/case-studies/car-auction-seo/' },
  recycling: { name: 'Car recycling company', sector: 'Anonymized', image: img('SEO Case Study- Boosting Organic Traffic for a Car Recycling Client.webp'), alt: 'Google Search Console comparison for a car recycling company: 6.38K clicks against 4.96K in the previous three months', width: 1904, height: 836, figure: '4,960 to 6,380 organic clicks', period: 'Three months against the previous three', href: '/case-studies/car-recycling-seo/' },
  speedianceUk: { name: 'Speediance UK', sector: 'Fitness equipment store', image: img('speediance-uk-storefront-20261013.webp'), alt: 'The Speediance UK storefront, captured on 13 October 2026', width: 970, height: 525, figure: '', period: 'Project scope and measurement limits', href: '/case-studies/speediance-uk-fitness-seo/' },
  legal: { name: 'Personal-injury law firm', sector: 'Legal, anonymized', image: img('injury-law-organic-growth-gsc-evidence.png'), alt: 'Redacted chart of reported Search Console totals for an anonymized personal-injury law firm', width: 1600, height: 900, figure: '1,000 to 2,065 organic clicks', period: 'Two 90-day periods', href: '/case-studies/injury-law-organic-growth/' },
  builder: { name: 'Custom home builder', sector: 'Construction, anonymized', image: img('custom-home-builder-search-growth-gsc-evidence.png'), alt: 'Redacted Search Console totals chart showing 9,634 clicks for an anonymized custom home builder', width: 1600, height: 900, figure: '7,201 to 9,634 organic clicks', period: 'Two 90-day periods', href: '/case-studies/custom-home-builder-search-growth/' },
  pvc: { name: 'Building-products supplier', sector: 'Anonymized', image: img('pvc-building-products-search-growth-gsc-evidence.png'), alt: 'Redacted chart of reported Search Console totals showing 1,311 clicks for an anonymized building-products supplier', width: 1600, height: 900, figure: '170 to 1,311 organic clicks', period: 'Two 90-day periods', href: '/case-studies/pvc-building-products-search-growth/' },
  industrial: { name: 'Industrial equipment manufacturer', sector: 'Anonymized', image: img('industrial-parts-washing-search-growth-gsc-evidence.png'), alt: 'Redacted chart of reported Search Console totals for an anonymized industrial equipment manufacturer', width: 1600, height: 900, figure: '704 to 1,054 organic clicks', period: 'Two 90-day periods', href: '/case-studies/industrial-parts-washing-search-growth/' },
  scaffolding: { name: 'Regional scaffolding contractor', sector: 'Anonymized', image: img('regional-scaffolding-growth-gsc-evidence.png'), alt: 'Redacted presentation of reported Search Console performance showing 1,216 clicks for an anonymized regional scaffolding contractor', width: 1600, height: 900, figure: '1,016 to 1,216 organic clicks', period: 'Two 90-day periods', href: '/case-studies/regional-scaffolding-growth/' },
  metal: { name: 'Metal recycling business', sector: 'Anonymized', image: img('metal-recycling-search-growth-gsc-evidence.png'), alt: 'Redacted Search Console performance visual showing 22,873 clicks for an anonymized metal recycling business', width: 1600, height: 900, figure: '18,252 to 22,873 organic clicks', period: 'Two 90-day periods', href: '/case-studies/metal-recycling-search-growth/' },
  pool: { name: 'Pool-control systems business', sector: 'Anonymized', image: img('pool-control-systems-search-growth-gsc-evidence.png'), alt: 'Redacted chart of reported Search Console totals showing 302 clicks for an anonymized pool-control systems company', width: 1600, height: 900, figure: '168 to 302 organic clicks', period: 'Two 90-day periods', href: '/case-studies/pool-control-systems-search-growth/' },
  garden: { name: 'Garden-products supplier', sector: 'Anonymized', image: img('garden-products-search-growth-gsc-evidence.png'), alt: 'Redacted Search Console totals chart showing 2,804 clicks for an anonymized garden-products supplier', width: 1600, height: 900, figure: '1,883 to 2,804 organic clicks', period: 'Two 90-day periods', href: '/case-studies/garden-products-search-growth/' },
};
// A case study shows its own evidence.
const OWN: Record<string, string> = {
  'bridal-dress-designer-seo': 'bridal', 'leather-wallet-ecommerce-seo': 'leather', 'football-app-seo': 'teamstats', 'speediance-au-fitness-seo': 'au',
  'speediance-nz-fitness-seo': 'nz', 'speediance-uk-fitness-seo': 'speedianceUk', 'pest-control-core-update-seo': 'pest', 'consulting-firm-seo': 'conscient',
  'boiler-heating-spares-seo': 'boiler', 'phoenix-spa-beauty-seo': 'phoenix', 'car-auction-seo': 'auction', 'car-recycling-seo': 'recycling',
  'injury-law-organic-growth': 'legal', 'custom-home-builder-search-growth': 'builder', 'pvc-building-products-search-growth': 'pvc',
  'industrial-parts-washing-search-growth': 'industrial', 'regional-scaffolding-growth': 'scaffolding', 'metal-recycling-search-growth': 'metal',
  'pool-control-systems-search-growth': 'pool', 'garden-products-search-growth': 'garden',
};
// Service, country and sector pages show the published case closest to the page's subject.
const BY_PAGE: Record<string, string> = {
  '/seo-services-philippines': 'bridal', '/seo-audit-services': 'pest', '/technical-seo-services-philippines': 'pest',
  '/on-page-seo-services-philippines': 'bridal', '/keyword-research-services': 'leather', '/content-seo-services-philippines': 'bridal',
  '/backlink-seo-services-philippines': 'teamstats', '/website-migration-services': 'boiler', '/white-label-seo-services-philippines': 'conscient',
  '/local-seo-for-google-maps-and-gbp': 'pest', '/international-seo-services': 'au',
  '/seo-services-australia': 'au', '/seo-services-new-zealand': 'nz', '/seo-services-uk': 'bridal', '/seo-services-usa': 'leather',
  '/ecommerce-seo-services': 'leather', '/saas-seo-services': 'teamstats', '/football-soccer-seo-services': 'teamstats',
  '/construction-seo-services': 'builder', '/legal-seo-services': 'legal', '/home-services-seo': 'pest', '/b2b-seo-services': 'conscient',
  '/case-studies': 'bridal',
};
export function heroArt(pathname: string): { art: HeroArt; own: boolean } | null {
  const p = pathname.replace(/\/$/, '') || '/';
  if (p.startsWith('/case-studies/')) {
    const key = OWN[p.slice('/case-studies/'.length)];
    return key ? { art: CASES[key], own: true } : null;
  }
  const key = BY_PAGE[p];
  return key ? { art: CASES[key], own: false } : null;
}
