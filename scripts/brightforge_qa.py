#!/usr/bin/env python3
"""Bright Forge own-site QA runner.

Runs repeatable checks that should happen before we call Bright Forge site work done.
Default mode is local/full: build, static checks, and rendered browser screenshots if Edge/Chrome is available.
CI should use --static-only after npm run build.
"""

from __future__ import annotations

import argparse
import os
import re
import shutil
import subprocess
import sys
import time
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from typing import Iterable

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
PUBLIC_SITEMAP = ROOT / "public" / "sitemap.xml"
SCREENSHOT_DIR = ROOT / "qa-artifacts" / "screenshots"
BASE_URL = "https://brightforge.com.ph"
ORANGE = "#f0622a"

REPRESENTATIVE_PATHS = [
    "/",
    "/seo-services-philippines/",
    "/content-seo-services-philippines/",
    "/seo-command-centre/",
    "/case-studies/car-auction-seo/",
    "/case-studies/ai-fintech-saas-geo/",
]

EXEMPT_H1_SPAN_PATHS = {
    "thanks/index.html",
}

LIGHT_CARD_PATTERNS = [
    "background: #fff",
    "background:#fff",
    "background: white",
    "background:white",
    "background-color: #fff",
    "background-color:#fff",
    "background-color: white",
    "background-color:white",
    "#f8fafc",
    "#ffffff",
]

DARK_PREMIUM_PAGE_HINTS = [
    "#0d0f1a",
    "#080816",
    "#0b1020",
    "rgba(240, 98, 42",
    ORANGE,
]


def resolve_cmd(cmd: list[str]) -> list[str]:
    if not cmd:
        return cmd
    executable = shutil.which(cmd[0])
    if executable:
        return [executable, *cmd[1:]]
    return cmd


def run(cmd: list[str], *, cwd: Path = ROOT, timeout: int = 600) -> subprocess.CompletedProcess[str]:
    resolved = resolve_cmd(cmd)
    print(f"$ {' '.join(cmd)}")
    return subprocess.run(resolved, cwd=cwd, timeout=timeout, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)


def fail(message: str) -> None:
    print(f"FAIL: {message}")
    raise SystemExit(1)


def warn(message: str) -> None:
    print(f"WARN: {message}")


def ok(message: str) -> None:
    print(f"OK: {message}")


class H1Parser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.h1_depth = 0
        self.in_span = 0
        self.h1_count = 0
        self.h1_has_span: list[bool] = []
        self._current_has_span = False

    def handle_starttag(self, tag: str, attrs) -> None:  # type: ignore[no-untyped-def]
        tag = tag.lower()
        if tag == "h1":
            self.h1_depth += 1
            self.h1_count += 1
            self._current_has_span = False
        elif self.h1_depth and tag == "span":
            self.in_span += 1
            self._current_has_span = True

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()
        if tag == "span" and self.in_span:
            self.in_span -= 1
        elif tag == "h1" and self.h1_depth:
            self.h1_depth -= 1
            self.h1_has_span.append(self._current_has_span)


class H2Parser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.in_h2 = 0
        self.h2_count = 0
        self.h2_without_span = 0
        self._current_has_span = False

    def handle_starttag(self, tag: str, attrs) -> None:  # type: ignore[no-untyped-def]
        tag = tag.lower()
        if tag == "h2":
            self.in_h2 += 1
            self.h2_count += 1
            self._current_has_span = False
        elif self.in_h2 and tag == "span":
            self._current_has_span = True

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()
        if tag == "h2" and self.in_h2:
            self.in_h2 -= 1
            if not self._current_has_span:
                self.h2_without_span += 1


def html_files() -> Iterable[Path]:
    if not DIST.exists():
        fail("dist/ does not exist. Run npm run build first, or run this script without --static-only.")
    yield from DIST.rglob("*.html")


def rel(path: Path) -> str:
    return path.relative_to(DIST).as_posix()


def page_url_from_dist_file(path: Path) -> str:
    r = rel(path)
    if r == "index.html":
        return f"{BASE_URL}/"
    if r.endswith("/index.html"):
        return f"{BASE_URL}/{r[:-10]}"
    return f"{BASE_URL}/{r}"


def route_to_dist_path(route: str) -> Path:
    route = route.strip() or "/"
    if route == "/":
        return DIST / "index.html"
    return DIST / route.strip("/") / "index.html"


def check_sitemap() -> None:
    if not PUBLIC_SITEMAP.exists():
        fail("public/sitemap.xml is missing")
    try:
        tree = ET.parse(PUBLIC_SITEMAP)
    except ET.ParseError as exc:
        fail(f"sitemap XML parse failed: {exc}")
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    locs = [el.text or "" for el in tree.findall(".//sm:loc", ns)]
    if not locs:
        locs = [el.text or "" for el in tree.findall(".//loc")]
    if len(locs) != len(set(locs)):
        dupes = sorted({loc for loc in locs if locs.count(loc) > 1})
        fail(f"duplicate sitemap URLs: {dupes[:10]}")
    if f"{BASE_URL}/seo-command-centre/" not in locs:
        fail("/seo-command-centre/ missing from sitemap")
    missing_built = []
    for loc in locs:
        if not loc.startswith(BASE_URL):
            continue
        route = loc.removeprefix(BASE_URL)
        if not route:
            route = "/"
        if not route_to_dist_path(route).exists():
            missing_built.append(loc)
    if missing_built:
        fail("sitemap URLs missing built HTML: " + ", ".join(missing_built[:10]))
    ok(f"sitemap valid with {len(locs)} URLs")


def check_h1_spans() -> None:
    missing = []
    multiple = []
    for path in html_files():
        parser = H1Parser()
        parser.feed(path.read_text(encoding="utf-8", errors="ignore"))
        r = rel(path)
        if parser.h1_count > 1:
            multiple.append(f"{r} ({parser.h1_count})")
        if r not in EXEMPT_H1_SPAN_PATHS and parser.h1_count and not any(parser.h1_has_span):
            if not r.startswith("blog/") and not r.startswith("author/") and not r.startswith("authors/"):
                missing.append(r)
    if multiple:
        warn("pages with multiple H1s: " + ", ".join(multiple[:10]))
    if missing:
        fail("non-exempt pages with H1 but no span: " + ", ".join(missing[:20]))
    ok("H1 orange-span structure present on non-exempt page templates")


def check_h2_spans() -> None:
    offenders = []
    for path in html_files():
        r = rel(path)
        if r.startswith("blog/") or r.startswith("author/"):
            continue
        parser = H2Parser()
        parser.feed(path.read_text(encoding="utf-8", errors="ignore"))
        if parser.h2_without_span:
            offenders.append(f"{r} ({parser.h2_without_span})")
    if offenders:
        warn("non-blog pages with H2s missing span:")
        for offender in offenders[:30]:
            print(f"  - {offender}")
    else:
        ok("H2 orange-span structure present on non-blog pages")


def check_light_cards() -> None:
    offenders = []
    for path in (ROOT / "src").rglob("*.astro"):
        text = path.read_text(encoding="utf-8", errors="ignore")
        lower = text.lower()
        has_dark_premium = any(h.lower() in lower for h in DARK_PREMIUM_PAGE_HINTS)
        if not has_dark_premium:
            continue
        hits = [p for p in LIGHT_CARD_PATTERNS if p.lower() in lower]
        if hits:
            offenders.append((path.relative_to(ROOT).as_posix(), hits[:5]))
    # This is a warning, not a hard fail: some light backgrounds may be intentional outside dark sections.
    if offenders:
        warn("possible light-card CSS inside dark premium files:")
        for file, hits in offenders[:20]:
            print(f"  - {file}: {', '.join(hits)}")
    else:
        ok("no obvious light-card CSS patterns found in dark premium source files")


def check_required_routes() -> None:
    missing = []
    for route in REPRESENTATIVE_PATHS:
        if not route_to_dist_path(route).exists():
            missing.append(route)
    if missing:
        fail("representative routes missing from build: " + ", ".join(missing))
    ok("representative routes are built")


def find_browser() -> str | None:
    candidates = [
        os.environ.get("BRIGHTFORGE_BROWSER"),
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        shutil.which("msedge"),
        shutil.which("google-chrome"),
        shutil.which("chromium"),
        shutil.which("chrome"),
    ]
    for candidate in candidates:
        if candidate and Path(candidate).exists():
            return candidate
    return None


def wait_for(url: str, timeout: int = 30) -> None:
    deadline = time.time() + timeout
    last_error = None
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(url, timeout=2) as response:
                if response.status < 500:
                    return
        except Exception as exc:  # noqa: BLE001
            last_error = exc
            time.sleep(0.5)
    fail(f"preview server did not become ready at {url}: {last_error}")


def run_rendered_checks(routes: list[str], *, keep_server: bool = False) -> None:
    browser = find_browser()
    if not browser:
        warn("no Edge/Chrome browser found, skipping rendered screenshot checks")
        return

    preview = subprocess.Popen(
        resolve_cmd(["npm", "run", "preview", "--", "--host", "127.0.0.1"]),
        cwd=ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )
    try:
        wait_for("http://127.0.0.1:4321/")
        SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)
        for route in routes:
            safe = route.strip("/").replace("/", "__") or "home"
            for name, size in {"desktop": "1440,1600", "mobile": "390,1200"}.items():
                out = SCREENSHOT_DIR / f"{safe}-{name}.png"
                url = f"http://127.0.0.1:4321{route}"
                cp = run([
                    browser,
                    "--headless=new",
                    "--disable-gpu",
                    "--no-sandbox",
                    f"--window-size={size}",
                    f"--screenshot={out}",
                    url,
                ], timeout=120)
                if cp.returncode != 0 or not out.exists():
                    fail(f"screenshot failed for {route} {name}: {cp.stdout[-1000:]}")
        ok(f"rendered screenshots written to {SCREENSHOT_DIR}")
    finally:
        if not keep_server:
            preview.terminate()
            try:
                preview.wait(timeout=10)
            except subprocess.TimeoutExpired:
                preview.kill()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--static-only", action="store_true", help="Skip build and browser checks. Use in CI after npm run build.")
    parser.add_argument("--skip-build", action="store_true", help="Do not run npm run build before static checks.")
    parser.add_argument("--routes", nargs="*", default=REPRESENTATIVE_PATHS, help="Routes to screenshot in rendered mode.")
    args = parser.parse_args()

    if not args.static_only and not args.skip_build:
        cp = run(["npm", "run", "build"], timeout=600)
        if cp.returncode != 0:
            print(cp.stdout)
            fail("npm run build failed")
        ok("npm run build passed")

    check_required_routes()
    check_sitemap()
    check_h1_spans()
    check_h2_spans()
    check_light_cards()

    if not args.static_only:
        run_rendered_checks(args.routes)

    ok("Bright Forge QA complete")


if __name__ == "__main__":
    main()
