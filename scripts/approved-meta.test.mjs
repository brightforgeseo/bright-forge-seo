import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { JSDOM } from 'jsdom';

export const approved = [
  ['/', 'SEO Agency Philippines | Bright Forge', 'SEO built around what you sell, not just keyword rankings. We improve how buyers find your website and enquire. Request an SEO review.'],
  ['/seo-services-philippines/', 'SEO Services Philippines | Managed SEO | Bright Forge', 'Get an SEO plan built around your sales priorities, with the technical fixes and page improvements to put it into practice. See what’s included.'],
  ['/white-label-seo-services-philippines/', 'SEO Outsourcing Philippines for Agencies | White Label SEO', 'Take on more SEO work without hiring an in-house team. We deliver under your agency brand, with senior review. You keep the client relationship.'],
  ['/technical-seo-services-philippines/', 'Technical SEO Services Philippines | Bright Forge', 'Pages missing from Google? Traffic down after a rebuild? We investigate indexing, speed and redirects, with fixes your developer can test.'],
  ['/on-page-seo-services-philippines/', 'On-Page SEO Services Philippines | Bright Forge', 'Help buyers understand your offer and take the next step. We improve your key pages, with before-and-after copy for you to approve.'],
];
for (const [route, title, description] of approved) {
  test(`approved exact metadata ${route}`, () => {
    const document = new JSDOM(fs.readFileSync(`dist${route}index.html`, 'utf8')).window.document;
    assert.equal(document.querySelectorAll('title').length, 1);
    assert.equal(document.title, title);
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
      assert.equal(document.querySelectorAll(selector).length, 1);
      assert.equal(document.querySelector(selector).content, description);
    }
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) assert.equal(document.querySelector(selector).content, title);
    assert.equal(document.querySelector('link[rel="canonical"]').href, `https://brightforge.com.ph${route}`);
    assert.ok(!document.querySelector('meta[name="robots"]')?.content.includes('noindex'));
    assert.equal(document.querySelectorAll('h1').length, 1);
  });
}
