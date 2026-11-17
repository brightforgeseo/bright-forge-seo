// Centralized author profile data used by blog articles and author detail pages.
// Slug is the URL segment (e.g. /authors/ben-lowe/).

export const authors = {
  'ben-lowe': {
    slug: 'ben-lowe',
    name: 'Ben Lowe',
    role: 'Founder & CEO',
    shortBio:
      'Founder and CEO of Bright Forge SEO. Ben has worked in SEO for more than 15 years with ecommerce, SaaS and local service businesses in the UK and United States, holds a marketing degree from London Metropolitan University, and leads the team from Quezon City.',
    longBio: [
      'Ben is the founder and CEO of Bright Forge SEO. He has worked in SEO for more than 15 years and holds a marketing degree from London Metropolitan University.',
      'Before starting the agency he worked with ecommerce startups, SaaS companies, local businesses and larger corporations in the UK and the United States.',
      'He is based in Quezon City, Metro Manila, and leads the Bright Forge team from there.'
    ],
    avatar: '/images/About us/ben-lowe-owner.webp',
    location: 'Quezon City, Philippines',
    education: 'Marketing Degree, London Metropolitan University',
    yearsExperience: '15+',
    expertise: [
      'On-Page SEO',
      'Off-Page SEO',
      'AI-Driven Search Optimization',
      'Technical SEO',
      'E-commerce SEO',
      'Local SEO',
      'Content Strategy',
      'AI search readiness'
    ],
    industries: [
      'E-commerce',
      'SaaS',
      'Local Businesses',
      'Finance & Crypto',
      'Real Estate',
      'Home Services',
      'Gaming',
      'Pet Industry'
    ],
    faqs: [
      {
        question: 'What industries has Ben worked with?',
        answer:
          'Ben has worked with ecommerce startups, SaaS companies, local businesses and larger corporations in the UK and the United States.'
      }
    ],
    linkedin: '',
    twitter: '',
    email: 'seo@brightforgeseo.com'
  },
  'sassin-lowe': {
    slug: 'sassin-lowe',
    name: 'Sassin Lowe',
    role: 'Co-Founder',
    shortBio:
      'Co-Founder of Bright Forge SEO Agency. Sassin leads operations and keeps delivery, reporting and client communication aligned with the work that is actually being done.',
    longBio: [
      'Sassin co-founded Bright Forge SEO Agency with Ben Lowe and runs the operational side of the company from Quezon City.',
      'The job is to keep campaigns moving: scope, delivery rhythm, reporting and the gap between what was recommended and what was implemented.',
      'That operational check is part of how we keep public claims and client reporting honest.'
    ],
    avatar: '/images/About us/sassin-lowe-owner.webp',
    location: 'Quezon City, Philippines',
    education: '',
    yearsExperience: '',
    expertise: ['SEO operations', 'Client reporting', 'Delivery quality'],
    industries: ['E-commerce', 'Local businesses', 'Service businesses'],
    faqs: [],
    linkedin: '',
    twitter: '',
    email: 'seo@brightforgeseo.com'
  },
  'janin-a-canonero': {
    slug: 'janin-a-canonero',
    name: 'Jani A. Cañonero',
    role: 'Head of Team',
    shortBio:
      'Head of Team at Bright Forge SEO. Jani runs campaign execution, checks implementation against the brief and keeps work aligned with current search engine behaviour.',
    longBio: [
      'Jani manages SEO campaigns for Bright Forge from Quezon City, including tasking, quality checks and the weekly delivery loop.',
      'The work covers technical recommendations, on-page changes, content briefs and reporting that can be tied back to Search Console and ranking data.',
      'Named ownership matters: if a recommendation ships, it has been through this review rather than left as an unsigned agency note.'
    ],
    avatar: '/images/About us/Janin-seo-manager.webp',
    location: 'Quezon City, Philippines',
    education: '',
    yearsExperience: '',
    expertise: ['Campaign management', 'On-page SEO', 'Technical SEO', 'Reporting'],
    industries: ['E-commerce', 'Local services', 'International brands'],
    faqs: [],
    linkedin: '',
    twitter: '',
    email: 'seo@brightforgeseo.com'
  },
  'jewe-o-manalo': {
    slug: 'jewe-o-manalo',
    name: 'Jewe O. Manalo',
    role: 'SEO Expert',
    shortBio:
      'SEO Expert at Bright Forge SEO Agency. Jewe works on keyword research, technical SEO and content optimisation that has to survive a crawl and a live-page check.',
    longBio: [
      'Jewe handles the specialist SEO work inside Bright Forge campaigns: keyword mapping, technical checks and on-page changes.',
      'Recommendations are written so a developer or editor can implement them, then checked on the live URL rather than left in a spreadsheet.',
      'That implementation loop is how we keep advice tied to pages that actually exist.'
    ],
    avatar: '/images/About us/jewe-seo-expert.webp',
    location: 'Quezon City, Philippines',
    education: '',
    yearsExperience: '',
    expertise: ['Keyword research', 'Technical SEO', 'Content optimisation'],
    industries: ['E-commerce', 'Service businesses', 'SaaS'],
    faqs: [],
    linkedin: '',
    twitter: '',
    email: 'seo@brightforgeseo.com'
  }
};

// Given an author display name, return the slug used in URLs (or null if unknown).
export function getAuthorSlug(name) {
  if (!name) return null;
  const target = String(name).trim().toLowerCase();
  // Earlier spellings used on older CMS posts.
  if (['janin a. cañonero', 'janin a. canonero', 'jaine canonero'].includes(target)) return 'janin-a-canonero';
  for (const key of Object.keys(authors)) {
    if (authors[key].name.toLowerCase() === target) return key;
  }
  return null;
}

export function getAuthorBySlug(slug) {
  return authors[slug] || null;
}
