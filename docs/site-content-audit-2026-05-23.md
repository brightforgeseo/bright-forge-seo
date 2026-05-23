# Bright Forge SEO Site-Wide Content Audit

Date: 2026-05-23

## Executive summary

The site has a strong base: 68 built pages, a clear SEO-first service architecture, good internal coverage across technical SEO, content SEO, local SEO, AI search readiness, migrations, audits and white label fulfilment. The main issue is not missing pages. It is uneven quality between newer strategic pages and older template-led service pages.

Highest priority fixes completed in this pass:

- Fixed the FAQ interaction bug caused by duplicate click handlers on accordion pages.
- Fixed the white label FAQ so answers open properly.
- Fixed the only broken internal service link: the SEO services hub pointed to a non-existent answer-engine URL instead of the live AI Search Optimization page.
- Strengthened the SEO services hub with clearer commercial copy, a visible FAQ section and FAQ schema.
- Reduced generic sales phrasing on the SEO services hub.

## Site-wide findings

### 1. FAQ behaviour

Issue: several accordion FAQ templates had both inline `onclick="toggleFAQ(this)"` handlers and JavaScript `addEventListener('click')` bindings. One click fired twice, so answers opened then immediately closed. This made the FAQ look empty.

Affected pages fixed:

- `/white-label-seo-services-philippines/`
- `/seo-audit-services/`
- `/keyword-research-services/`
- `/website-migration-services/`
- `/development/astro/`

Recommendation: avoid inline FAQ handlers on future pages. Use one delegated listener or static FAQ cards where interaction is not essential.

### 2. Broken internal links

Only one broken internal page link was found in the static build:

- `/seo-services-philippines/` linked to `/answer-engine-optimization-services-philippines/`

Fix applied:

- Updated link and schema target to `/ai-search-optimization-services-philippines/`.

### 3. SEO services hub

Issue: the hub page was serviceable but too generic for a flagship page. It used phrases like "transform your online presence", "dominate search results" and "comprehensive SEO services" without enough commercial specificity.

Fix applied:

- Rewrote the hero story around technical clean-up, buyer-intent pages, internal links, authority and commercial reporting.
- Added a visible FAQ section answering buyer questions before enquiry.
- Added FAQ schema through `MainLayout`.
- Updated the AI search service card to use SEO-first AI readiness positioning.

Next recommendation:

- Add a short proof strip linking to 3 relevant case studies once case study copy is improved.

### 4. Older service pages still feel templated

Pages needing a second-stage rewrite because they still use generic agency language or older SEO copy patterns:

- `/on-page-seo-services-philippines/`
- `/technical-seo-services-philippines/`
- `/backlink-seo-services-philippines/`
- `/local-seo-services-philippines/`
- `/content-seo-services-philippines/`
- `/gaming-seo-services/`
- `/home-services-seo/`
- `/real-estate-seo-services/`
- `/football-soccer-seo-services/`
- `/finance-crypto-seo-services/`
- `/pet-seo-services/`

Common patterns to remove:

- "Dominate"
- "Transform your online presence"
- "Cutting-edge"
- "Tailored solutions"
- "Comprehensive"
- "Digital landscape"
- Over-claimed stats without proof context

Preferred replacement style:

- Specific pain point
- Specific SEO mechanism
- Specific commercial outcome
- Clear limitation or expectation where useful

Example direction:

- Weak: "Transform your online presence with comprehensive SEO."
- Better: "We fix the page-level signals that stop useful pages ranking: titles, headings, content depth, internal links, schema and search intent alignment."

### 5. Case studies need stronger commercial stories

Case study pages are not technically thin after rendering, but many still read like templated cards. They need better narrative shape:

- Starting problem
- Constraints
- What changed
- What moved
- Commercial meaning
- Lessons for similar businesses

Priority pages for improvement:

- `/case-studies/boiler-heating-spares-seo/`
- `/case-studies/pest-control-core-update-seo/`
- `/case-studies/bridal-dress-designer-seo/`
- `/case-studies/leather-wallet-ecommerce-seo/`
- `/case-studies/football-app-seo/`

### 6. AI readiness positioning is mostly right

The AI search page is much closer to the current Bright Forge position: AI readiness layered on top of SEO, not replacing SEO. Keep this framing.

Watch-outs:

- Avoid overpromising AI citation control.
- Avoid saying `llms.txt` is a Google ranking factor.
- Keep CRO tied to SEO because clicks are becoming more valuable.

### 7. Contact page strengthened

The contact page has been reworked into a practical SEO review request page rather than a generic contact page.

Completed improvements:

- Reframed the H1 and hero around requesting an SEO review.
- Added response-time expectation.
- Added service-fit guidance.
- Added a website URL field and fuller service dropdown.
- Strengthened the submit CTA.
- Added a proof-before-pitch section and next-step explanation.
- Suppressed the timed popup form on the contact page so only one lead form renders.

### 8. Internal linking opportunities

Add contextual links from service pages to:

- SEO audit page
- AI search readiness page
- Website migration page
- Relevant case studies
- Contact page with service-specific anchor text

## Recommended next sprint

### Sprint 1: flagship service quality

- Rewrite `/seo-services-philippines/` into a true hub page with proof strip and service-path navigation.
- Rewrite `/technical-seo-services-philippines/` with diagnostics, crawl/indexation, CWV, JS rendering, schema and migration risk.
- Rewrite `/on-page-seo-services-philippines/` with page-level relevance, intent matching, internal links and conversion copy.

### Sprint 2: trust and conversion

- Improve case study narrative templates.
- Add CRO language to service pages without diluting SEO targeting.

### Sprint 3: industry pages

- Rewrite industry pages around buyer intent and sector-specific search behaviour.
- Add industry-specific FAQs.
- Add internal links to the most relevant core service pages.

## Implementation rules going forward

- Preserve existing keyword targets before rewriting H1s, titles or URLs.
- Avoid uniform card-grid layouts where a more editorial section would feel more human.
- Use British spelling where natural: optimisation, prioritise, enquiries.
- Keep AI readiness as an SEO layer, not a replacement.
- Use "we" in client-facing copy.
- No em dashes.
