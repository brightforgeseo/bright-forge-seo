# Bright Forge Own Site Work Handoff

Date: 2026-05-23
Repo: `C:/Users/user/Documents/bright-forge-seo`
Branch: `main`
Last confirmed commit: `b45b6c76 Rewrite pest control SEO case study`

## Why this exists

Ben is pausing while adding more RAM to the computer. Resume from this file when the machine is ready again.

## Operating rules

- Content audit first before any rewrite or implementation.
- Use Bright Forge senior SEO voice: direct, commercial, specific, no generic AI-template copy.
- Use `we`, not `I`, in public/client-facing copy.
- No em dashes.
- Buyer language beats agency jargon.
- Pages must prove judgement, not just claim expertise.
- Remove or qualify fake/unsupported claims.
- Build, QA, commit, push, then production-verify before calling anything done.
- Run `git checkout -- .astro/types.d.ts` before committing so generated Astro type noise does not get committed.

## Required reference workflow

Before any Bright Forge own-site page work, load:

- `brightforge-echo`
- `brightforge-echo` reference `references/brightforge-own-site-audit.md`
- For service pages: `references/brightforge-service-page-content-audit.md` and `references/brightforge-service-page-rollout-qa.md`
- For case studies: `references/brightforge-case-study-upgrade-workflow.md` and `references/brightforge-case-study-precedents-2026-05.md`
- For homepage/service CRO layout: `references/brightforge-homepage-cro-layout-pattern.md`

## Current status

Service pages confirmed complete:

- Homepage
- `/content-seo-services-philippines/`
- `/ai-search-optimization-services-philippines/`
- `/white-label-seo-services-philippines/`
- `/seo-services-philippines/`
- `/on-page-seo-services-philippines/`
- `/backlink-building-services-philippines/`
- `/seo-audit-services/`
- `/keyword-research-services/`
- Technical SEO page
- Local SEO page
- `/website-migration-services/`
- `/contact/`

Case studies complete:

- `/case-studies/boiler-heating-spares-seo/`, commit `535826cb`
- `/case-studies/pest-control-core-update-seo/`, commit `b45b6c76`

## Last completed item

Pest control case study rewrite is complete and deployed.

Files changed:

- `src/pages/case-studies/pest-control-core-update-seo.astro`
- `src/pages/case-studies.astro`

Live verification passed:

- Title: `Pest Control SEO Case Study | Core Update Recovery`
- H1: `Pest Control SEO Case Study`
- 6 visible FAQ `<details>` items
- 6 FAQPage schema questions
- Article schema present
- 4 proof cards
- 5 workstream items
- 4 result cards
- Service links present
- Old generic phrases removed
- Index card updated with: `Recovered organic clicks after a Google core update by tightening service relevance, technical health, local intent coverage and trust signals.`

Pest control real metrics:

- Clicks: 10.3k to 23.5k, +128%
- Impressions: 1.26M to 3.12M, +147%
- Average position: 19.1 to 17.2, modest lift
- CTR: 0.8% to 0.8%, steady

## Next work when resuming

Continue the case study upgrade sprint.

Pending case studies:

1. `/case-studies/bridal-dress-designer-seo/`
2. `/case-studies/leather-wallet-ecommerce-seo/`
3. `/case-studies/football-app-seo/`

Recommended next page: `/case-studies/bridal-dress-designer-seo/`

Audit-first sequence:

1. Open live page in browser.
2. Read source file from `src/pages/case-studies/`.
3. Read matching card in `src/pages/case-studies.astro`.
4. Run technical crawl checks: title, meta, H1, word count, schema, FAQ parity, visible text.
5. Run visual audit for old-template, blank-section, fake-proof or stock-template issues.
6. Deliver audit to Ben before rewriting.
7. Only rewrite after audit has been delivered or Ben explicitly says to continue.
8. Build and QA locally.
9. Commit, push and production-verify title, H1, FAQ count, schema, visible proof blocks, service links and removal of old weak copy.

## Remaining site work after case studies

Industry page rewrites still pending:

- `/gaming-seo-services/`
- `/home-services-seo/`
- `/real-estate-seo-services/`
- `/football-soccer-seo-services/`
- `/finance-crypto-seo-services/`
- `/pet-seo-services/`

Development section audit not started:

- `/development/`
- `/development/astro/`
- `/development/wordpress/`
- `/development/nextjs/`
- `/development/react/`
- `/development/sveltekit/`

Later passes:

- Internal linking pass from upgraded service pages to SEO audit, AI search readiness, migration, case studies and contact.
- Proof strips on major service pages once case studies are all improved.

## Implementation pitfalls

Global CSS hides useful hero classes:

- `.hero-stats`
- `.hero-stats *`
- `.hero-visual`
- `.hero-visual *`
- `.hero-image-container`
- `.hero-image-container *`
- `[class$="-icon-grid"]`

Use page-specific stat classes such as `pest-hero-stats`, `migration-hero-stats`, etc.

If using the Hero visual slot, add scoped overrides inside the page style block:

```css
:global(body .hero-visual) {
  display: flex !important;
  visibility: visible !important;
}

:global(body .hero-visual *) {
  display: revert !important;
  visibility: visible !important;
}
```

FAQ rules:

- Use native `<details class="faq-item">` markup.
- Visible FAQ count must match FAQPage schema Question count exactly.

Case study rules:

- Structure around starting problem, constraints, work done, measured results, commercial meaning, lessons and FAQs.
- Interpret metrics honestly. If average position barely moved, say so.
- Add contextual service links.
- Update `src/pages/case-studies.astro` card copy alongside individual case study page.
- Add Article schema.
- No generic lines like `transform their digital presence`.

## Verification commands

From repo root:

```bash
npm run build
git checkout -- .astro/types.d.ts
git status --short
git log -1 --oneline
```

Production checks can be done with browser and/or curl against `https://brightforge.com.ph/`.

## SE Ranking note

SE Ranking MCP was timing out during the last run. Retry once or twice serially at the start of the next page. If it still times out, continue from live crawl, source and browser evidence, and label SE Ranking data as unavailable rather than guessing.
