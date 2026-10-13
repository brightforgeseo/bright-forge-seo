import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { JSDOM } from 'jsdom';

function page(route = '') {
  return new JSDOM(readFileSync(`dist/${route ? route + '/' : ''}index.html`, 'utf8')).window.document;
}

test('homepage review CTA follows the opening offer before supporting proof', () => {
  const document = page();
  const hero = document.querySelector('.homepage-hero');
  const lead = hero.querySelector('p');
  const proof = [...hero.querySelectorAll('p')].find(p => p.textContent.includes('British-led delivery'));
  const action = hero.querySelector('.hero-buttons');
  assert(lead.compareDocumentPosition(action) & 4, 'CTA must follow the opening offer');
  assert(action.compareDocumentPosition(proof) & 4, 'CTA must precede supporting proof rather than sit after three paragraphs');
  assert.equal(document.querySelectorAll('main h1').length, 1);
  assert.match(hero.textContent, /We combine technical SEO, content, local search/);
});

test('international homepage block links directly to existing country owners', () => {
  const document = page();
  const block = document.querySelector('[data-fit-panel="intl"]');
  for (const country of ['uk', 'usa', 'australia']) {
    assert(block.querySelector(`a[href="/seo-services-${country}/"]`), country);
  }
});

test('on-page offer routes agency outsourcing buyers to white-label owner', () => {
  const document = page('on-page-seo-services-philippines');
  assert(document.querySelector('.internal-links-section a[href="/white-label-seo-services-philippines/"]'));
});

test('US portfolio scope is explicit rather than implied US proof', () => {
  const document = page('seo-services-usa');
  assert.match(document.querySelector('.portfolio-scope-note')?.textContent || '', /not US-only/);
});

test('country pages use canonical team roles and no conflicting university name', () => {
  for (const route of ['seo-services-uk', 'seo-services-usa', 'seo-services-australia']) {
    const document = page(route);
    assert.doesNotMatch(document.body.textContent, /Metro London University|SEO [Mm]anager Janin/);
  }
  const names = page('seo-services-usa').querySelector('.team-names').textContent;
  assert.match(names, /Sassin LoweCo-Founder/);
  assert.match(names, /Jani A. CañoneroHead of Team/);
});

test('About permission wording matches conditional named-case publication policy', () => {
  const text = page('about-us').querySelector('.team-standards-note').textContent;
  assert.doesNotMatch(text, /why we do not name client websites/);
  assert.match(text, /permission/);
});

test('shared response expectation is business-day based and office timezone explicit', () => {
  const document = page('contact');
  assert.match(document.body.textContent, /Asia\/Manila \(UTC\+08:00\)/);
  assert.doesNotMatch(page('about-us').body.textContent, /respond within 24 hours/);
});

test('legal page has legal intent, noindex follow and no sitemap entry', () => {
  const document = page('terms-of-service');
  assert.equal(document.querySelector('main h1').textContent.trim(), 'Terms of Service');
  assert.match(document.querySelector('meta[name="robots"]').content, /noindex,\s*follow/);
  assert.doesNotMatch(readFileSync('dist/sitemap.xml', 'utf8'), /<loc>https:\/\/brightforge\.com\.ph\/terms-of-service\/<\/loc>/);
});

test('production analytics guard disables staging without disabling the canonical site', () => {
  const document = page();
  const script = document.querySelector('head script[data-analytics-scope]');
  assert(script, 'Early analytics scope guard must precede injected Google config');
  for (const host of ['brightforge.com.ph', 'localhost', '127.0.0.1', 'preview.netlify.app', 'ninjaseomarketing.com']) {
    const context = { window: { location: { hostname: host } } };
    vm.runInNewContext(script.textContent, context);
    assert.equal(context.window['ga-disable-G-B8RRWP6CBD'], host !== 'brightforge.com.ph', host);
    assert.equal(context.window.BFAnalyticsScope.production, host === 'brightforge.com.ph', host);
  }
});

test('white-label buyers can inspect a real own-site handoff sample without client disclosure', () => {
  const document = page('white-label-seo-services-philippines');
  const sample = document.querySelector('main a[href="/samples/technical-review-handoff.csv"]');
  assert(sample, 'A real downloadable delivery sample must be in main content');
  assert.match(document.querySelector('#delivery-sample').textContent, /our own website/);
  const csv = readFileSync('public/samples/technical-review-handoff.csv', 'utf8');
  assert.match(csv, /Acceptance Check/);
  assert.match(csv, /https:\/\/brightforge.com.ph\//);
  assert.doesNotMatch(csv, /Gerry|Supabase|Hermes|Bearer|@10xr|client_secret/i);
  assert(document.querySelector('#delivery-sample a[href="/case-studies/football-app-seo/"]'));
});

test('services hub proof cards link directly to their actual cases and source metric', () => {
  const document = page('seo-services-philippines');
  for (const route of ['bridal-dress-designer-seo', 'leather-wallet-ecommerce-seo', 'football-app-seo']) {
    assert(document.querySelector(`main a[href="/case-studies/${route}/"]`), route);
  }
  assert(!/137\.5% organic traffic|34% organic traffic/.test(document.querySelector('main').textContent), 'Proof cards must name GSC clicks');
});

test('UK proof never reuses an Australian results image or unverified growth figure', () => {
  for (const route of ['seo-services-uk', 'ecommerce-seo-services', 'case-studies/speediance-uk-fitness-seo']) {
    const document = page(route);
    assert(!/119%|4\.74K|2\.16K/.test(document.querySelector('main').textContent), `${route}: unsupported UK figures must remain off the live result surface`);
  }
  const document = page('case-studies/speediance-uk-fitness-seo');
  assert(![...document.querySelectorAll('main img')].some(img => img.getAttribute('src').includes('Speediance AU')), 'AU chart is not UK evidence');
});

test('AU and Phoenix name clicks, disclose source limits and do not invent lead or ranking gains', () => {
  for (const route of ['case-studies/speediance-au-fitness-seo', 'case-studies/phoenix-spa-beauty-seo']) {
    const document = page(route);
    assert.match(document.querySelector('.comparison-scope-note')?.textContent || '', /Previous 6 months/);
    assert.match(document.querySelector('.comparison-scope-note')?.textContent || '', /calendar dates/);
    assert(!/leads|dominate|massive gains/i.test(document.querySelector('meta[name="description"]').content), route);
  }
  const phoenix = page('case-studies/phoenix-spa-beauty-seo');
  assert.match(phoenix.title, /Phoenix Brighton Spa/);
  assert(!/Maintained visibility|Broader keyword spread|Stable/.test(phoenix.querySelector('main').textContent));
  const au = page('case-studies/speediance-au-fitness-seo');
  assert(!/Organic Traffic/.test(au.querySelector('main').textContent));
  assert.match(au.querySelector('main').textContent, /24\.9/);
  assert.match(au.querySelector('main').textContent, /28\.1/);
});

test('article rendering path uses the same production analytics guard', () => {
  const document = page('blog/answer-engine-revolution');
  assert.equal(document.querySelectorAll('head script[data-analytics-scope]').length, 1);
});

test('negative comparison directions are not styled as positive improvements', () => {
  for (const route of ['case-studies/speediance-au-fitness-seo', 'case-studies/phoenix-spa-beauty-seo']) {
    const document = page(route);
    const rows = [...document.querySelectorAll('.results-table tbody tr')];
    for (const row of rows) {
      const note = row.querySelector('td:last-child');
      if (/Worse|decreased/.test(note.textContent)) assert(note.classList.contains('metric-decline'), route);
    }
  }
});

function schemas(document) {
  return [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap(s => {
    const value = JSON.parse(s.textContent);
    return value['@graph'] || [value];
  });
}

test('visible scoped services do not advertise unsupported generic packages', () => {
  for (const route of ['white-label-seo-services-philippines', 'on-page-seo-services-philippines', 'seo-services-uk', 'seo-services-usa', 'seo-services-australia']) {
    assert.doesNotMatch(JSON.stringify(schemas(page(route))), /Basic SEO Package|Advanced SEO Package|Enterprise SEO Package/, route);
  }
});

test('UK and US have one service identity for their canonical URL', () => {
  for (const route of ['seo-services-uk', 'seo-services-usa']) {
    const canonical = `https://brightforge.com.ph/${route}/`;
    assert.equal(schemas(page(route)).filter(s => s['@type'] === 'Service' && s.url === canonical).length, 1, route);
  }
});

test('Australian service schema describes Australia rather than default four-country area', () => {
  const service = schemas(page('seo-services-australia')).find(s => s['@type'] === 'Service');
  const areas = Array.isArray(service.areaServed) ? service.areaServed : [service.areaServed];
  assert.deepEqual(areas.map(a => a.name), ['Australia']);
});

for (const route of ['seo-services-usa', 'seo-services-australia', 'seo-services-uk', 'white-label-seo-services-philippines']) {
  test(`${route} proposal CTA follows first offer before scope and proof`, () => {
    const document = page(route);
    const hero = document.querySelector('.hero-modern');
    const paragraphs = [...hero.querySelectorAll('.hero-story p, .hero-intro p')];
    const action = hero.querySelector('.hero-actions');
    assert(paragraphs[0].compareDocumentPosition(action) & 4);
    assert(action.compareDocumentPosition(paragraphs[1]) & 4, 'Proposal CTA must precede extended scope and proof');
    assert.equal(document.querySelectorAll('main h1').length, 1);
  });
}
