---
title: Soft 404s in Search Console
slug: soft-404s-in-search-console
excerpt: "A soft 404 is a page that looks empty or missing while the server still returns 200. Search Console lists it because Google will not treat that URL as a real result."
date: 2026-09-17
author: Ben Lowe
tags: [seo]
metaTitle: "Soft 404s in Search Console: What They Mean | Bright Forge"
metaDescription: "Why Google flags soft 404s, how to tell empty templates from real pages, and which status code to return. Send the URL if the report is growing."
---

# Soft 404s in Search Console

A soft 404 is not a broken server. It is a URL that tells a person the page is missing, empty, or useless, while the HTTP status still says success. Google's indexing pipeline then treats the document as an error page even though the response code was 200. Search Console surfaces that judgement in the Page Indexing report so you stop arguing with a green status code.

The report is easy to ignore because the site "loads". That is the problem. Users and crawlers both received a working HTML document. The document just does not contain a page worth indexing. Until the status code and the content agree, Google will keep excluding those URLs, and it will keep spending crawl time to rediscover the same empty shell.

## What Google Means By Soft 404

Google's documentation on HTTP status codes is specific. A 2xx response is considered for indexing. If the content itself suggests an error, an empty page, or a "not found" message, Search Console can still show a soft 404. The examples they list are the ones we see on real sites: a missing server-side include, a broken database connection that still renders the chrome of the template, an empty internal search results page, or a JavaScript file that never loaded so the main content never appeared.

Two different failures get bundled under the same label.

The first is a true missing resource served as 200: deleted products, retired blog posts, mistyped paths, and expired campaign URLs that the CMS answers with a friendly "we could not find that" template and a success code. The custom 404 looks branded. The status is wrong.

The second is a URL that is supposed to be a real page, but the body is too thin, too similar to an error state, or empty after rendering. Category archives with zero products. Faceted views with no matches. Tag pages that only repeat the site header. Client-rendered apps that send an empty app shell to Googlebot. Those URLs were never meant to be error pages. Google still reads them as such.

We do not treat those two failures as the same ticket. One needs a real 404 or 410, or a redirect to a replacement. The other needs enough unique content, or it needs to stop existing as an indexable URL.

## Why The Report Hurts More Than Vanity

Soft 404s waste crawl budget on URLs that cannot rank. Google has said for years that time spent on non-existent, duplicative URLs delays discovery of the URLs you actually care about. On a small brochure site that may not matter. On a catalogue, a publisher archive, or a site with parameterised search, it is how new products stay undiscovered while Googlebot re-fetches thousands of empty search result URLs.

They also confuse reporting. A URL with impressions last quarter that now returns a 200 "not found" template can still look "live" in uptime monitors. Analytics records pageviews of the error template. Search Console, correctly, refuses to treat it as an indexed page. Teams then spend weeks chasing a ranking drop that is actually a status-code bug.

There is a user cost as well. A 200 that displays "page not found" trains people that your URLs are unreliable. Bookmarks and email links keep working in the sense that a document returns. The document is a dead end. A proper 404 can still be useful: a search box, a path back to the relevant category, a short explanation. That usefulness only helps if the status code matches.

## How We Confirm A Soft 404 Before We Touch Templates

Search Console is the queue, not the diagnosis. We export the example URLs from the Page Indexing report and fetch them the way a crawler would: no cached browser state, JavaScript optional on a second pass.

For each URL we record status code, cache headers, canonical, robots meta, word count of the main content, whether the body contains error language, and whether a rendered screenshot still shows a real document. URL Inspection then tells us what Googlebot last saw, which is often an older render than the one on your laptop.

Patterns matter more than single URLs. If every hit is `/search?q=`, the internal search template is the bug. If every hit is a deleted WooCommerce product, the product status mapping is the bug. If every hit is a JavaScript route, the app is serving an empty shell as 200. If the list is random old blog slugs, someone unpublished posts instead of deleting them or redirecting them.

We also compare against [what a proper SEO audit should include](/blog/what-a-proper-seo-audit-should-include/): log-file evidence that Googlebot is still requesting the URLs, sitemap membership that should have been removed, and internal links that still advertise the empty address. Fixing the template without removing those advertisements just recreates the report.

## Choose An Outcome, Then Pick A Status Code

Google's troubleshooting guidance is outcome-led. Decide what should happen for a person who requests the URL, then emit the code that matches.

If the content is gone and there is no close replacement, return 404 or 410. 404 says not found. 410 says gone on purpose. Either one tells the indexing pipeline to drop the URL. 410 can be slightly clearer when you have retired a large set of URLs and you do not want Google to keep checking whether they came back. For most CMS stacks, a correct 404 is the available, sufficient fix.

If the content moved, return a 301 to the URL that now carries the same job: the replacement article, the product that superseded the SKU, the category that absorbed the old collection. Do not 301 everything to the homepage. That turns a missing-page problem into a soft-404-plus-redirect-to-irrelevant-document problem, and it pollutes the homepage's query mix.

If the URL should exist, restore a real page. That may mean republishing, reconnecting the database, shipping the missing include, or rendering the main content in the initial HTML so Googlebot does not have to execute a bundle to discover that the page is empty. A 200 is then honest.

If the URL is an empty search or filter view that users still need, keep it out of the index. Returning 404 for zero-result filter combinations is Google's own advice in the faceted navigation guidance. Serving a 200 "no products found" template with a self-canonical is how those URLs land in the soft 404 bucket.

## Custom 404 Pages Still Need A 404 Status

A branded not-found page is good practice. Google has recommended helpful 404 content for a long time: say the page is missing, offer a way onward, keep the chrome of the site. The same documentation says the server must still return a 404 status so the template is not indexed.

This is the trap in WordPress, Magento, custom PHP, and many CDNs. The application renders `404.php` or a "NotFound" React view, then the origin or the edge answers 200 because the HTML file itself was found. Uptime checks stay green. Search Console fills with soft 404s.

The test is not "does the 404 template exist". The test is `curl -I` or the equivalent: the first response to a nonsense path must be 404 or 410. Then confirm Googlebot sees the same thing in URL Inspection. If your CDN caches 200s aggressively, purge the nonsense path after the origin fix or you will keep serving the old success code.

Do not noindex your way around a missing status code and call it done. A noindex on a 200 error template is a patch. The honest code is still 404. Noindex also requires the URL to be crawlable so the tag can be read. That is extra crawl spend on a URL you want forgotten.

## Thin Pages That Are Not Trying To Be Errors

Google's classifier does not need the words "not found" on the page. An almost empty document, a page that is only header and footer, or a URL whose main content failed to render can be labelled the same way.

We see this on:

Tag and author archives that never had enough posts. Paginated page 12 of a category that now has three products. Headless storefronts that hydrate too late. PDF-to-HTML conversions that produced a title and nothing else. Location pages generated for cities the business does not serve, with two sentences of boilerplate.

Those URLs need a different treatment from deleted products. Either give them a reason to exist (unique copy, real inventory, a genuine local presence) or remove them from the indexable URL space. Returning 200 with a paragraph of filler to "beat" the classifier is how you get a thin-content problem instead of a soft 404 problem. We would rather 404 a fake location page than dress it.

## Do Not Use 404 To Rate Limit Googlebot

A related anti-pattern belongs here because it shows up in the same report. Google has asked site owners not to use 403 or 404 to slow the crawler. Those codes mean the client asked for something that does not exist or is not allowed. They do not mean "we are busy". If Googlebot is too heavy, use Search Console's crawl-rate control, or return 429, 500, or 503. Using 404 as a load-shedder teaches the index that live URLs are missing. Using 200 error templates as a load-shedder teaches the index that live URLs are soft 404s. Both are worse than answering honestly that the server is overloaded.

## A Working Order For A Growing Report

Export the example URLs. Group them by template. Fix the template's status code or content, not one URL at a time unless the set is tiny. Remove the same URLs from sitemaps. Redirect or drop internal links that still point at them. Recrawl a sample, then use URL Inspection to confirm Googlebot received the new status.

Only then request reindexing on representative URLs. The Page Indexing report lags. A clean fetch today will not empty the bucket tomorrow. What you want is a declining example list and log files that show 404 or 301 instead of 200 on the old paths.

[Technical SEO](/technical-seo-services-philippines/) work on this issue is mostly classification: missing versus moved versus empty-but-supposed-to-exist. Once that is decided, the codes are simple. If the report is still growing after a theme change or a catalogue import, [send us a sample of the flagged URLs](/contact/). We will tell you which template is lying about being a page.
