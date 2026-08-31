# Broad competitor gap implementation, 31 August 2026

## Request

Correct the provider-focused competitor gap pass by auditing unmodified SEO and development opportunities across Australia, the United Kingdom and the United States. Add qualified gaps to existing pages wherever intent overlaps. Do not publish pricing or create thin duplicate pages.

## Evidence

- 5,008 raw SE Ranking competitor rows reviewed.
- 2,847 rows from four SEO competitors.
- 2,161 rows from four added development competitors.
- 138 market-keyword candidate rows after theme, volume and ranking filters.
- 97 distinct candidate phrases.
- 18 canonical owner clusters retained for site mapping.
- Three low-evidence enterprise SEO rows excluded from implementation.

## Ownership decisions

- Homepage: broad SEO strategy, consulting and commercial-roadmap intent.
- `/development/`: web design, web development, Philippines delivery, outsourcing, new website SEO and private pricing-factor intent.
- `/development/wordpress/`: WordPress development in the Philippines and WordPress SEO crossover.
- `/ecommerce-seo-services/`: Shopify SEO and WooCommerce SEO.
- `/seo-audit-services/`: SEO audit checklist.
- `/seo-command-centre/`: SEO dashboard language.
- Existing local, on-page, keyword research, AI search, migration and framework pages retain their current clusters without duplicate pages.

## Explicit non-actions

- No `/seo-strategy-services/` page.
- No development pricing page.
- No Australia, UK or USA development duplicates.
- No public rates, ranges or fixed package prices.
- No ecommerce development claim.
- No enterprise SEO claim.
- No stale tool, algorithm, job, course or interview content copied from competitors.

## Development gate

- Request type: SEO content, IA and publishing.
- Shared pattern: existing Bright Forge dark editorial service-page sections.
- Must not change: HeroGlobe, lead tracking, forms, pricing privacy, country positioning, existing URL ownership.
- QA items: cluster fixture, semantic coverage tests, anti-stuffing test, amount disclosure test, full unit suite, Astro build, route QA, lead checks, desktop and mobile rendered checks, diff review, preview readback and live readback.

## Current status

- Red-phase broad coverage test failed before source changes.
- Source implementation completed across six existing pages.
- All 17 unit tests passed.
- Astro build passed with 93 pages.
- Six-route Bright Forge QA passed. Existing unrelated warnings remain unchanged.
- Lead-generation verification passed all 73 checks.
- Desktop and mobile rendered QA passed for all six changed routes.
- Exact development pricing-section visual and overflow checks passed at desktop and mobile widths.
- Local readback passed six routes, 17 phrase checks, pricing privacy, one H1 per route and six forbidden-route 404 checks.
- Staged static security scan returned zero detected hits.
- First independent review identified stale QA status in this worknote and requested exact fixture cardinality. Both were fixed.
- Second independent pre-commit review passed with no security, logic, stuffing, cannibalisation or pricing-privacy findings.
- Deployment verification remains pending.
