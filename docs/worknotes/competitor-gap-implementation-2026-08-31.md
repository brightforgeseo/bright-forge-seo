# Bright Forge competitor-gap implementation

## Goal
Cover every qualified SE Ranking competitor-gap cluster across existing Bright Forge pages without a dedicated pricing page, public rates, keyword stuffing, duplicate country pages or dishonest location claims.

## Completion surface
- Existing pages own all qualified intent clusters: agency/company/provider, core services, specialist/consultant, outsourcing/white-label/reseller, local SEO, technical SEO, content SEO, on-page SEO, backlinks and audits.
- Pricing terms appear naturally on an existing relevant page, explained through scope factors and a private tailored-proposal CTA, with no prices, ranges or fixed packages.
- Regression tests fail before implementation and pass afterwards.
- Full unit suite, Astro build, Bright Forge QA, lead-generation verification and diff checks pass.
- Changed routes pass desktop/mobile rendered QA.
- PR merged and exact production HTML read back.

## Evidence
- SE Ranking active on 2026-08-31.
- Qualified market-keyword rows: 188 across AU 41, UK 45 and US 102.
- Clusters are variants, not 188 distinct page intents.
- Current authority: 6 referring domains. Relevant competitors: 369 to 4,008.

## Guardrails
- No pricing page.
- No disclosed Bright Forge prices.
- Existing URLs before new pages.
- No duplicate AU/UK/US provider pages.
- Natural prose, no robotic card grids.
- Public copy uses we.
- Preserve forms, analytics, schema and tracking.

## Current blocker
- `graphify` CLI was unavailable, so the repo graph query was skipped. Direct source, tests and rendered output were used instead.

## Verification status
- Audit complete: 188 qualified AU, UK and US rows mapped to nine existing intent owners.
- Implementation complete across the homepage, Philippines SEO services, white label, local, technical, content, on-page, backlink and audit pages.
- No pricing route, country clone or public amount/range added.
- Automated tests, 93-page Astro build, nine-route Bright Forge QA and 73 lead-generation checks passed after the reader-first rewrite.
- Desktop and mobile rendered QA passed with no horizontal overflow, clipping or overlap.
- First independent review correctly rejected exact-match stacking. Copy was rewritten around buyer intent and an anti-stuffing regression was added.
- Second independent review passed with no security concerns or logic errors.
- Production deployment pending PR and CI.
