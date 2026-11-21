// Which published evidence each service, country and sector page shows directly under its hero.
// Figures are copied from the case study each card links to (see also src/lib/heroArt.ts and heroProof.ts);
// change the case study first. Reviews are public Google reviews quoted verbatim with their source links.
export interface BandCase { name: string; sector: string; pct: string; range: string; period: string; href: string; image: string; alt: string; }
const img = (file: string) => encodeURI(`/images/case-studies/${file}`);
const C: Record<string, BandCase> = {
  bridal: { name: 'Emily Bridalwear', sector: 'UK bridal retailer', pct: '+137.5%', range: '7,410 to 17,600', period: 'Three months against the same three months a year earlier', href: '/case-studies/bridal-dress-designer-seo/', image: img('bridal-dress-seo.webp'), alt: 'Search Console comparison for Emily Bridalwear' },
  leather: { name: 'Lost Dutchman Leather', sector: 'Leather goods store, Arizona', pct: '+49.3%', range: '15,200 to 22,700', period: 'Three months against the same three months a year earlier', href: '/case-studies/leather-wallet-ecommerce-seo/', image: img('leather-wallet-ecommerce-seo.webp'), alt: 'Search Console comparison for Lost Dutchman Leather' },
  teamstats: { name: 'TeamStats', sector: 'Football team management app', pct: '+34%', range: '200,000 to 268,000', period: 'Three months against the same three months a year earlier', href: '/case-studies/football-app-seo/', image: img('football-app-seo-case-study.webp'), alt: 'Search Console comparison for TeamStats' },
  au: { name: 'Speediance Australia', sector: 'Fitness equipment store', pct: '+66%', range: '6,550 to 10,900', period: 'Six months against the previous six', href: '/case-studies/speediance-au-fitness-seo/', image: img('SEO Case Study- Increasing Organic Traffic for Speediance AU – Fitness Equipment Supplier .webp'), alt: 'Search Console comparison for Speediance Australia' },
  nz: { name: 'Speediance New Zealand', sector: 'Fitness equipment store', pct: '+177%', range: '927 to 2,570', period: 'Six months against the previous six', href: '/case-studies/speediance-nz-fitness-seo/', image: img('SEO Case Study- Boosting Organic Traffic for Speediance NZ – Gym Equipment Supplier .webp'), alt: 'Search Console comparison for Speediance New Zealand' },
  pest: { name: 'ThermoPest', sector: 'UK pest control company', pct: '+128%', range: '10,300 to 23,500', period: 'Six months against the previous six', href: '/case-studies/pest-control-core-update-seo/', image: img('SEO Case Study- Recovering and Growing Organic Traffic for a Pest Control Firm After Core Update .webp'), alt: 'Search Console comparison for ThermoPest' },
  conscient: { name: 'Conscient', sector: 'UK B2B consultancy', pct: '', range: '13,200 to 15,700', period: 'Six months against the previous six; click-through rate fell from 3.3% to 2.1%', href: '/case-studies/consulting-firm-seo/', image: img('SEO Case Study- Increasing Organic Traffic for a Consulting Firm .webp'), alt: 'Search Console comparison for Conscient' },
  boiler: { name: 'Boiler and heating spares retailer', sector: 'UK ecommerce', pct: '+18%', range: '14,100 to 16,600', period: 'Successive six-month periods', href: '/case-studies/boiler-heating-spares-seo/', image: img('SEO Case Study- Driving Sustained Growth for a Boiler & Heating Spares Supplier .webp'), alt: 'Search Console comparison for a boiler and heating spares retailer' },
  legal: { name: 'Personal-injury law firm', sector: 'Legal, anonymised', pct: '+106.5%', range: '1,000 to 2,065', period: 'Two 90-day periods', href: '/case-studies/injury-law-organic-growth/', image: img('injury-law-organic-growth-gsc-evidence.png'), alt: 'Redacted Search Console totals for an anonymised personal-injury law firm' },
  builder: { name: 'Custom home builder', sector: 'Construction, anonymised', pct: '+33.8%', range: '7,201 to 9,634', period: 'Two 90-day periods; average position weakened', href: '/case-studies/custom-home-builder-search-growth/', image: img('custom-home-builder-search-growth-gsc-evidence.png'), alt: 'Redacted Search Console totals for an anonymised custom home builder' },
  pvc: { name: 'Building-products supplier', sector: 'Anonymised', pct: '+671%', range: '170 to 1,311', period: 'Two 90-day periods, from a small base', href: '/case-studies/pvc-building-products-search-growth/', image: img('pvc-building-products-search-growth-gsc-evidence.png'), alt: 'Redacted Search Console totals for an anonymised building-products supplier' },
  industrial: { name: 'Industrial equipment manufacturer', sector: 'Anonymised', pct: '+49.7%', range: '704 to 1,054', period: 'Two 90-day periods', href: '/case-studies/industrial-parts-washing-search-growth/', image: img('industrial-parts-washing-search-growth-gsc-evidence.png'), alt: 'Redacted Search Console totals for an anonymised industrial equipment manufacturer' },
  scaffolding: { name: 'Regional scaffolding contractor', sector: 'Anonymised', pct: '+19.7%', range: '1,016 to 1,216', period: 'Two 90-day periods; fewer impressions, better position', href: '/case-studies/regional-scaffolding-growth/', image: img('regional-scaffolding-growth-gsc-evidence.png'), alt: 'Redacted Search Console performance for an anonymised regional scaffolding contractor' },
  metal: { name: 'Metal recycling business', sector: 'Anonymised', pct: '+25.3%', range: '18,252 to 22,873', period: 'Two 90-day periods; average position moved the other way', href: '/case-studies/metal-recycling-search-growth/', image: img('metal-recycling-search-growth-gsc-evidence.png'), alt: 'Redacted Search Console performance for an anonymised metal recycling business' },
  pool: { name: 'Pool-control systems business', sector: 'Anonymised', pct: '+79.8%', range: '168 to 302', period: 'Two 90-day periods, from a small base', href: '/case-studies/pool-control-systems-search-growth/', image: img('pool-control-systems-search-growth-gsc-evidence.png'), alt: 'Redacted Search Console totals for an anonymised pool-control systems company' },
  garden: { name: 'Garden-products supplier', sector: 'Anonymised', pct: '+48.9%', range: '1,883 to 2,804', period: 'Two 90-day periods; click-through rate rose from 3.29% to 4.83%', href: '/case-studies/garden-products-search-growth/', image: img('garden-products-search-growth-gsc-evidence.png'), alt: 'Redacted Search Console totals for an anonymised garden-products supplier' },
};
export interface BandReview { quote: string; name: string; meta: string; href: string; }
const R: Record<string, BandReview> = {
  tom: { quote: 'Working with Bright Forge SEO has been a huge benefit for TeamStats. They understand our needs and deliver consistently.', name: 'Tom Stanbury', meta: 'TeamStats', href: 'https://www.google.com/maps/contrib/116331598386131030776/place/ChIJE2gAZiKxlzMRs_CdsvEp-4I/@33.1283139,60.4938897,3z/data=!4m6!1m5!8m4!1e1!2s116331598386131030776!3m1!1e1?hl=en&entry=ttu' },
  louise: { quote: "We've been working with Bright Forge SEO for about three years now and they've been great. Really solid all-round SEO.", name: 'Louise Maclean', meta: 'Business owner', href: 'https://www.google.com/maps/contrib/113085747629835627237/place/ChIJE2gAZiKxlzMRs_CdsvEp-4I/@14.7046174,121.0444284,17z/data=!4m6!1m5!8m4!1e1!2s113085747629835627237!3m1!1e1?hl=en&entry=ttu' },
  auction: { quote: "We've been working with Ben and Bright Forge SEO for over 18 months, with the primary focus being our SEO needs. They deliver excellent results.", name: 'UK Auction List', meta: 'Property auctions platform', href: 'https://www.google.com/maps/contrib/113689117491192336436/place/ChIJE2gAZiKxlzMRs_CdsvEp-4I/@32.9703675,60.2359234,3z/data=!4m6!1m5!8m4!1e1!2s113689117491192336436!3m1!1e1?hl=en&entry=ttu' },
  rj: { quote: 'I am very happy with the results from BrightForge! My site gets more visitors and my business is growing. They explain things clearly and make the process easy. Great service all around.', name: 'RJ Go', meta: 'Google Local Guide', href: 'https://www.google.com/maps/contrib/110455532132624140129/reviews?hl=en' },
  rich: { quote: "I have hired these guys a few times and I'm never disappointed. If you want a great SEO in Quezon City or anywhere, you can't go wrong with Bright Forge SEO.", name: 'Rich Devman', meta: 'Google Local Guide', href: 'https://www.google.com/maps/contrib/107541256675907093604/place/ChIJE2gAZiKxlzMRs_CdsvEp-4I/@14.7046174,78.8569284,3z/data=!4m6!1m5!8m4!1e1!2s107541256675907093604!3m1!1e1?hl=en&entry=ttu' },
};
const PAGES: Record<string, [string[], string]> = {
  '/seo-services-philippines': [['bridal', 'leather', 'teamstats'], 'louise'],
  '/seo-audit-services': [['pest', 'legal', 'industrial'], 'louise'],
  '/technical-seo-services-philippines': [['pest', 'boiler', 'builder'], 'rich'],
  '/on-page-seo-services-philippines': [['bridal', 'garden', 'legal'], 'rj'],
  '/keyword-research-services': [['leather', 'pvc', 'bridal'], 'auction'],
  '/content-seo-services-philippines': [['bridal', 'teamstats', 'conscient'], 'tom'],
  '/backlink-seo-services-philippines': [['teamstats', 'metal', 'pest'], 'tom'],
  '/website-migration-services': [['boiler', 'pest', 'au'], 'auction'],
  '/white-label-seo-services-philippines': [['conscient', 'bridal', 'teamstats'], 'auction'],
  '/local-seo-for-google-maps-and-gbp': [['pest', 'scaffolding', 'pool'], 'rj'],
  '/ai-search-optimization-services-philippines': [['teamstats', 'bridal', 'leather'], 'tom'],
  '/international-seo-services': [['au', 'nz', 'bridal'], 'auction'],
  '/seo-services-australia': [['au', 'nz'], 'louise'],
  '/seo-services-new-zealand': [['nz', 'au'], 'louise'],
  '/seo-services-uk': [['bridal', 'pest', 'conscient'], 'auction'],
  '/seo-services-usa': [['leather', 'bridal', 'teamstats'], 'tom'],
  '/ecommerce-seo-services': [['leather', 'bridal', 'au'], 'louise'],
  '/saas-seo-services': [['teamstats', 'leather', 'bridal'], 'tom'],
  '/football-soccer-seo-services': [['teamstats', 'bridal', 'leather'], 'tom'],
  '/construction-seo-services': [['builder', 'pvc', 'scaffolding'], 'louise'],
  '/legal-seo-services': [['legal', 'conscient', 'pest'], 'louise'],
  '/home-services-seo': [['pest', 'pool', 'scaffolding'], 'rj'],
  '/b2b-seo-services': [['conscient', 'industrial', 'metal'], 'auction'],
  '/real-estate-seo-services': [['builder', 'scaffolding', 'pvc'], 'rich'],
  '/finance-crypto-seo-services': [['conscient', 'legal', 'teamstats'], 'auction'],
  '/gaming-seo-services': [['teamstats', 'leather', 'bridal'], 'tom'],
  '/pet-seo-services': [['pest', 'leather', 'garden'], 'rj'],
};
export function proofBand(pathname: string): { cases: BandCase[]; review: BandReview } | null {
  const entry = PAGES[pathname.replace(/\/$/, '')];
  if (!entry) return null;
  return { cases: entry[0].map((k) => C[k]), review: R[entry[1]] };
}
