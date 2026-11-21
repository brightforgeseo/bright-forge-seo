// Spelling by market. The site default is American English (the agency is in the Philippines, where
// American spelling is standard). The UK, Australia and New Zealand pages are written in British-style
// spelling, so shared components that render on those pages pass their visible text through spell().
export type Spelling = 'american' | 'british';

const BRITISH_PAGES = ['/seo-services-uk', '/seo-services-australia', '/seo-services-new-zealand'];

export function spellingFor(pathname: string): Spelling {
  const path = (pathname || '/').replace(/\/+$/, '');
  return BRITISH_PAGES.includes(path) ? 'british' : 'american';
}

// American forms used in shared components, with their British-style equivalents.
const BRITISH: Record<string, string> = {
  optimize: 'optimise',
  optimized: 'optimised',
  optimization: 'optimisation',
  catalog: 'catalogue',
  catalogs: 'catalogues',
  inquiry: 'enquiry',
  inquiries: 'enquiries',
  inquire: 'enquire',
  anonymized: 'anonymised',
  prioritized: 'prioritised',
  organization: 'organisation',
};
const WORD = new RegExp(`\\b(${Object.keys(BRITISH).join('|')})\\b`, 'gi');

export function spell(text: string, spelling: Spelling): string {
  if (spelling !== 'british') return text;
  return text.replace(WORD, (word) => {
    const british = BRITISH[word.toLowerCase()];
    return word[0] === word[0].toUpperCase() ? british[0].toUpperCase() + british.slice(1) : british;
  });
}
