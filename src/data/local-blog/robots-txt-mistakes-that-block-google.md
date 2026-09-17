---
title: robots.txt Mistakes That Block Google
slug: robots-txt-mistakes-that-block-google
excerpt: The robots.txt mistakes that hide money pages from Googlebot, including sitewide Disallow leftovers, blocked CSS, and using crawl rules as a substitute for noindex.
date: 2026-09-17
author: Ben Lowe
tags: [seo]
image: /images/blog/robots-txt-mistakes-that-block-google.webp
metaTitle: robots.txt Mistakes That Block Google
metaDescription: Fix robots.txt mistakes that block Googlebot: leftover Disallow, blocked CSS and JS, wildcards, and using crawl rules when you needed noindex.
---

# robots.txt Mistakes That Block Google

robots.txt looks like a small text file, so teams treat it like a comment. Googlebot treats it as the first permission check on the host. A leftover Disallow from staging, a wildcard that matches more than you think, or a rule that blocks the CSS Google needs to render the page will do more damage than a missing meta description. We still find these on otherwise expensive rebuilds.

Google Search Central is blunt about what the file is for. It tells crawlers which URLs they may access. It is mainly a way to manage crawl traffic. It is not the mechanism for keeping a page out of Google Search. If you want a URL out of results, you need noindex (and Google has to be allowed to crawl the page to see it), or you need to password-protect or remove the page. Mixing those jobs up is the most expensive robots.txt mistake we see.

## The File Has To Be In The Right Place And Readable

The robots.txt file lives at the host root: https://www.example.com/robots.txt for that host. It does not live in a subdirectory, a CMS folder, or a language folder. A file at /blog/robots.txt does not govern the site. A file that returns 404 means Google sees no crawl rules, which is usually safer than a 200 with Disallow: /. A file that returns 5xx can cause Google to be cautious about crawling. A file that returns HTML because a CDN parked a soft 404 is not a robots file.

Each host is separate. www and non-www, http and https, and staging hosts each have their own robots.txt. Teams copy production to staging, block staging, then push the blocked file to production. Or they unblock production and leave www blocked while canonicals point at www. Check the URL Google actually crawls, not the URL you like.

Comments start with #. That is useful. It is also how a missing newline turns a comment into a broken rule, or a rule into a comment. Keep groups simple: a user-agent line, then allow and disallow lines, then sitemap lines that are absolute URLs. Google documents that it supports user-agent, allow, disallow, and sitemap. It does not treat crawl-delay as a supported instruction. If you need to manage load, do it in the server and in what you link, not with a folklore directive.

## Sitewide Disallow Left On Production

The classic incident is:

User-agent: *
Disallow: /

That group tells crawlers matching * not to crawl the site. Google's own examples use it when you intend to disallow crawling of the entire site, and they note that URLs can still appear in results without a snippet if they are known from other places. For a shop or a lead-gen site, this is an outage. It usually arrives via a staging clone, a security plugin that "locks" the site, or a well-meaning developer who wanted to hide a pre-launch theme.

The recovery is not mysterious. Put the intended production rules live. Request recrawl of money URLs in Search Console. Watch the page indexing report for "Blocked by robots.txt". Rankings do not always snap back the same day, because crawl and recrawl take time, and because the file itself may be cached. The operational fix is a go-live check that fetches /robots.txt on the public host from outside the office network.

Empty Disallow (a user-agent group that disallows nothing) is equivalent to allowing crawl. No robots.txt at all also allows crawl by default. You do not need an Allow: / line to "turn SEO on". You need to avoid a Disallow you did not mean.

## Blocking CSS, JavaScript, And Assets Google Uses To Render

Older advice said to Disallow /wp-includes/ or /static/ to "save crawl budget". Google Search Central's robots introduction says that if blocking resources makes the page harder to understand, do not block them. Rendering a modern page without CSS and JS can make Google see a mobile disaster, hidden navigation, or empty shells.

We still see Disallow rules on /cdn/, /assets/, /_next/, /static/, and query strings that carry the built JS. The page HTML is allowed. The layout is not. Search Console's URL inspection and the rendered screenshot are how you prove it. If the rendered page does not look like the page a user gets, you have a crawl-of-assets problem until proven otherwise.

Allow rules exist to punch holes in a wider Disallow. WordPress often needs admin blocked but admin-ajax allowed. That pattern is specific. Copying it onto a headless stack without checking paths will block the wrong things or allow the wrong things. List the paths your HTML actually references.

## Using robots.txt When You Meant noindex

This is the conceptual error. You have thin search-result pages, cart URLs, thank-you pages, or internal search. You do not want them in Google. Someone adds Disallow: /search and Disallow: /cart.

Google may stop crawling those URLs. It may still list a URL it already knows, with little or no snippet. It will not see a noindex tag on a URL it is not allowed to crawl. Google's robots refresher on page-level controls makes the split explicit: robots.txt is for crawling; meta robots and X-Robots-Tag are for indexing and snippet behaviour, and those page-level rules only work if the crawler is allowed to request the URL.

The usual pattern we recommend: allow Googlebot to crawl the thin URL if you need it gone from the index, put noindex on it (meta or header), and keep it out of sitemaps and internal links. Use robots.txt Disallow for infinite spaces that waste crawl and do not need to be indexed because they should not be discovered in volume: faceted hell, infinite calendars, staging parameters you cannot noindex fast enough. Those are crawl-management problems. Money pages never belong on that list.

If you both Disallow and noindex, you have asked Google not to read the noindex. That combination is how "Excluded by noindex" never appears and "Blocked by robots.txt" sits for months while the URL still shows up as a naked link.

## Wildcards, Trailing Slashes, And Rules That Match Too Much

Google supports * and $ in ways teams forget. Disallow: /*.pdf$ is a file-type rule. Disallow: /*? is a blunt instrument that can catch every URL with a query string, including pagination, tracking, and sometimes the only URL a CMS can serve. Disallow: /en catches /enquiry and /energy if you are sloppy about path prefixes. Disallow: /http and Disallow: /https do nothing useful unless those path segments exist on the site; they do not block the protocol.

Directory rules should end with a slash when you mean the directory and everything under it. A missing slash can fail to match what you intended, or match a prefix you did not intend, depending on the path. Test with Google's robots testing ideas and, more importantly, with a crawl of the live file plus a list of money URLs. Do not test only on staging if CDN rules differ.

User-agent groups are matched by longest bot name, not by stacking every mythic bot you found on a forum. A group for Googlebot and a group for * are different. AdsBot is not covered by * in Google's documentation the way other crawlers are; if you must address ads crawlers, name them. Copy-pasting a 200-line "block AI bots" file onto a marketing site has started to block more than the author could explain. If you block a crawler, know which one and why.

## Sitemap Lines That Point At The Wrong World

Sitemap: lines in robots.txt must be absolute URLs. Google does not guess www versus non-www or http versus https. Pointing sitemap at http://staging.example.com/sitemap.xml on a production robots file is a gift to confusion. Pointing at a sitemap that lists URLs you also Disallow is a mixed instruction: you invited crawl of URLs you forbade.

Sitemaps are a hint about what you want crawled. robots.txt is a constraint on what may be crawled. They should agree. After a migration, update both, on the host Google uses.

## Security Theatre

robots.txt is public. Disallow: /private-folder/ advertises the folder. It does not lock it. Google Search Central says if you want something off the public web, password-protect it or do not put it on the server. We still find /backup.zip, /wp-admin/ with no rate limit, and /dev/ named in robots as if that were access control. Treat those as security tickets, not SEO tickets.

Different robots.txt by user-agent at the CDN, or blocking Googlebot by IP because a WAF panicked, can look like a robots problem in Search Console when the file itself is clean. If the file allows a URL and fetch as Google fails, look at the firewall, geo rules, and bot challenges. Our [technical SEO work](/technical-seo-services-philippines/) treats robots, headers, and WAF as one crawl path, because Googlebot only cares that the request failed.

## A Go-Live Check That Would Have Caught Most Incidents

Before a production deploy, fetch the public /robots.txt. Confirm there is no Disallow: / for *. Confirm money URL paths are not matched by a wildcard. Confirm CSS and JS paths used in the HTML are allowed. Confirm sitemap lines are production URLs. Confirm staging hosts remain blocked and production is not using the staging file. Then inspect three money URLs in Search Console.

After deploy, watch "Blocked by robots.txt" and "Crawled - currently not indexed" as different buckets. They are not the same bug. One is permission. The other is quality or discovery.

If you are in a redesign or host move, put this file on the same checklist as redirects and canonicals. Our [website migration SEO checklist](/blog/website-migration-seo-checklist/) is the companion for that sequence. robots.txt is the first fetch. It should not be the last thing anyone opens.

## What We Do When A Site Is Already Dark

We take the live robots.txt, the previous version from git or hosting history if it exists, and the Search Console coverage numbers. We restore crawl permission for the templates that earn. We do not "open everything" if the catalog has infinite facets; we open what should rank and keep crawl waste fenced. We submit sitemaps that match. We inspect the money URLs rather than waiting for a blog post to age.

Then we add a monitor: a scheduled fetch of /robots.txt and a diff against the last known good file. Most disasters are a one-line change from a plugin or a clone. A weekly ranking report will see it late. A file diff sees it the day it ships.

If you suspect Googlebot is being polite because you asked it not to come in, [send the live robots.txt URL and the money pages](/contact/). We can tell you whether the file is the block, whether noindex is the block, or whether the crawler never reaches the host at all.
