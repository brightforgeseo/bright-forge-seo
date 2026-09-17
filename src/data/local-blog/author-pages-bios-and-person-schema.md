---
title: Author Pages, Bios and Person Schema
slug: author-pages-bios-and-person-schema
excerpt: Author pages only help when the bio, the byline and the Person markup describe the same human. No fake credentials. No ghost names on work they did not check.
date: 2026-09-17
author: Ben Lowe
tags: [seo]
image: /images/blog/author-pages-bios-and-person-schema.webp
metaTitle: Author Pages, Bios and Person Schema | Bright Forge
metaDescription: Build author pages search systems can trust. Bios, bylines and Person schema must match the visible page, with real people and no invented credentials.
---

An author page is a verification surface. It exists so a reader, a rater or a search system can ask “who wrote this?” and get a stable answer. If the byline says one name, the bio says another, and the JSON-LD invents a third set of credentials, you have not built E-E-A-T. You have built a contradiction.

We keep public writing attached to named people. Strategy sits with Ben Lowe. Delivery and review sit with the in-house team. The author URL for Ben is public on purpose: [Ben Lowe](/authors/ben-lowe/) is the same person named on the about record, on bylines, and in any Person markup we attach to his work.

## Why Author Pages Exist

Search systems try to understand creators as entities. A stable URL, a consistent name, a photograph and a short work history give them something to attach articles to. Buyers use the same page more simply: is this person real, and have they done the kind of work they are advising on?

A generic “Staff Writer” byline fails both uses. So does a founder name pasted onto twenty posts a week that the founder never saw.

Author pages are not a ranking hack. Google has not published a score for bios. They are part of the same quality picture as identity, contact and first-hand proof. When the topic can affect money, health or safety, a named, checkable creator matters more. Service advice sits in that neighbourhood even when it is not formal YMYL.

## One Human, One URL

Give each writer who publishes on the site a single canonical profile. One slug. One spelling of the name. One primary photograph.

If Jani writes as Jani A. Cañonero, do not also publish Janin Canonero as a separate person. If Ben’s legal name and byline match, keep them matched in schema. Nicknames belong in the bio once, not as a second entity.

Do not create author URLs for brands. Organization is the company. Person is the human. Mixing them so “Bright Forge” authors every post hides the people and wastes the profile.

If a freelancer writes a single guest piece, either give them a real profile or do not use a fake staff identity. A one-off named guest with a short bio is cleaner than a ghost employee.

## What A Bio Has To Contain

A working bio is short and testable.

Name and role.
Where they work.
What they actually do day to day.
Relevant training or education that is true.
Topics they are qualified to write about, by practice not by wish.
A way to see more of their work on the same site.

Ben’s public bio states that he is CEO and co-founder, works from Quezon City, has more than fifteen years across on-page, off-page, technical, local, ecommerce and AI-search work, and holds a marketing degree from London Metropolitan University. That is the ceiling of what we will mark up for him. We will not add certificates we cannot show, awards we cannot link, or job titles at companies he did not work for.

Vague lines like “certified by industry leaders” are a problem. If you cannot name the certificate and the issuer on the page, leave it out. A rater cannot check “industry leaders”. A buyer who asks for the PDF will not like the pause.

Do not write the bio in third-party agency voice on your own site. The profile can say who the person is. The surrounding company copy should still speak as we, not “the provider”.

## Bylines Must Match The Work

The byline is a claim of responsibility. If Ben’s name is on the post, Ben wrote it or reviewed it in a way he will stand behind. If a specialist drafted it and Ben checked the method, say that on the profile or in an editor note. Silent ghosting trains you to treat names as decoration.

We do not publish a generic agency byline on blog posts. A reader should see who is accountable for the advice. That rule lives in our [editorial standards](/editorial-standards/) next to the evidence rules for reporting.

For client sites the same standard applies. If the plumber did not write the post, do not put the plumber’s name on it unless they reviewed the technical claims. A marketing assistant can have their own profile. Honesty about who wrote the copy is better than a borrowed trade licence.

Date the page. Update it when the role changes. A 2019 bio on a 2026 article is a smell.

## Person Schema That Matches The Visible Page

Person markup is a structured copy of what the visitor can already read. If the HTML does not show a job title, an alma mater, a sameAs profile, an email or an image, the JSON-LD should not invent them.

Safe properties when they are visible:

name
url (the author page itself)
image
jobTitle
worksFor (the organisation, with a matching Organization record)
description (the visible short bio, not a secret longer one)
sameAs (only profiles that are clearly the same person)

Unsafe properties when they are not on the page or not true:

alumniOf for a school they did not attend
hasCredential for certificates you cannot produce
award for plaques that do not exist
memberOf for associations that never enrolled them
knowsAbout lists that dump every keyword you want to rank for

Schema is not a keyword field. A knowsAbout array of forty SEO jargon terms does not make someone an expert. It makes the markup look stuffed.

The author page, the Article author block, and the Person node should use the same name and the same URL. If the article schema points at a Person with no page, and the byline links somewhere else, you have split the entity.

Test with the Rich Results tools and by reading the HTML. If a property would surprise the person whose name is on it, delete the property.

## Photographs And Identity Hygiene

Use a current photograph that matches sales calls and conference badges. Do not use a different stock-adjacent headshot on the author page, the about grid and LinkedIn.

File names and alt text should name the person. “Team1.webp” is how identities get lost in a redesign.

If you stop working with someone, unpublish or clearly archive their profile rather than leaving a live URL that implies they still speak for the company. Redirects are fine. Quietly swapping a new employee into the old slug is not.

## Off-Site Profiles Are Optional, Not Costume

sameAs helps when the LinkedIn, company about grid and author page are obviously the same human. It hurts when you attach a dormant Twitter handle, a namesake’s ResearchGate, or a Facebook page for a different Ben.

Only link profiles you control or that clearly belong to that person. Empty social icons are clutter. Fake follower counts are a trust problem.

We would rather publish a complete on-site profile with no social row than a social row that does not resolve.

## What Author Pages Cannot Fix

A detailed bio will not save thin, swapped-noun posts. It will not save invented results. It will not save a site with no contact path.

Author pages also cannot manufacture authoritativeness. Other people citing the work still happens off your domain. The profile just makes it possible to attach that citation to a human.

If the writing is generic, naming someone makes the generic writing easier to blame. That is a feature. Accountability is the point.

## A Build Checklist

Create a unique URL per publishing human.
Write a bio that a stranger can verify.
Use one photograph and one name spelling everywhere.
Bylines only for people who wrote or reviewed the piece.
Person JSON-LD copies visible facts only.
sameAs only for real, matching profiles.
Internal links from articles to the profile, and from the about grid to the same URL.
Review when roles change.

Then read the rendered page next to the markup. If they disagree, the markup is wrong.

## How We Handle This In Practice

Ben’s author page is the canonical Person for his posts. The about grid links to the same slug. The role is CEO and co-founder. The location is Quezon City. Education is listed only because it is true and visible. We do not bolt on credentials to make the schema denser.

Other named staff get the same treatment: a real photograph, a real role, a bio that describes the job they do. We would rather have four honest profiles than a directory of invented seniors.

If you want a second pair of eyes on whether your author markup matches the page, [talk to us](/contact/) with the live URL. The first check is always the same: would this person recognise themselves in the HTML and in the JSON-LD, and would they sign the articles that use their name?
