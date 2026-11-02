import test from 'node:test';
import assert from 'node:assert/strict';
import { getBlogMetadata } from '../src/lib/blogMetadata.js';
test('exact cleared SEO and AI search metadata, isolated slug', () => {
 assert.deepEqual(getBlogMetadata('why-invest-in-seo-and-ai-search'), {
  title: 'SEO and AI Search Investment | Bright Forge',
  description: 'Decide whether to fund SEO and AI search, what to fix first and how to measure commercial value. Set practical investment priorities with Bright Forge.'
 });
 assert.equal(getBlogMetadata('why-invest-in-seo-and-ai-search-other'), null);
});
