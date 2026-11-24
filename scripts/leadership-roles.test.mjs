import test from 'node:test';
import assert from 'node:assert/strict';
import { authors } from '../src/lib/authors.js';
import { readFileSync } from 'node:fs';

test('public profiles identify Sassin as owner and founder and Ben as SEO director', () => {
  assert.equal(authors['sassin-lowe'].role, 'Owner & Founder');
  assert.equal(authors['ben-lowe'].role, 'SEO Director');
  assert.match(authors['sassin-lowe'].shortBio, /^Owner and Founder/);
  assert.match(authors['ben-lowe'].shortBio, /^SEO Director/);
  assert.doesNotMatch(JSON.stringify(authors['ben-lowe']), /founder|CEO|starting the agency/i);
  assert.doesNotMatch(JSON.stringify(authors['sassin-lowe']), /co-founder|co-founded/i);
});

test('shared site copy and biographies do not retain superseded leadership roles', () => {
  const files = ['src/pages/about-us.astro', 'src/pages/index.astro', 'src/pages/seo-services-usa.astro', 'src/pages/seo-services-uk.astro', 'src/pages/seo-services-australia.astro', 'src/pages/seo-services-philippines.astro', 'src/pages/seo-services-new-zealand.astro', 'src/components/WhyChooseUs.astro', 'src/pages/blog/[slug].astro'];
  for (const file of files) {
    const source = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
    assert.doesNotMatch(source, /(?:co-founder|co-founded|founder &(?:amp;)? CEO|founder and CEO|founded by (?:SEO professional )?Ben Lowe|Ben founded|our founder|Ben Lowe, founder|founder-led strategy|Founder SEO experience|founded and led by Ben Lowe|Ben Lowe founded)/i, file);
  }
  for (const file of ['src/pages/about-us.astro', 'src/pages/index.astro', 'src/pages/seo-services-usa.astro']) {
    const source = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
    assert.match(source, /SEO Director/, file);
    assert.match(source, /Owner &(?:amp;)? Founder/, file);
  }
});
