#!/usr/bin/env python
"""Regression checks for the Bright Forge lead-generation implementation.

Run after `npm run build`.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"

errors: list[str] = []
checks: list[str] = []


def expect(condition: bool, message: str) -> None:
    if condition:
        checks.append(message)
    else:
        errors.append(message)


def read(path: Path) -> str:
    if not path.exists():
        errors.append(f"Missing required file: {path.relative_to(ROOT)}")
        return ""
    return path.read_text(encoding="utf-8")


def contains_key(value, key: str) -> bool:
    if isinstance(value, dict):
        return key in value or any(contains_key(v, key) for v in value.values())
    if isinstance(value, list):
        return any(contains_key(v, key) for v in value)
    return False


home_html = read(DIST / "index.html")
about_html = read(DIST / "about-us" / "index.html")
contact_html = read(DIST / "contact" / "index.html")
thanks_html = read(DIST / "thanks" / "index.html")
packages_source = read(ROOT / "src" / "components" / "PackagesSection.astro")
tracking_source = read(ROOT / "src" / "components" / "LeadTracking.astro")
netlify_source = read(ROOT / "netlify.toml")
icon_source = read(ROOT / "src" / "styles" / "fontawesome-subset.css")

if not all([home_html, about_html, contact_html, thanks_html]):
    print(json.dumps({"status": "FAIL", "errors": errors}, indent=2))
    sys.exit(1)

home = BeautifulSoup(home_html, "html.parser")
about = BeautifulSoup(about_html, "html.parser")
contact = BeautifulSoup(contact_html, "html.parser")
thanks = BeautifulSoup(thanks_html, "html.parser")

home_text = " ".join(home.stripped_strings)
about_text = " ".join(about.stripped_strings)

for forbidden in [
    "#1 SEO Agency in the Philippines",
    "1000+ Websites Ranked",
    "1,000+ businesses",
    "156% Avg. Traffic Growth",
    "+156% Traffic Growth",
    "98% Client Satisfaction",
    "24/7 Support",
    "round-the-clock",
    "We keep the site focused on SEO agency Philippines",
    "Book a 20-Minute SEO Strategy Call",
]:
    expect(forbidden not in home_text, f"Homepage excludes unsupported or internal claim: {forbidden}")

for required in [
    "British-led SEO, based in the Philippines",
    "Request an SEO Review",
    "SEO Diagnostic & 90-Day Roadmap",
    "Migration & Ranking Recovery Support",
    "AI Search Visibility Assessment",
    "Ongoing SEO Growth Programme",
    "SEO Management Sheet",
]:
    expect(required in home_text, f"Homepage includes required implementation copy: {required}")

expect("paypal" not in packages_source.lower(), "Offer component contains no PayPal checkout")
expect("hours/month" not in packages_source.lower(), "Offer component contains no hour-led package copy")
expect("paypal" not in netlify_source.lower(), "CSP contains no obsolete PayPal dependency")

review_section = home.select_one(".testimonials-section")
review_links = review_section.select("a.tm-card") if review_section else []
expect(len(review_links) == 4, "Homepage testimonial carousel contains four curated reviews")
expect(all("google.com/maps" in (a.get("href") or "") for a in review_links), "Every carousel review links to a Google source")
expect(all((a.get("href") or "") != "#" for a in review_links), "No testimonial uses a placeholder source")

clutch_links = [a for a in home.select(".award-card") if "clutch.co/" in (a.get("href") or "")]
expect(len(clutch_links) == 3, "All three Clutch cards link to evidence")

request_ctas = [a for a in home.find_all("a") if "Request an SEO Review" in a.get_text(" ", strip=True)]
expect(any((a.get("href") or "").rstrip("/") == "/contact" for a in request_ctas), "SEO review CTA routes to the Contact page")

for forbidden in ["Metro London University", "process transformation company", "Search Generative Experience (SGE)", "Jewe O. Manalo"]:
    expect(forbidden not in about_text, f"About page excludes stale credibility copy: {forbidden}")
for required in ["London Metropolitan University", "Founder & CEO", "Head of Team"]:
    expect(required in about_text, f"About page includes corrected credibility copy: {required}")

required_fields = {
    "landing_page",
    "page_path",
    "referrer",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "first_touch_landing_page",
    "first_touch_referrer",
    "first_touch_utm_source",
    "first_touch_utm_medium",
    "first_touch_utm_campaign",
}
for page_name, soup in [("home", home), ("contact", contact)]:
    forms = soup.select('form[data-netlify="true"]')
    expect(bool(forms), f"{page_name} contains at least one Netlify form")
    for form in forms:
        names = {field.get("name") for field in form.find_all(["input", "select", "textarea"])}
        missing = sorted(required_fields - names)
        expect(not missing, f"{page_name} form {form.get('name')} includes all attribution fields")
        expect((form.get("action") or "").rstrip("/") == "/thanks", f"{page_name} form {form.get('name')} uses the verified thank-you route")

for page_name, soup in [("homepage", home), ("contact", contact), ("thanks", thanks)]:
    for phone_link in soup.select('a[href^="tel:"]'):
        href = phone_link.get("href") or ""
        expect(bool(re.fullmatch(r"tel:\+[1-9]\d{7,14}", href)), f"{page_name} phone link is a valid E.164 tel URI")

for event_name in ["lead_form_start", "lead_form_submit", "generate_lead", "phone_click", "email_click"]:
    expect(event_name in tracking_source, f"Lead tracking defines {event_name}")
expect("bf_first_touch_v1" in tracking_source and "bf_pending_lead_v1" in tracking_source and "FIRST_TOUCH_TTL_MS" in tracking_source, "Tracking stores time-limited campaign context and pending lead state")
expect("landing_page: sanitiseUrl(window.location.href)" in tracking_source, "Landing URLs are stripped to origin and path before storage")
expect("referrer: sanitiseUrl(document.referrer)" in tracking_source, "Referrer URLs are stripped to origin and path before storage")
expect("scheduleAttributionRefresh" in tracking_source and "pageshow" in tracking_source and "refreshAttribution" in tracking_source, "Attribution is restored after load, pageshow and production form-runtime resets")
expect("lead_form_start" in home_html and "generate_lead" in thanks_html, "Tracking script is rendered on homepage and thank-you page")

schemas = []
for tag in home.select('script[type="application/ld+json"]'):
    try:
        schemas.append(json.loads(tag.string or tag.get_text()))
    except json.JSONDecodeError as exc:
        errors.append(f"Invalid homepage JSON-LD: {exc}")

top_types = [schema.get("@type") for schema in schemas if isinstance(schema, dict)]
expect(top_types.count("Organization") == 1, "Homepage emits one top-level Organisation schema")
expect(top_types.count("WebSite") == 1, "Homepage emits one WebSite schema")
expect(not any(contains_key(schema, "potentialAction") for schema in schemas), "Homepage emits no broken SearchAction")
expect(not any(contains_key(schema, "aggregateRating") for schema in schemas), "Homepage emits no unverified aggregate rating")

for icon in ["fa-compass", "fa-search", "fa-route", "fa-robot", "fa-chart-line", "fa-check"]:
    expect(icon in icon_source, f"Local Font Awesome subset includes {icon}")

result = {
    "status": "PASS" if not errors else "FAIL",
    "checks_passed": len(checks),
    "errors": errors,
}
print(json.dumps(result, indent=2))
sys.exit(1 if errors else 0)
