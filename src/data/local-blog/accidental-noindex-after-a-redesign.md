---
title: Accidental noindex After a Redesign
slug: accidental-noindex-after-a-redesign
excerpt: Redesigns still ship with staging noindex, theme defaults, and X-Robots-Tag leftovers. How to find the accidental noindex and get money pages crawlable again.
date: 2026-09-17
author: Ben Lowe
tags: [seo]
image: /images/blog/accidental-noindex-after-a-redesign.webp
metaTitle: Accidental noindex After a Redesign
metaDescription: Find accidental noindex after a redesign: staging flags, X-Robots-Tag, plugin defaults, and the Search Console checks that prove money pages can return.
---

The most common ranking outage we see after a redesign is not a mysterious algorithm. It is a noindex that someone left on. Staging sites need noindex. Production sites that still carry the staging robots meta, the HTTP X-Robots-Tag, or a CMS "discourage search engines" tick do not. Google then does what you asked: it drops or refuses the pages. Traffic falls. The new theme gets the blame.

We treat this as a go-live defect, not as a content problem. If Search Console says Excluded by noindex on URLs that used to earn, stop writing blog consolation and fetch the live HTML and response headers. The instruction is either in the page, in the header, in a plugin default, or in a CDN rule that the new host inherited.

## How noindex Actually Works

Google has to crawl a URL to see a noindex. A meta robots tag in the HTML, or an X-Robots-Tag in the HTTP response, can tell crawlers not to index. If robots.txt Disallow blocks the crawl, Google may never see the noindex, and you get a different, messier state: a URL known from links, not recrawled, not cleanly removed. Redesigns often ship both mistakes at once: staging Disallow plus a theme that prints noindex.

noindex is not nofollow, and it is not Disallow. Teams use the words as if they were one switch. They are not. noindex is an indexing instruction. nofollow on a page or link is a hint about following links. Disallow is crawl permission. A redesign checklist that only says "check robots.txt" will miss a sitewide noindex in the head.

Password protection also keeps Google out, which is correct for true staging. The failure is when basic auth comes off, the visual site looks live, and the noindex does not come off with it. That is the accidental case.

## Where The Instruction Hides After A Theme Change

In WordPress, Settings, Reading, "Search engine visibility" still catches people. Yoast, Rank Math, and similar plugins have environment flags, and some hosts inject a noindex on non-production URLs that then get mapped to production. Shopify themes and apps have been known to leave noindex on alternate templates. Headless stacks often put robots in the framework config: next.config headers, Nuxt, or a CDN worker that was copied from staging.

X-Robots-Tag is the one developers forget because it does not show in "view source" the way people expect if they only look at the body, and some only look at the meta. Fetch the headers. A CDN rule that says noindex, nofollow on all HTML is enough to unpublish a site. We have seen it on "security" boilerplates.

Pagination, filtered collections, and parameter pages may have been noindexed on purpose. After a redesign, that rule sometimes lands on the main collection template because the new theme reused the same header partial. Check the money templates as HTML, not as a screenshot of the homepage in an incognito window. Homepages sometimes stay indexable while category templates do not.

Canonicals can look like noindex in the reporting. A new template that canonicalises every child to a thin parent will make the children drop. That is not noindex, but Search Console users mix the two. Inspect the live tag. If rel canonical points at another URL, you have an information-architecture bug. If robots says noindex, you have an indexing bug. Fix the one you have.

## The Redesign Path That Creates The Bug

Typical sequence. Agency builds on staging.example.com with noindex and often Disallow. Client approves the look. Developers copy the database and the theme to the live host. They remember DNS. They forget the robots meta in the theme header, the plugin environment, the HTTP headers on the new CDN, and the XML sitemap still listing staging URLs. Google recrawls, sees noindex, and starts dropping.

A second sequence: the old site had noindex on thank-you pages only. The new CMS applies a default robots value of noindex to all new templates until an SEO field is filled. Nobody fills it because the fields are empty on purpose in the design system. Every new URL is born excluded.

A third sequence: a reverse proxy adds X-Robots-Tag: noindex for any request with a staging cookie or a preview header. After launch, a preview cookie still sits on the edge for Googlebot, or the rule is written as "if not production hostname" and the production hostname in the config is wrong by one character.

None of these require malice. They require a checklist that treats indexing as a release criterion.

## How To Prove It In A Morning

Pick ten URLs that earned in the last 28 days of Search Console before the drop: homepage, two money services or collections, two products or location pages, a blog post that was stable, and a URL you expect to stay noindex (cart, search, thank you). For each, fetch:

The HTTP status. The X-Robots-Tag header if any. The meta robots and googlebot tags in the HTML. The canonical. Whether the URL is in the live XML sitemap. What URL inspection in Search Console says Google last saw.

If money URLs say noindex in the live response, that is the incident. Remove it at the source (theme, plugin, header rule), do not paper over it with a second plugin. If Search Console still says noindex after the live HTML is clean, you are waiting on recrawl, or you are looking at a cached inspection. Request indexing on the money set. Do not request indexing on 50,000 SKUs as a panic move.

If live HTML is indexable and Search Console says blocked by robots.txt, go to the robots file, not the meta. If live HTML is indexable and coverage says crawled but not indexed, you may not have a noindex incident at all. You may have a quality, duplication, or discovery incident. Mixing those diagnoses wastes the week.

Our [website migration services](/website-migration-services/) treat this inspection as part of cutover, not as an optional SEO extra. A redesign is a migration even when the domain does not change. Templates, headers, and sitemaps changed. Google has to re-learn the site.

## What Recrawl Looks Like When You Have Removed The Tag

Removing noindex does not restore yesterday's rankings at the same hour. Google needs to recrawl, drop the noindex from its understanding of the URL, and then consider the page for the index on merit. Large sites recrawl unevenly. Money URLs with internal links and sitemap inclusion come back faster than orphans.

Keep the old URLs alive if they still exist. A redesign that noindexed the old path and 404'd it, then created a new path without redirects, has three defects. Fix redirects first so equity and users land on the indexable new URL. Then make sure the new URL is indexable. Then give Search Console the sitemap of the new money set.

Do not add a flood of new blog posts to "recover". If the templates are noindexed, the blogs may be too. If the templates are fine, the blogs still do not replace a category that used to convert.

Watch the page indexing chart, not only branded rank. "Excluded by noindex" should fall. "Indexed" should rise on the templates you care about. If excluded stays flat after two crawl cycles and live HTML is clean, look for a second noindex source: HTTP header versus meta, or a different hostname (www versus non-www) than the one you fixed.

## Plugin And Header Conflicts

Two plugins both writing robots tags can produce opposite instructions. Browsers show one head. Crawlers see the HTML they get. A security plugin that adds noindex on "failed bot checks" can noindex Googlebot if the WAF misclassifies it. That looks like an SEO incident and is a firewall incident.

Some CDNs cache the noindex response. You fix the origin and the edge still serves the old header to Googlebot. Purge HTML caches, not only image caches. Set cache rules so robots headers on HTML are short-lived during cutover.

hreflang clusters can spread the mistake. If the US page is indexable and the UK page is noindex, you have a regional config bug. If all locales inherit one layout that says noindex, you have a single partial to fix. Inspect one URL per locale.

## A Cutover Checklist That Includes Indexing

Before DNS or theme swap: staging remains noindex. Production currently indexable. You have a crawl of the current live money URLs.

At swap: production robots.txt allows the money paths and the assets needed to render. Production HTML on money templates has no noindex. Production headers have no X-Robots-Tag noindex on those templates. Canonicals point at the public production URLs. XML sitemap lists those URLs on the production host. Redirects from old money paths return 301 to the new indexable URLs.

After swap, same day: fetch the ten URL sample from an external network. Run URL inspection on them. Confirm homepage and two money URLs in an incognito search using `site:` only as a crude check, knowing it is not a ranking report.

After swap, week one: page indexing report daily. Logs or CDN metrics for Googlebot 200s on the money paths. A named owner for any new noindex that appears.

This is also where [technical SEO](/technical-seo-services-philippines/) and migration work overlap. Titles and content cannot recover a page Google is instructed to exclude.

## How We Handle It When The Drop Already Happened

We take the date of the deploy, the Search Console coverage split, and a header/html sample of the money URLs. If noindex is live, we remove it and document the source so it cannot be redeployed from the same config. If noindex is already gone, we look at remaining blockers: robots, canonicals, 404s, soft 404s, and internal links that still point at the old excluded URL.

We do not promise the previous rank positions as a date. We can promise that we will not leave the instruction that caused the exclusion in place, and that we will keep the money URLs crawlable, indexable, and in the sitemap while Google recrawls.

If you launched in the last fortnight and organic fell off a cliff, do not wait for a monthly report. [Send the live URLs and the deploy date](/contact/). Include Search Console access if you can. The first question is whether you asked Google not to index the new site. It is a yes or no you can answer with a fetch, and it should be answered before anyone debates content quality.
