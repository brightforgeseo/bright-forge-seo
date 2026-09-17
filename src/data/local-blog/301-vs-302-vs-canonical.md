---
title: 301 vs 302 vs Canonical
slug: 301-vs-302-vs-canonical
excerpt: "A 301 moves the URL, a 302 keeps the original, and a canonical is a hint. Pick the signal that matches whether the old address should still exist."
date: 2026-09-17
author: Ben Lowe
tags: [seo]
image: /images/blog/301-vs-302-vs-canonical.webp
metaTitle: "301 vs 302 vs Canonical: Which Signal to Use | Bright Forge"
metaDescription: "When to 301, when to 302, and when a canonical is enough. Send the URL if mixed redirects are splitting your index."
---

# 301 vs 302 vs Canonical

The choice is not a style preference. It is a statement about whether the old URL should still exist, and which address Google should treat as the one that belongs in search. Get that statement wrong and you split rankings, waste crawl time, or leave shoppers on a URL you thought you had retired.

A 301 says the move is permanent and the new URL should take over. A 302 says the move is temporary and the original URL should stay the one that ranks. A [canonical tag](/blog/canonical-tag-strategy-preventing-duplicate-content-issues/) says both URLs can stay live, but one of them is the preferred copy. Those three jobs do not overlap as cleanly as plugin dropdowns pretend they do.

## What Google Actually Does With Each Signal

Google's own crawling documentation is blunt. Permanent redirects (HTTP 301 and 308, plus instant meta refresh and some JavaScript location changes) are treated as a signal that the redirect target should become canonical. Temporary redirects (HTTP 302 and 307) are followed, but the indexing pipeline does not treat them as a canonicalisation signal. Search results are supposed to keep showing the source URL while the temporary redirect is in place.

That last point is the one teams miss during a redesign. If you 302 every old product URL to the new catalogue because "we might roll back", Google is being told the old URLs are still the ones that belong in the index. Months later the new URLs have thin history, the old URLs still appear in Search Console, and the migration looks like it "didn't work".

A `rel="canonical"` annotation is also a strong signal, but it is not as strong as a redirect. Google lists redirects first, then canonical link annotations, then other hints such as sitemaps and internal links. The canonical does not move the user. Both URLs remain reachable. Google may still pick a different canonical if the rest of the site disagrees with the tag.

We treat that ranking of signals as the working order, not as folklore. If the old URL should stop existing for users, a tag in the head is the wrong tool.

## When A 301 Is The Right Move

Use a 301 when the resource has a new permanent address and nobody should keep using the old one. Typical cases:

The slug changed and the old slug should die. The product was merged into another product. HTTP should become HTTPS, or www should collapse to the apex, or trailing slash rules should settle on one form. A section of the site moved from `/blog/post-name/` to a new information architecture. A domain change is intended to last.

In every one of those cases, users who hit the old URL should land on the new one in a single hop. Crawlers should receive a permanent status. Internal links, the XML sitemap, and the canonical on the destination should all name the final URL, not the one that still redirects.

A 308 is the same permanence with a stricter rule about preserving the HTTP method. For ordinary GET page views, 301 is the code most stacks emit and the one operations teams know how to test. We only push for 308 when POST endpoints or form submissions are part of the move and method rewriting would break them.

What a 301 does not do is forgive a bad destination. Redirecting a retired service URL to the homepage because "at least they land somewhere" trains Google that the homepage is a substitute for every dead page. It also trains users that your site cannot keep a promise. Map like-for-like. If there is no equivalent, return 404 or 410 and let the URL leave the index cleanly.

## When A 302 Is The Right Move

A 302 is for a genuine temporary state. The original URL is still the one you want indexed. The destination is a stand-in for a while.

A geolocation interstitial that sends a visitor to a country storefront for this session, while the generic URL remains the indexed one. A short maintenance window that parks a live URL on a holding page you will take down. An A/B test that must not teach Google the variant URL is the new canonical. A seasonal campaign landing page that will give the URL back to the original resource.

If you cannot name the date or the event that returns the original URL to service, it is not temporary. Call it a 301.

302s become expensive when they leak into platform defaults. Some CDNs, load balancers, and WordPress redirect plugins emit 302 unless someone ticks a box. We have seen entire HTTPS cutovers sit on 302 for a year because the first engineer treated "it redirects, so we are done" as the test. The test is the status code plus what Search Console lists as the Google-selected canonical, not whether a browser follows the Location header.

307 is the temporary counterpart of 308: method preserved, still temporary. Same rule. If the URL should come back, 302 or 307. If it should not, stop using them.

## When A Canonical Is The Right Move

Keep both URLs live, and tell Google which copy to index, when the duplicate exists for a reason you cannot (or should not) redirect away.

Filtered or sorted views that users need, while the clean category URL is the one that should rank. Print templates, "open in app" wrappers, and tracking-parameter copies of a page. HTTP parameter variants that the application still serves. A staging-adjacent public URL you cannot kill yet, pointing at the production equivalent. Cross-domain syndication where the original publisher should keep the index listing.

The canonical has to point at an indexable URL that actually contains the same, or very nearly the same, main content. Pointing a thin filter combination at a rich parent category is a hint Google is free to ignore, especially if internal links, hreflang, and the sitemap all name the filter URL instead.

Canonicals also fail quietly when they conflict. Page A canonicalises to B, B canonicalises to A. The tag points at a redirect. The tag points at a noindexed URL. The sitemap submits the non-canonical. Pagination canonicalises every page to page one, which Google has long treated as a way to hide paginated content rather than consolidate it. We fix the cluster of signals, not the one tag that was easiest to edit.

## The Decision In One Pass

Ask two questions in order.

Should a user who requests URL A still see URL A, or should they be sent to URL B?

If they should be sent to B, is that move permanent?

Yes and yes: 301 (or 308). Yes and no: 302 (or 307). No, they should still see A, but A is a duplicate of B: canonical from A to B, self-canonical on B, sitemap lists B, internal links prefer B.

That sequence stops the most common mix-up we see in [technical SEO](/technical-seo-services-philippines/) work: using a canonical because a redirect felt aggressive, then wondering why Google still indexes the duplicate and why users still share the wrong URL.

## Mixed Signals Are Worse Than A Slow Decision

Google does not average your hints. It looks at the whole cluster: status code, canonical, internal links, sitemap, hreflang, redirects, and on-page similarity. When those disagree, the selected canonical is often not the one in the tag.

A 301 to URL B plus a canonical on B that still names URL A is a fight with yourself. A 302 to B plus a sitemap that only lists B is a fight in the other direction. A canonical to B plus lots of internal links to A tells the crawler that A is the important one.

We treat consistency as the implementation standard. After a move, every internal link we control should already name the final URL. Redirects exist for the links we do not control: bookmarks, PDFs, partners, old ads. If the HTML of the site still points at redirected URLs, the crawl wastes hops and the signal stays noisy.

Redirect chains belong in the same bucket. HTTP to HTTPS to www to trailing slash to the real slug is four chances for a 302 to sneak in and four chances for timeout. Collapse to one hop. Search engines can follow chains, but they do not owe you a clean canonical decision at the end of one.

## How We Check The Choice After It Ships

Browser "it redirected" is not the check. Fetch the URL with the redirect not followed and read the status, the Location header, and the body. Then fetch the destination and read its canonical, robots directives, and sitemap membership.

In Search Console, URL Inspection is the page-level truth. The "Google-selected canonical" field is the one that matters. If it does not match the user-declared canonical, the rest of the site is still arguing. The Page Indexing report then tells you whether the old URL is listed as redirect, duplicate, or still indexed.

For a migration we sample, we do not trust a homepage check. We take a set of URLs that had impressions, a set that had backlinks, and a set of templates (product, category, article, location). One template can emit 301 while another still emits 302 because the CMS plugin only wrapped posts.

Log files or crawl diagnostics show whether Googlebot is still requesting the old URLs at volume weeks later. Some of that is expected. Persistent high volume with no decline usually means internal links, sitemaps, or a second redirector are still advertising the old address.

## CMS And Plugin Traps

WordPress redirect plugins default to 302 more often than people remember to check. WooCommerce can serve parameterised copies with self-canonicals that include the parameters. Shopify's canonical behaviour on collections and filtered views is not the same as its behaviour on products. JavaScript apps that "redirect" in the router without an HTTP 3xx leave Google looking at a 200 until it renders, if it renders.

CDN rules stacked on application rules stacked on CMS rules create the chains. The fix is to pick one layer as the source of truth for permanent moves and delete the others, not to add a fourth rule that "makes sure".

Canonical tags generated from the current request URL, including query strings, defeat the point of a canonical. The tag must be built from the preferred URL, not from whatever the user happened to request.

## What We Do Not Claim

A 301 does not "pass 100% of PageRank" as a slogan you can put in a ticket. Google has said ranking signals consolidate through permanent redirects. It has not given you a percentage, a timeline that fits every site, or a guarantee that a poorly mapped redirect will preserve the query the old URL ranked for. If the new page is a different intent, the 301 still moves the user. It does not force the old query onto the new document.

A canonical is not a robots directive. Google can ignore it. If you need the URL out of the index and it should not be crawled, that is a different toolset: noindex on a crawlable URL, or robots.txt when you are trying to save crawl budget rather than clean the index. Do not mix noindex with a robots.txt disallow on the same URL. The crawler cannot read a tag you blocked it from fetching.

## Make The Signal Match The Intent

If the old URL should vanish, redirect it permanently and point every remaining signal at the destination. If the old URL is coming back, redirect it temporarily and keep the original in the sitemap. If both URLs must stay, canonicalise, link, and submit the one you want indexed.

When those three states are mixed across templates, we would rather unwind the rules than add another plugin. [Talk to us](/contact/) with a sample of old and new URLs if you want that cluster checked before the next crawl waste another month on the wrong address.
