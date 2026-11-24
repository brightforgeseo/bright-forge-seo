import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

for (const [file, selector] of [['src/pages/index.astro', '.pf-team > li'], ['src/pages/about-us.astro', '.team-grid > .team-card']]) {
  test(`${file}: Sassin first, Ben second, other staff unchanged`, () => {
    const document = new JSDOM(readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')).window.document;
    const cards = [...document.querySelectorAll(selector)];
    assert.deepEqual(cards.map(c => c.querySelector('a[href^="/authors/"]').textContent), ['Sassin Lowe', 'Ben Lowe', 'Jani A. Cañonero', 'Jewe O. Manalo']);
    assert.match(cards[0].textContent, /Owner & Founder/);
    assert.match(cards[1].textContent, /SEO Director/);
    assert.match(cards[0].querySelector('img').src, /sassin-lowe-owner/);
    assert.match(cards[1].querySelector('img').src, /ben-lowe-owner/);
  });
}
