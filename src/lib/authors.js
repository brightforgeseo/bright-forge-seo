// Centralized author profile data used by blog articles and author detail pages.
// Slug is the URL segment (e.g. /authors/ben-lowe/).

export const authors = {
  'ben-lowe': {
    slug: 'ben-lowe',
    name: 'Ben Lowe',
    role: 'CEO & Co-Founder',
    shortBio:
      'CEO and Co-Founder of Bright Forge SEO Agency with over 15 years of experience in digital marketing. Ben specializes in on-page and off-page SEO strategies, AI-driven search optimization, and delivering personalized, results-oriented solutions that drive real growth for businesses across diverse industries.',
    longBio: [
      "As the founder of Bright Forge SEO Agency, Ben brings a wealth of experience and passion for digital marketing. Over the years, he has honed his expertise in all facets of SEO, from on-page and off-page strategies to cutting-edge AI SEO optimization.",
      "With certifications from industry leaders and a marketing degree from Metro London University, Ben is committed to delivering personalized, results-oriented solutions that drive real growth for businesses. He founded Bright Forge SEO Agency after years of working with e-commerce startups, SaaS companies, local businesses, and major corporations across the UK and United States.",
      "Based in the dynamic heart of Quezon City, Metro Manila, Ben leads a team that combines a global perspective with a deep understanding of local markets. His approach is data-driven, adaptable to the evolving search landscape, and laser-focused on measurable outcomes for every client."
    ],
    avatar: '/images/About us/ben-lowe-owner.webp',
    location: 'Quezon City, Philippines',
    education: 'Marketing Degree, Metro London University',
    yearsExperience: '15+',
    expertise: [
      'On-Page SEO',
      'Off-Page SEO',
      'AI-Driven Search Optimization',
      'Technical SEO',
      'E-commerce SEO',
      'Local SEO',
      'Content Strategy',
      'Search Generative Experience (SGE)'
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
        question: 'What inspired Ben Lowe to start Bright Forge SEO Agency?',
        answer:
          "Ben's passion for digital marketing and his desire to help businesses succeed in an increasingly competitive online environment motivated him to establish Bright Forge SEO Agency. With over 15 years of experience, Ben wanted to create an agency that combines innovation, expertise, and personalized strategies to deliver outstanding results."
      },
      {
        question: 'What sets Ben apart as an SEO specialist?',
        answer:
          "Ben's unique combination of technical expertise, a data-driven approach, and a deep understanding of AI-driven search trends sets him apart. His ability to adapt to the evolving digital landscape and deliver customized solutions ensures his clients stay ahead of the competition."
      },
      {
        question: 'What industries has Ben worked with?',
        answer:
          'Ben has collaborated with a wide range of industries, including e-commerce, SaaS companies, local businesses, and major corporations in both the UK and the United States.'
      },
      {
        question: 'How does Ben approach client projects?',
        answer:
          "Ben takes a personalized approach to every project, starting with a thorough analysis of the client's goals, audience, and competition. He then crafts a tailored SEO strategy designed to deliver measurable and sustainable results."
      },
      {
        question: 'What motivates Ben in his work?',
        answer:
          'Ben is driven by a passion for helping businesses unlock their full potential through innovative and effective SEO strategies. Seeing his clients succeed and grow is his greatest reward.'
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
    name: 'Janin A. Cañonero',
    role: 'SEO Manager',
    shortBio:
      'SEO Manager at Bright Forge SEO Agency. Janin runs campaign execution, checks implementation against the brief and keeps work aligned with current search engine behaviour.',
    longBio: [
      'Janin manages SEO campaigns for Bright Forge from Quezon City, including tasking, quality checks and the weekly delivery loop.',
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
  for (const key of Object.keys(authors)) {
    if (authors[key].name.toLowerCase() === target) return key;
  }
  return null;
}

export function getAuthorBySlug(slug) {
  return authors[slug] || null;
}
