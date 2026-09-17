---
title: Technical SEO Checklist Philippines
slug: technical-seo-checklist-philippines
excerpt: A practical technical SEO checklist for Philippine sites: crawl access, indexation, templates, speed, and Search Console. Use it to find blockers before you publish more pages.
date: 2026-09-17
author: Ben Lowe
tags: [seo]
image: /images/blog/technical-seo-checklist-philippines.webp
metaTitle: Technical SEO Checklist Philippines | Bright Forge
metaDescription: Technical SEO checklist for Philippine sites covering crawl, indexation, templates, speed and Search Console. Find blockers before you publish more pages.
---

Technical SEO is the unglamorous half of visibility: whether Google can fetch, render, and index the URLs that make money, without wasting crawl on junk. A Philippine site can have strong services and still stall because a plugin set noindex, a sitemap lists parameter copies, or a redesign dropped the 301s. This checklist is the order we use before anyone argues about content volume.

It is not a score from a browser extension. Those tools are useful as a prompt. They are not a substitute for Search Console, a crawl of the live host, and a look at the templates that generate thousands of URLs. Google’s [Search Essentials](https://developers.google.com/search/docs/essentials) remain the official baseline for what we check. The rest is how those rules show up on WordPress, Shopify, and custom stacks we see locally.

Use the list to find blockers. Then fix them on the template, not on one heroic page.

## 1. Confirm The Host Google Should Index

Pick one canonical host and make every other version surrender. http versus https. www versus non-www. Trailing slash policy. A staging subdomain that was never noindexed. A developer URL on a plugin server that leaked.

Check the address bar, the sitemap, internal links, and Search Console property. If they disagree, Google will split signals or index the wrong copy. Philippine launches often leave the non-www HTTP version alive because the certificate was added later and nobody redirected the old links from Facebook.

HSTS is useful once HTTPS is stable. Mixed content (HTTP images or scripts on an HTTPS page) is still common with old sliders and copied widgets. Mixed content is a trust problem in the browser and a rendering problem for Googlebot.

If you moved domain, the old host should 301 to the equivalent new URL, not to the homepage, and the move should be logged. Homepage-only redirects after a rebrand are how service pages fall out of the index.

## 2. Robots, Noindex, And Accidental Disappearance

Open robots.txt and read it like a hostile document. Disallow that blocks /wp-admin is fine. Disallow that blocks /wp-content/uploads, entire /blog, or the cart and account in a way that also hits category templates is not. A leftover Disallow: / from staging is a classic outage.

Then check the live HTML for noindex on templates that should rank: services, categories, locations, products. SEO plugins make it easy to tick “noindex archives” and accidentally noindex the blog index you wanted, or to copy a production database onto staging and then clone it back with noindex still on.

Password walls, IP allowlists, and firewall rules that challenge Googlebot will look like a healthy site to the owner and an empty site to search. If Search Console shows crawl anomalies after a security plugin change, treat that as technical SEO, not as “Google being random”.

Soft 404s belong on this list. Pages that return 200 with “no results” or empty builder shells waste crawl and confuse indexing. Return 404 or 410 for gone URLs. Do not leave a friendly empty template that says success.

## 3. Sitemaps That Tell The Truth

A sitemap should list indexable canonical URLs you want crawled, in their final https form, with lastmod you can defend. It should not list redirects, 404s, noindexed URLs, parameter copies, thank-you pages, or faceted combinations.

WordPress XML sitemaps often include author archives, tag archives, and attachment pages nobody asked for. Ecommerce sitemaps often include out-of-stock templates or search-result URLs. Split sitemaps if the file is huge, and submit the index in Search Console.

If lastmod is stamped “now” on every URL every night, you have taught Google to ignore the date. If lastmod never moves after a real content change, you have wasted a hint.

Check that important URLs appear in the sitemap and that junk URLs do not. Then check that internal links also point at the same canonical versions. A sitemap is a hint. Internal links are stronger.

## 4. Canonicals, Duplicates, And Parameters

Every indexable page should have one self-referencing canonical that matches the URL you want in results. Canonicals that point at the homepage, at HTTP, or at a paginated view you did not mean to promote will collapse the wrong URLs.

Duplicates on Philippine catalogue sites usually come from sort parameters, session IDs, print views, UTM copies that got indexed, and HTTP plus HTTPS. Faceted navigation (colour, size, price, brand stacked) can create thousands of near-duplicate listings. Index the facet pages that have demand and unique content. Noindex or nofollow-plus-robots the rest. Do not leave both strategies half-applied.

hreflang only if you truly have language or country versions. A Google Translate plugin that creates /en/ and /tl/ copies of the same thin page is a duplicate machine. If you use hreflang, the return tags must be reciprocal and the URLs must be live.

Pagination should be crawlable. Infinite scroll that never exposes a page 2 URL hides products. Rel next/prev is no longer a ranking lever. Clear paginated URLs still matter for discovery.

## 5. Status Codes, Redirects, And Migrations

Crawl the live site and list 4xx and 5xx on URLs that still have internal links or sitemap membership. Fix the destination or remove the advertisement.

Redirects should be 301 when the move is permanent, 302 only when it is temporary. Chains (A to B to C) waste crawl and dilute the signal. Loops are an outage. JavaScript-only “redirects” are not redirects.

After a redesign, map old service URLs to the new equivalents before launch. Philippine SMEs often change permalinks from /?p=123 to pretty slugs, or from a page builder to a new theme, without a map. Search Console will show the drop. The checklist item is the map, not a content blast to “recover”.

WWW, trailing slash, and uppercase path rules should be enforced in one place, usually the server, not with three plugins fighting.

## 6. Rendering, Speed, And Mobile Templates

Googlebot renders JavaScript, with limits. If the primary content of a service page only appears after a client-side fetch, check the rendered HTML, not only the view-source. Page builders that hydrate everything late are a risk.

Speed is a template problem. Hero sliders, unoptimised banners, live chat that loads before content, font CDNs, and image carousels on mobile are the usual offenders. Fix the template that every URL inherits. Do not compress one blog image and call Core Web Vitals done.

Images need dimensions, modern formats where the stack allows, and lazy loading below the fold without lazy loading the LCP image. Favicons that are several megabytes still appear. So do stock videos autoplaying in the hero.

Mobile is not a separate site for most stacks, but it is a separate failure mode. Tap targets under sticky headers, forms that fail on Android, click-to-call numbers that are images, and popups that cover the first screen all belong on a technical checklist because they stop the visit from becoming an enquiry.

## 7. Structured Data That Matches The Visible Page

Schema is not a ranking cheat. It is a machine-readable restatement of what the page already shows. Organisation and WebSite on the homepage. LocalBusiness only with the real address and hours. Product and Offer only with visible price and availability. FAQ only when the questions are on the page. Article on articles.

Do not mark up reviews that are not on the URL. Do not put a second organisation with a different city on every landing page. Do not copy a competitor’s JSON-LD. Invalid or misleading markup can be ignored or, in worse cases, become a manual issue.

Test a sample of templates, not one URL. Category, product, service, location, and blog often ship with three conflicting plugins. One clean graph per template is the goal.

## 8. Search Console As The Source Of Truth

Connect the exact host. Submit the sitemap. Read Pages, not only Performance. Coverage reasons (excluded by noindex, crawled currently not indexed, duplicate, soft 404, blocked by robots) are the checklist scoring system.

Performance should be filtered to commercial URLs and queries, not celebrated as a sitewide click total. Enhancement reports for HTTPS, mobile usability, and structured data tell you when a template broke.

If you have no Search Console, that is item zero. Public crawls cannot show what Google chose not to index. [What a proper SEO audit should include](/blog/what-a-proper-seo-audit-should-include/) starts here for a reason: without this property, technical claims are guesses.

Log files, when you can get them from hosting, show whether Googlebot actually hits the money URLs. Shared hosting in the Philippines does not always make logs easy. When they exist, use them. When they do not, Search Console crawl stats are the fallback.

## 9. CMS And Hosting Patterns We See Locally

WordPress: conflict between Yoast, Rank Math, and a theme SEO panel duplicating titles and canonicals. Attachment pages indexed. Author archives for every editor. Tag pages that reprint the same posts. xmlrpc and user enumeration are security items that sometimes get “fixed” in ways that break crawl.

WooCommerce: faceted filters, out-of-stock products returning 200 with empty content, duplicate product descriptions from suppliers, and cart or account URLs leaking into sitemaps.

Custom page builders: different title fields in the builder versus the SEO plugin, so the H1 on screen is not the title in the SERP.

Hosting: expired certificates, HTTP still live, WAF challenging Googlebot, PHP timeouts on heavy category pages, and CDN caching an old noindex header after you removed it. Purge cache after technical changes. Then fetch as Google, not only as yourself.

## 10. A Weekly Pass Once The Fire Is Out

After the initial clearance, technical SEO is maintenance. New plugin, new theme update, new campaign landing page, new filter, new locale. Each can reintroduce noindex, duplicates, or a sitemap lie.

Once a week, or after every deploy: spot-check robots, homepage and one service URL for noindex and canonical, Search Console coverage delta, and the enquiry form on mobile. Once a month: recrawl, sitemap sanity, speed on the two templates that earn money, schema sample.

[Technical SEO services in the Philippines](/technical-seo-services-philippines/) exist for teams that cannot keep that loop in house, or for sites where the template mess is larger than a weekly pass. The checklist still belongs to you. If a vendor cannot show which items failed on your host, they are selling a scan PDF.

If you want this run against the live site, send the URL, CMS, and Search Console access if you have it. [Contact us](/contact/) with any recent redesign or plugin change. We will name the blockers in deployable language, not as a traffic forecast. Technical work is clearance. Rankings are a later conversation.
