# Bright Forge development gate

Use this before any Bright Forge site implementation, especially design, SEO, IA, sitemap, nav, content, or publishing work.

## Preflight

- User request:
- Page/component/route:
- Is this content, design, code, SEO, IA, sitemap, nav, CI, or publishing?
- What must not change?
- Shared components/patterns to inspect first:
- Accepted design/content pattern to match:
- Files likely affected:
- QA evidence required before Done:

## Acceptance checks

- [ ] Every requested fix has a separate QA item.
- [ ] Source files inspected before patching.
- [ ] Shared components/pattern sources inspected before patching.
- [ ] Content preserved unless rewrite was explicit.
- [ ] `npm run build` passed.
- [ ] `python scripts/brightforge_qa.py` passed for site work, or a narrower reason was documented.
- [ ] Rendered desktop checked for visual/layout work.
- [ ] Rendered mobile checked for visual/layout work.
- [ ] Sitemap/nav/footer checked for new pages.
- [ ] Diff reviewed before commit.
- [ ] No generated noise committed unintentionally.

## Pre-commit review prompt

Before committing, review the diff against this checklist:

1. Did the change answer the full request, not just the visible screenshot?
2. Did it touch shared components safely?
3. Did it preserve copy unless Ben asked for copy changes?
4. Does it match the accepted Bright Forge dark/orange design system?
5. Are sitemap, nav, footer and canonical handled for new pages?
6. Are H1/H2 orange span patterns intact?
7. Did the QA runner/build pass?
8. Is the commit scoped and readable?
