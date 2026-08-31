from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "src/pages/ai-search-optimization-services-philippines.astro"
SOURCE = PAGE.read_text(encoding="utf-8")
LOWER = SOURCE.lower()


def compact(text: str) -> str:
    return re.sub(r"\s+", " ", text.lower())


def test_existing_page_owns_the_full_ai_search_service_intent():
    required_concepts = [
        "ai seo services",
        "ai search optimisation",
        "generative engine optimisation",
        "answer engine optimisation",
        "llm seo",
        "google ai overviews",
        "chatgpt",
        "perplexity",
        "microsoft copilot",
    ]
    page = compact(SOURCE)
    for concept in required_concepts:
        assert concept in page, f"Missing AI-search concept: {concept}"


def test_page_uses_one_existing_owner_instead_of_thin_duplicate_routes():
    forbidden_routes = [
        "geo-services.astro",
        "generative-engine-optimization-services.astro",
        "generative-engine-optimisation-services.astro",
        "answer-engine-optimization-services.astro",
        "answer-engine-optimisation-services.astro",
        "llm-seo-services.astro",
        "chatgpt-seo-services.astro",
    ]
    page_names = {path.name for path in (ROOT / "src/pages").glob("*.astro")}
    assert PAGE.exists()
    assert not page_names.intersection(forbidden_routes)


def test_pricing_intent_is_private_and_contains_no_public_amounts():
    assert "private proposal" in LOWER
    assert "scope" in LOWER
    money_patterns = [
        r"[$£€]\s?\d",
        r"\b(?:usd|aud|gbp|php)\s?\d",
        r"\b\d[\d,]*(?:\.\d+)?\s?(?:dollars?|pounds?|pesos?)\b",
    ]
    for pattern in money_patterns:
        assert not re.search(pattern, SOURCE, flags=re.IGNORECASE), pattern


def test_page_rejects_ai_magic_and_uses_platform_accurate_guidance():
    page = compact(SOURCE)
    assert "no special schema" in page
    assert "no agency can guarantee" in page
    assert "seo fundamentals" in page
    assert "oai-searchbot" in page
    assert "bing webmaster tools" in page
    assert "search console" in page


def test_page_cites_primary_platform_guidance():
    official_sources = [
        "https://developers.google.com/search/docs/appearance/ai-features",
        "https://developers.openai.com/api/docs/bots",
        "https://blogs.bing.com/webmaster/",
    ]
    for source in official_sources:
        assert source in SOURCE


def test_redesign_has_a_distinctive_observatory_narrative_not_old_card_grids():
    required_hooks = [
        "citation-observatory",
        "answer-surface",
        "signal-path",
        "method-ledger",
        "platform-run",
        "commercial-brief",
    ]
    for hook in required_hooks:
        assert hook in SOURCE, f"Missing redesign hook: {hook}"
    retired_grid_hooks = [
        "audit-grid",
        "process-grid",
        "platform-grid",
        "timeline-grid",
        "differentiator-grid",
    ]
    for hook in retired_grid_hooks:
        assert hook not in SOURCE, f"Old repetitive grid remains: {hook}"


def test_single_faq_array_drives_visible_answers_and_schema():
    assert "faqs={aiSearchFaqs}" in SOURCE
    assert "aiSearchFaqs.map" in SOURCE
    frontmatter = SOURCE.split("---", 2)[1]
    assert frontmatter.count("question:") >= 8
    assert "What is the difference between AI SEO, GEO and AEO?" in SOURCE
    assert "Do we need an llms.txt file or special AI schema?" in SOURCE


def test_public_copy_uses_we_voice_and_no_em_dashes():
    visible = SOURCE.split("---", 2)[2]
    assert "—" not in SOURCE
    assert not re.search(r"(?:^|[.!?]\s+)I\s+(?:help|audit|build|check|create|deliver|optimise|optimize|measure)", visible)


def test_art_directed_section_surfaces_survive_the_global_dark_override():
    protected_surfaces = [
        "ai-hero",
        "ai-shift",
        "ai-source-system",
        "ai-measurement",
        "ai-fit",
        "ai-final-cta",
    ]
    for surface in protected_surfaces:
        rule = re.search(rf"\.{surface}\s*\{{([^}}]+)\}}", SOURCE, flags=re.DOTALL)
        assert rule, f"Missing surface rule: {surface}"
        assert re.search(r"background\s*:[^;]+!important", rule.group(1)), (
            f"{surface} background will lose to global.css section !important override"
        )
        assert f".ai-page.ai-page .{surface}.{surface}" in SOURCE, (
            f"{surface} lacks the specificity needed to beat global.css"
        )


def test_light_editorial_surfaces_keep_dark_readable_type():
    protected_type = [
        ".ai-page.ai-page .ai-shift.ai-shift .shift-statement h2",
        ".ai-page.ai-page .ai-source-system.ai-source-system .source-copy h2",
        ".ai-page.ai-page .ai-source-system.ai-source-system .source-copy > p:not(.ai-kicker)",
        ".ai-page.ai-page .ai-fit.ai-fit .fit-heading h2",
    ]
    for selector in protected_type:
        start = SOURCE.find(selector)
        assert start >= 0, f"Missing light-surface contrast rule: {selector}"
        block = SOURCE[start:SOURCE.find("}", start) + 1]
        assert re.search(r"color\s*:[^;]+!important", block), selector


def test_final_cta_keeps_the_page_dark_background_and_readable_type():
    selector = ".ai-page.ai-page .ai-final-cta.ai-final-cta"
    start = SOURCE.find(selector)
    assert start >= 0
    block = SOURCE[start:SOURCE.find("}", start) + 1]
    assert "var(--ai-bg) !important" in block
    assert "var(--ai-cream) !important" not in block
    assert re.search(r"color\s*:\s*(?:white|var\(--ai-white\))\s*!important", block)
    assert ".ai-final-cta h2 { color: white; }" in SOURCE
    assert ".ai-final-cta div > p { margin: 8px 0 24px; color: var(--ai-muted);" in SOURCE


def test_metadata_targets_broad_buyer_intent_without_stuffing():
    title_match = re.search(r'title="([^"]+)"', SOURCE)
    description_match = re.search(r'description="([^"]+)"', SOURCE)
    assert title_match
    assert description_match
    title = title_match.group(1)
    description = description_match.group(1)
    assert "AI SEO" in title
    assert "GEO" in title
    assert "AEO" in title
    assert len(title) <= 60
    assert 130 <= len(description) <= 160
    assert description.lower().count("optimisation") <= 1
