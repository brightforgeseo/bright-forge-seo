"""Spelling by market, checked on the built site.

House rule (owner decision, November 2026): the site's default is American English, because the agency
is in the Philippines, where American spelling is standard. The UK, Australia and New Zealand country
pages are written in British-style spelling, including their meta text and FAQs.

check_dist() scans the visible text of every built page (body text, alt/title/aria-label text, meta
title and description, and JSON-LD strings):
  * general pages must contain none of the British forms below;
  * the three country pages must contain none of the American forms below.

Allowed, and not reported:
  * blog article bodies (they live partly in Contentful and keep their own spelling), and article titles
    and excerpts where listing pages repeat them;
  * the brand's own product and service names: "SEO Command Centre" and "AI Search Optimization";
  * URLs and slugs;
  * the Australia page's spelling example "(optimisation, not optimization)".
Quoted client reviews currently contain no forms from these lists; if one ever does, quote it verbatim
and add the exact quotation to ALLOWED_PHRASES rather than editing the reviewer's words.
"""

from __future__ import annotations

import json
import re
from html.parser import HTMLParser
from pathlib import Path

BRITISH_PAGES = {"/seo-services-uk/", "/seo-services-australia/", "/seo-services-new-zealand/"}

# -ise/-yse stems whose -ize form is the American spelling. Words that are -ise in both varieties
# (advertise, advise, expertise, enterprise, exercise, revise, supervise, surprise, premise ...) are absent.
_IZE_STEMS = """
optimis organis reorganis specialis prioritis deprioritis recognis realis summaris personalis localis anonymis
authoris penalis itemis categoris customis standardis utilis visualis minimis maximis centralis finalis apologis
capitalis characteris criticis familiaris harmonis internationalis legitimis memoris mobilis modernis normalis
publicis rationalis sanitis scrutinis stabilis synchronis systematis monetis digitis incentivis operationalis
contextualis canonicalis tokenis randomis serialis initialis globalis generalis cannibalis commercialis
industrialis energis sympathis jeopardis strategis theoris trivialis neutralis socialis humanis idealis
legalis liberalis marginalis materialis mechanis monopolis naturalis parameteris privatis professionalis
regularis signalis symbolis
""".split()
_IZE_SUFFIXES = ["e", "es", "ed", "ing", "ation", "ations", "er", "ers", "able"]

_WORDS = {
    "analyse": "analyze", "analysed": "analyzed", "analysing": "analyzing", "paralyse": "paralyze",
    "behaviour": "behavior", "behaviours": "behaviors", "behavioural": "behavioral",
    "colour": "color", "colours": "colors", "coloured": "colored",
    "favour": "favor", "favours": "favors", "favoured": "favored", "favourable": "favorable", "favourite": "favorite",
    "honour": "honor", "labour": "labor", "neighbour": "neighbor", "neighbours": "neighbors",
    "neighbourhood": "neighborhood", "neighbourhoods": "neighborhoods", "neighbouring": "neighboring",
    "flavour": "flavor", "humour": "humor", "endeavour": "endeavor",
    "centre": "center", "centres": "centers", "centred": "centered", "theatre": "theater", "metre": "meter",
    "metres": "meters", "litre": "liter", "fibre": "fiber", "calibre": "caliber",
    "catalogue": "catalog", "catalogues": "catalogs", "catalogued": "cataloged",
    "programme": "program", "programmes": "programs",
    "licence": "license", "licences": "licenses", "defence": "defense", "offence": "offense",
    "practise": "practice", "practised": "practiced", "practising": "practicing",
    "fulfil": "fulfill", "fulfils": "fulfills", "fulfilment": "fulfillment", "enrolment": "enrollment",
    "instalment": "installment", "skilful": "skillful",
    "labelled": "labeled", "labelling": "labeling", "modelled": "modeled", "modelling": "modeling",
    "travelled": "traveled", "travelling": "traveling", "cancelled": "canceled", "cancelling": "canceling",
    "signalled": "signaled", "counselling": "counseling", "jewellery": "jewelry",
    "judgement": "judgment", "judgements": "judgments", "acknowledgement": "acknowledgment", "ageing": "aging",
    "sceptical": "skeptical", "grey": "gray",
    "enquire": "inquire", "enquires": "inquires", "enquired": "inquired", "enquiring": "inquiring",
    "enquiry": "inquiry", "enquiries": "inquiries",
    "aluminium": "aluminum", "artefact": "artifact", "artefacts": "artifacts", "focussed": "focused",
}

BRITISH_TO_AMERICAN: dict[str, str] = dict(_WORDS)
for _stem in _IZE_STEMS:
    for _suffix in _IZE_SUFFIXES:
        BRITISH_TO_AMERICAN[_stem + _suffix] = _stem[:-1] + "z" + _suffix

# American forms checked on the British-spelled pages. Words whose American form is also correct British
# usage in some sense (license as a verb, program for software, practice as a noun, story, aging ...) are not
# checked automatically; review them by hand.
_NOT_CHECKED_ON_BRITISH_PAGES = {
    "license", "licenses", "program", "programs", "practice", "practiced", "focused", "aging", "meter", "meters",
}
AMERICAN_TO_BRITISH: dict[str, str] = {
    a: b for b, a in BRITISH_TO_AMERICAN.items() if a not in _NOT_CHECKED_ON_BRITISH_PAGES
}

ALLOWED_PHRASES = [
    re.compile(r"(?i)(?:SEO )?command centre"),       # product name: SEO Command Centre (/seo-command-centre/)
    re.compile(r"AI Search Optimization"),           # service name, kept on every page
    re.compile(r"\(optimisation, not optimization\)"),  # spelling example on the Australia page
    re.compile(r"https?://\S+|(?<![\w])/[a-z0-9][a-z0-9\-/]*/"),  # URLs and slugs
]


def _pattern(words) -> re.Pattern[str]:
    ordered = sorted(words, key=len, reverse=True)
    return re.compile(r"(?<![A-Za-z0-9])(" + "|".join(map(re.escape, ordered)) + r")(?![A-Za-z0-9])", re.I)


BRITISH_RE = _pattern(BRITISH_TO_AMERICAN)
AMERICAN_RE = _pattern(AMERICAN_TO_BRITISH)


class _VisibleText(HTMLParser):
    SKIP = {"script", "style", "noscript", "template", "svg"}

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts: list[str] = []
        self.skip = 0
        self.in_ld = False
        self.in_title = False
        self.ld: list[str] = []
        self.h1: list[str] = []
        self.in_h1 = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "script" and a.get("type") == "application/ld+json":
            self.in_ld = True
        if tag in self.SKIP:
            self.skip += 1
        if tag == "title":
            self.in_title = True
        if tag == "h1":
            self.in_h1 += 1
        if tag == "meta" and (a.get("name") in {"description", "twitter:title", "twitter:description"}
                              or a.get("property") in {"og:title", "og:description", "og:image:alt"}):
            self.parts.append(a.get("content") or "")
        for key in ("alt", "title", "aria-label", "placeholder"):
            if a.get(key):
                self.parts.append(a[key])

    def handle_endtag(self, tag):
        if tag in self.SKIP and self.skip:
            self.skip -= 1
        if tag == "script":
            self.in_ld = False
        if tag == "title":
            self.in_title = False
        if tag == "h1" and self.in_h1:
            self.in_h1 -= 1

    def handle_data(self, data):
        if self.in_ld:
            self.ld.append(data)
            return
        if self.skip and not self.in_title:
            return
        self.parts.append(data)
        if self.in_h1:
            self.h1.append(data)


def _ld_strings(raw: str) -> list[str]:
    out: list[str] = []

    def walk(x):
        if isinstance(x, dict):
            for k, v in x.items():
                if k not in {"@context", "@type", "@id", "url", "image", "logo", "sameAs", "item", "mainEntityOfPage"}:
                    walk(v)
        elif isinstance(x, list):
            for v in x:
                walk(v)
        elif isinstance(x, str):
            out.append(x)

    try:
        walk(json.loads(raw))
    except ValueError:
        pass
    return out


def visible_text(html: str) -> tuple[str, str]:
    p = _VisibleText()
    p.feed(html)
    text = " ".join(p.parts + [s for raw in p.ld for s in _ld_strings(raw)])
    return re.sub(r"\s+", " ", text), re.sub(r"\s+", " ", " ".join(p.h1))


def _route(dist: Path, path: Path) -> str:
    r = path.relative_to(dist).as_posix()
    return "/" + (r[: -len("index.html")] if r.endswith("index.html") else r)


def _is_article(route: str) -> bool:
    return route.startswith("/blog/") and route not in {"/blog/", "/blog/topics/"}


def _mask_allowed(text: str) -> str:
    for rx in ALLOWED_PHRASES:
        text = rx.sub(lambda m: " " * len(m.group(0)), text)
    return text


def check_dist(dist: Path) -> list[str]:
    """Return one line per spelling that breaks the market policy (empty when the build complies)."""
    pages: dict[str, str] = {}
    article_corpus: list[str] = []
    for path in sorted(dist.rglob("*.html")):
        route = _route(dist, path)
        text, _h1 = visible_text(path.read_text(encoding="utf-8", errors="replace"))
        if _is_article(route):
            article_corpus.append(text)
        else:
            pages[route] = text
    corpus = " ".join(article_corpus)
    problems: list[str] = []
    for route, text in sorted(pages.items()):
        british_page = route in BRITISH_PAGES
        rx = AMERICAN_RE if british_page else BRITISH_RE
        masked = _mask_allowed(text)
        for m in rx.finditer(masked):
            window = text[max(0, m.start() - 30): m.end() + 30]
            # Listing pages repeat article titles and excerpts; those keep the article's spelling.
            if not british_page and any(seg and seg in corpus for seg in (
                    text[max(0, m.start() - 15): m.end()], text[m.start(): m.end() + 15])):
                continue
            want = AMERICAN_TO_BRITISH if british_page else BRITISH_TO_AMERICAN
            problems.append(f"{route}: '{m.group(1)}' should be '{want[m.group(1).lower()]}' ... {window.strip()} ...")
    return problems


if __name__ == "__main__":
    import sys

    found = check_dist(Path(sys.argv[1] if len(sys.argv) > 1 else "dist"))
    print("\n".join(found) or "OK: spelling by market")
    sys.exit(1 if found else 0)
