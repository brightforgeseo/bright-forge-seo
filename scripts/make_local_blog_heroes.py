#!/usr/bin/env python3
"""Unique editorial hero images for the 40 local blog posts. Not title-card clones."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path("/home/benecho/Documents/bright-forge-seo/public/images/blog")
W, H = 1200, 675
BG, PANEL, ORANGE, WHITE, MUTED, LINE = (
    (13, 15, 26),
    (21, 24, 39),
    (240, 98, 42),
    (255, 255, 255),
    (176, 180, 196),
    (255, 255, 255, 36),
)

def font(size, bold=False):
    candidates = [
        "/usr/share/fonts/TTF/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/TTF/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/noto/NotoSans-Bold.ttf" if bold else "/usr/share/fonts/noto/NotoSans-Regular.ttf",
    ]
    for p in candidates:
        if Path(p).exists():
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def canvas():
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)
    d.rectangle((0, 0, 8, H), fill=ORANGE)
    return im, d


def label(d, text, y=28):
    d.text((40, y), text, font=font(22, True), fill=ORANGE)


def rounded(d, box, fill=PANEL, outline=None, r=18):
    d.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=2)


def draw_cost(d):
    label(d, "SEO budget bands")
    bands = [
        ("Freelance / cheap", 90, (80, 80, 90)),
        ("Entry agency", 160, (120, 90, 70)),
        ("Mid-market", 260, ORANGE),
        ("Enterprise", 360, (180, 70, 40)),
    ]
    y = 90
    for name, width, col in bands:
        rounded(d, (80, y, 80 + width + 420, y + 90), fill=PANEL)
        d.rectangle((80, y, 96, y + 90), fill=col)
        d.text((120, y + 18), name, font=font(28, True), fill=WHITE)
        d.text((120, y + 54), "Scope and hours, not a public rate card", font=font(18), fill=MUTED)
        y += 110


def draw_ppc(d):
    label(d, "Search results")
    rounded(d, (80, 90, 1120, 250), fill=PANEL)
    d.rectangle((100, 110, 160, 138), fill=ORANGE)
    d.text((108, 114), "Ad", font=font(16, True), fill=WHITE)
    d.text((180, 110), "Paid listing sits above organic", font=font(26, True), fill=WHITE)
    d.text((180, 160), "Traffic stops when the budget stops", font=font(20), fill=MUTED)
    rounded(d, (80, 280, 1120, 560), fill=PANEL)
    d.text((100, 310), "Organic result", font=font(26, True), fill=WHITE)
    d.text((100, 360), "blueforge.example  ·  service page", font=font(20), fill=ORANGE)
    d.text((100, 420), "Keeps working after the click is earned", font=font(20), fill=MUTED)
    d.rectangle((100, 490, 520, 530), fill=(40, 44, 64))
    d.text((120, 498), "No per-click fee on this row", font=font(18), fill=WHITE)


def draw_month(d):
    label(d, "A month of SEO work")
    weeks = ["Week 1 audit", "Week 2 fixes", "Week 3 content", "Week 4 report"]
    for i, w in enumerate(weeks):
        x = 70 + i * 280
        rounded(d, (x, 140, x + 250, 520), fill=PANEL)
        d.rectangle((x, 140, x + 250, 160), fill=ORANGE)
        d.text((x + 20, 190), w, font=font(22, True), fill=WHITE)
        for n, item in enumerate(["GSC", "Pages", "QA", "Next"]):
            d.ellipse((x + 24, 260 + n * 50, x + 44, 280 + n * 50), outline=ORANGE, width=2)
            d.text((x + 58, 256 + n * 50), item, font=font(18), fill=MUTED)


def draw_sme(d):
    label(d, "Small business search")
    rounded(d, (80, 120, 520, 560), fill=PANEL)
    d.polygon([(160, 220), (300, 140), (440, 220)], fill=ORANGE)
    d.rectangle((180, 220, 420, 480), fill=(30, 34, 52))
    d.rectangle((250, 340, 350, 480), fill=BG)
    d.text((200, 500), "The shop people walk into", font=font(18), fill=MUTED)
    rounded(d, (580, 160, 1120, 520), fill=PANEL)
    d.ellipse((780, 240, 920, 380), outline=ORANGE, width=6)
    d.polygon([(850, 360), (820, 470), (880, 470)], fill=ORANGE)
    d.text((640, 430), "The map pack they search first", font=font(20, True), fill=WHITE)


def draw_flags(d):
    label(d, "Proposal red flags")
    rows = [
        ("Guaranteed #1 rankings", True),
        ("500 backlinks this month", True),
        ("Named owner and evidence", False),
        ("Done needs a screenshot", False),
    ]
    y = 120
    for text, bad in rows:
        rounded(d, (80, y, 1120, y + 110), fill=PANEL)
        mark = "X" if bad else "OK"
        col = (200, 60, 50) if bad else (70, 160, 90)
        d.rounded_rectangle((100, y + 28, 190, y + 82), radius=8, fill=col)
        d.text((118, y + 40), mark, font=font(22, True), fill=WHITE)
        d.text((220, y + 38), text, font=font(28, True), fill=WHITE)
        y += 130


def draw_freelance(d):
    label(d, "One specialist vs a delivery bench")
    rounded(d, (80, 130, 560, 560), fill=PANEL)
    d.ellipse((250, 200, 390, 340), fill=ORANGE)
    d.text((210, 380), "Freelancer", font=font(28, True), fill=WHITE)
    d.text((150, 430), "Fast when the brief is small", font=font(18), fill=MUTED)
    rounded(d, (620, 130, 1120, 560), fill=PANEL)
    for i, name in enumerate(["SEO", "Content", "Tech", "QA"]):
        x = 680 + (i % 2) * 180
        y = 200 + (i // 2) * 140
        d.ellipse((x, y, x + 90, y + 90), outline=ORANGE, width=4)
        d.text((x + 10, y + 100), name, font=font(18, True), fill=WHITE)


def draw_brief(d):
    label(d, "The brief before the pitch")
    rounded(d, (200, 90, 1000, 600), fill=PANEL)
    items = ["Site URL", "Markets", "Priority pages", "GSC access", "What sold last year"]
    for i, item in enumerate(items):
        y = 140 + i * 80
        d.rectangle((260, y, 310, y + 50), outline=ORANGE, width=3)
        d.line((270, y + 25, 300, y + 40), fill=ORANGE, width=3)
        d.line((300, y + 40, 340, y + 10), fill=ORANGE, width=3)
        d.text((360, y + 10), item, font=font(28, True), fill=WHITE)


def draw_working(d):
    label(d, "Clicks, not vibes")
    rounded(d, (80, 110, 1120, 580), fill=PANEL)
    bars = [180, 260, 220, 320, 380]
    base = 520
    for i, h in enumerate(bars):
        x = 160 + i * 180
        d.rectangle((x, base - h, x + 110, base), fill=ORANGE if i == 4 else (70, 74, 96))
    d.text((160, 140), "Impressions", font=font(20), fill=MUTED)
    d.text((700, 140), "Enquiries are the scoreboard", font=font(22, True), fill=WHITE)


def draw_digital(d):
    label(d, "Channels vs search demand")
    boxes = ["Ads", "Social", "Email", "SEO"]
    for i, b in enumerate(boxes):
        x = 80 + i * 280
        fill = ORANGE if b == "SEO" else PANEL
        rounded(d, (x, 180, x + 240, 420), fill=fill)
        d.text((x + 40, 270), b, font=font(32, True), fill=WHITE if b == "SEO" else MUTED)
    d.text((80, 480), "SEO is the unpaid click after someone already wants the job", font=font(22), fill=WHITE)


def draw_notyet(d):
    label(d, "Do not hire SEO on a half-built site")
    rounded(d, (120, 120, 1080, 560), fill=PANEL)
    d.rectangle((200, 180, 1000, 220), outline=MUTED, width=2)
    d.rectangle((200, 250, 620, 500), fill=(30, 34, 52))
    d.text((230, 360), "Noindex still on", font=font(28, True), fill=ORANGE)
    d.rectangle((660, 250, 1000, 500), outline=(80, 84, 104), width=2)
    d.text((700, 360), "Empty service page", font=font(22), fill=MUTED)


def draw_gbp(d):
    label(d, "Google Business Profile verification")
    rounded(d, (80, 140, 560, 560), fill=PANEL)
    d.rectangle((140, 200, 500, 460), fill=WHITE)
    d.rectangle((140, 200, 500, 250), fill=ORANGE)
    d.text((170, 212), "Postcard", font=font(22, True), fill=WHITE)
    d.text((170, 300), "CODE  •  •  •  •", font=font(26, True), fill=BG)
    rounded(d, (620, 140, 1120, 560), fill=PANEL)
    d.ellipse((780, 220, 960, 400), outline=ORANGE, width=8)
    d.text((700, 440), "Then the pin can be trusted", font=font(22, True), fill=WHITE)


def draw_sab(d):
    label(d, "Storefront vs service-area")
    rounded(d, (70, 130, 560, 560), fill=PANEL)
    d.rectangle((160, 220, 470, 460), fill=(30, 34, 52))
    d.rectangle((280, 340, 350, 460), fill=BG)
    d.text((180, 490), "Customers walk in", font=font(22, True), fill=WHITE)
    rounded(d, (620, 130, 1130, 560), fill=PANEL)
    d.polygon([(720, 300), (980, 240), (1040, 340), (700, 400)], fill=(40, 44, 64))
    d.ellipse((820, 280, 900, 360), fill=ORANGE)
    d.text((700, 490), "The van is the premises", font=font(22, True), fill=WHITE)


def draw_nap(d):
    label(d, "Same name, address, phone")
    for i, src in enumerate(["Website", "GBP", "Directory"]):
        y = 120 + i * 160
        rounded(d, (80, y, 1120, y + 140), fill=PANEL)
        d.text((110, y + 24), src, font=font(22, True), fill=ORANGE)
        d.text((110, y + 70), "Bright Forge  ·  Quezon City  ·  one number", font=font(24, True), fill=WHITE)


def draw_pack(d):
    label(d, "Local pack is three slots")
    for i in range(3):
        y = 120 + i * 160
        rounded(d, (80, y, 1120, y + 140), fill=PANEL)
        d.ellipse((110, y + 40, 190, y + 120), outline=ORANGE, width=4)
        d.text((130, y + 62), str(i + 1), font=font(28, True), fill=WHITE)
        d.text((230, y + 50), "Map pack listing", font=font(26, True), fill=WHITE)
        d.text((230, y + 90), "Timing depends on the category and the proof", font=font(18), fill=MUTED)


def draw_reviews(d):
    label(d, "Ask for reviews. Do not invent them.")
    rounded(d, (80, 140, 1120, 560), fill=PANEL)
    for i in range(5):
        x = 160 + i * 180
        col = ORANGE if i < 4 else (70, 74, 96)
        d.polygon(
            [(x + 50, 220), (x + 62, 260), (x + 105, 260), (x + 70, 285), (x + 82, 330),
             (x + 50, 305), (x + 18, 330), (x + 30, 285), (x - 5, 260), (x + 38, 260)],
            fill=col,
        )
    d.text((160, 400), "Four real stars beat five fake ones", font=font(28, True), fill=WHITE)
    d.text((160, 460), "Google can and does remove review spam", font=font(20), fill=MUTED)


def draw_eeat(d):
    label(d, "Experience  Expertise  Authority  Trust")
    words = ["Experience", "Expertise", "Authority", "Trust"]
    for i, w in enumerate(words):
        x = 70 + (i % 2) * 560
        y = 120 + (i // 2) * 240
        rounded(d, (x, y, x + 520, y + 210), fill=PANEL)
        d.rectangle((x, y, x + 12, y + 210), fill=ORANGE)
        d.text((x + 40, y + 80), w, font=font(36, True), fill=WHITE)


def draw_about(d):
    label(d, "About page that can be checked")
    rounded(d, (80, 120, 700, 560), fill=PANEL)
    d.ellipse((120, 180, 280, 340), fill=ORANGE)
    d.text((320, 200), "Named people", font=font(28, True), fill=WHITE)
    d.text((320, 250), "Dates, markets, work done", font=font(20), fill=MUTED)
    rounded(d, (740, 120, 1120, 560), fill=PANEL)
    d.text((780, 200), "Not this", font=font(22, True), fill=ORANGE)
    d.text((780, 280), "World-class", font=font(24), fill=MUTED)
    d.text((780, 340), "Passionate team", font=font(24), fill=MUTED)
    d.text((780, 400), "Synergy", font=font(24), fill=MUTED)


def draw_author(d):
    label(d, "Author page + Person markup")
    rounded(d, (80, 130, 560, 560), fill=PANEL)
    d.ellipse((200, 180, 430, 410), fill=ORANGE)
    d.text((160, 450), "Ben Lowe", font=font(28, True), fill=WHITE)
    d.text((160, 500), "15+ years SEO", font=font(20), fill=MUTED)
    rounded(d, (620, 130, 1120, 560), fill=PANEL)
    d.text((660, 200), '{ "@type": "Person" }', font=font(26, True), fill=ORANGE)
    d.text((660, 280), "Must match the visible bio", font=font(22), fill=WHITE)
    d.text((660, 340), "No invented credentials", font=font(20), fill=MUTED)


def draw_firsthand(d):
    label(d, "First-hand means you were there")
    rounded(d, (80, 130, 620, 560), fill=PANEL)
    d.rectangle((140, 190, 560, 420), outline=ORANGE, width=6)
    d.ellipse((300, 250, 400, 350), outline=WHITE, width=4)
    d.text((160, 460), "Screenshot of the live issue", font=font(20, True), fill=WHITE)
    rounded(d, (660, 130, 1120, 560), fill=PANEL)
    d.text((700, 240), "Notes from the job", font=font(26, True), fill=WHITE)
    d.line((700, 310, 1040, 310), fill=ORANGE, width=3)
    d.line((700, 360, 980, 360), fill=MUTED, width=3)
    d.line((700, 410, 1010, 410), fill=MUTED, width=3)


def draw_trust(d):
    label(d, "Contact  Legal  Editorial")
    for i, t in enumerate(["Contact", "Privacy", "Editorial"]):
        x = 80 + i * 370
        rounded(d, (x, 150, x + 340, 540), fill=PANEL)
        d.rectangle((x + 40, 210, x + 300, 250), fill=ORANGE)
        d.text((x + 70, 320), t, font=font(28, True), fill=WHITE)
        d.text((x + 70, 380), "A real page, not a footer rumour", font=font(16), fill=MUTED)


def draw_brandserp(d):
    label(d, "What Google shows for your name")
    rounded(d, (80, 110, 1120, 580), fill=PANEL)
    d.text((110, 150), "bright forge seo", font=font(22), fill=MUTED)
    d.rectangle((110, 190, 900, 200), fill=(50, 54, 72))
    d.text((110, 230), "Bright Forge SEO Agency", font=font(32, True), fill=(120, 170, 255))
    d.text((110, 290), "https://brightforge.com.ph", font=font(20), fill=ORANGE)
    d.text((110, 360), "About  ·  Services  ·  Case studies  ·  Contact", font=font(22), fill=WHITE)
    d.text((110, 440), "Knowledge panel sits to the right if the entity is clear", font=font(18), fill=MUTED)


def draw_quotes(d):
    label(d, "A quote needs a person who said it")
    rounded(d, (80, 140, 560, 560), fill=PANEL)
    d.text((120, 200), '"', font=font(80, True), fill=ORANGE)
    d.text((120, 300), "Named, dated, checkable", font=font(24, True), fill=WHITE)
    rounded(d, (640, 140, 1120, 560), fill=PANEL)
    d.text((680, 200), '"', font=font(80, True), fill=(80, 84, 104))
    d.text((680, 300), "Anonymous expert", font=font(24, True), fill=MUTED)
    d.text((680, 360), "Empty authority", font=font(20), fill=MUTED)


def draw_outhire(d):
    label(d, "Philippines team vs in-house seat")
    rounded(d, (80, 140, 560, 540), fill=PANEL)
    d.text((120, 220), "Outsource", font=font(32, True), fill=ORANGE)
    d.text((120, 290), "Bench, overlap, QA", font=font(22), fill=WHITE)
    rounded(d, (640, 140, 1120, 540), fill=PANEL)
    d.text((680, 220), "In-house", font=font(32, True), fill=WHITE)
    d.text((680, 290), "One salary, one skill set", font=font(22), fill=MUTED)


def draw_tz(d):
    label(d, "Overlap hours, then who owns strategy")
    cities = [("Manila", "16:00"), ("London", "09:00"), ("New York", "04:00")]
    for i, (c, t) in enumerate(cities):
        x = 90 + i * 370
        rounded(d, (x, 160, x + 340, 520), fill=PANEL)
        d.ellipse((x + 90, 210, x + 250, 370), outline=ORANGE, width=6)
        d.text((x + 120, 270), t, font=font(28, True), fill=WHITE)
        d.text((x + 110, 420), c, font=font(24, True), fill=WHITE)


def draw_wl(d):
    label(d, "Your brand on the report")
    rounded(d, (140, 140, 1060, 560), fill=PANEL)
    d.rectangle((180, 180, 1020, 250), fill=ORANGE)
    d.text((220, 198), "CLIENT AGENCY", font=font(28, True), fill=WHITE)
    d.text((220, 320), "Delivery can sit underneath", font=font(26, True), fill=WHITE)
    d.text((220, 380), "The client should never see the fulfilment brand", font=font(20), fill=MUTED)


def draw_uk(d):
    label(d, "UK scope for a Philippines partner")
    rounded(d, (80, 130, 1120, 560), fill=PANEL)
    items = ["Search Console property", "UK queries, not PH vanity", "Who approves copy", "Who touches the CMS"]
    for i, item in enumerate(items):
        y = 180 + i * 80
        d.rectangle((120, y, 160, y + 40), fill=ORANGE)
        d.text((190, y + 4), item, font=font(26, True), fill=WHITE)


def draw_us(d):
    label(d, "US catalogue, Philippines SEO bench")
    for i, t in enumerate(["Category", "Product", "Collection"]):
        x = 80 + i * 370
        rounded(d, (x, 150, x + 340, 520), fill=PANEL)
        d.rectangle((x + 40, 200, x + 300, 340), fill=(30, 34, 52))
        d.text((x + 70, 380), t, font=font(26, True), fill=WHITE)


def draw_au(d):
    label(d, "Australian local pack, run from Manila")
    rounded(d, (80, 140, 1120, 560), fill=PANEL)
    d.ellipse((140, 200, 420, 480), outline=ORANGE, width=8)
    d.text((180, 320), "AU GBP", font=font(28, True), fill=WHITE)
    d.text((500, 260), "The listing still needs an Australian presence that Google accepts.", font=font(22), fill=WHITE)
    d.text((500, 360), "A Philippines team can operate it. A fake AU office cannot.", font=font(20), fill=MUTED)


def draw_robots(d):
    label(d, "robots.txt")
    rounded(d, (160, 110, 1040, 580), fill=PANEL)
    d.text((220, 160), "User-agent: *", font=font(28, True), fill=WHITE)
    d.text((220, 230), "Disallow: /", font=font(32, True), fill=ORANGE)
    d.text((220, 320), "That line hides the whole site", font=font(24), fill=WHITE)
    d.text((220, 390), "Allow: /  is not a substitute for checking live", font=font(20), fill=MUTED)


def draw_noindex(d):
    label(d, "Staging toggle left on")
    rounded(d, (80, 150, 1120, 540), fill=PANEL)
    d.text((140, 220), "Search engine visibility", font=font(26, True), fill=WHITE)
    d.rounded_rectangle((140, 300, 420, 370), radius=30, fill=(200, 60, 50))
    d.ellipse((340, 308, 404, 362), fill=WHITE)
    d.text((460, 312), "Discourage indexing  ON", font=font(26, True), fill=ORANGE)
    d.text((140, 430), "The redesign shipped. Google still treats it as draft.", font=font(20), fill=MUTED)


def draw_redirects(d):
    label(d, "301   302   Canonical")
    rows = [
        ("301", "Permanent move. Pass the URL."),
        ("302", "Temporary. Do not use for a migration."),
        ("rel=canonical", "Same content, pick one URL."),
    ]
    for i, (k, v) in enumerate(rows):
        y = 130 + i * 160
        rounded(d, (80, y, 1120, y + 140), fill=PANEL)
        d.text((120, y + 45), k, font=font(28, True), fill=ORANGE)
        d.text((420, y + 50), v, font=font(24), fill=WHITE)


def draw_soft404(d):
    label(d, "Soft 404: empty page, 200 OK")
    rounded(d, (80, 140, 560, 560), fill=PANEL)
    d.text((140, 260), "HTTP 200", font=font(40, True), fill=(70, 160, 90))
    d.text((140, 340), "Looks healthy", font=font(22), fill=MUTED)
    rounded(d, (640, 140, 1120, 560), fill=PANEL)
    d.text((700, 260), "No product", font=font(32, True), fill=ORANGE)
    d.text((700, 340), "Google calls it a soft 404", font=font(20), fill=WHITE)


def draw_dupetitle(d):
    label(d, "Two tabs, one title")
    for i, t in enumerate(["Page A", "Page B"]):
        x = 80 + i * 560
        rounded(d, (x, 140, x + 520, 540), fill=PANEL)
        d.rectangle((x + 30, 180, x + 490, 250), fill=(30, 34, 52))
        d.text((x + 50, 198), "Service | Brand", font=font(24, True), fill=WHITE)
        d.text((x + 50, 320), t, font=font(22), fill=MUTED)
        d.text((x + 50, 380), "Google cannot tell them apart", font=font(18), fill=ORANGE)


def draw_facets(d):
    label(d, "Filters creating URL sprawl")
    rounded(d, (80, 120, 400, 560), fill=PANEL)
    for i, f in enumerate(["Colour", "Size", "Price", "In stock"]):
        d.text((110, 170 + i * 80), f, font=font(22, True), fill=WHITE)
        d.rectangle((110, 210 + i * 80, 350, 218 + i * 80), fill=ORANGE)
    rounded(d, (440, 120, 1120, 560), fill=PANEL)
    for i in range(8):
        d.text((480, 160 + i * 45), f"/shop?colour=red&size={i}&page=1", font=font(18), fill=MUTED)


def draw_cwv(d):
    label(d, "LCP   INP   CLS")
    metrics = [("LCP", "Largest paint"), ("INP", "Input delay"), ("CLS", "Layout shift")]
    for i, (k, v) in enumerate(metrics):
        x = 80 + i * 370
        rounded(d, (x, 150, x + 340, 520), fill=PANEL)
        d.arc((x + 70, 200, x + 270, 400), start=180, end=40, fill=ORANGE, width=14)
        d.text((x + 130, 280), k, font=font(28, True), fill=WHITE)
        d.text((x + 90, 430), v, font=font(18), fill=MUTED)


def draw_drop(d):
    label(d, "A ranking drop is a diagnosis, not a rewrite")
    rounded(d, (80, 130, 1120, 560), fill=PANEL)
    pts = [(140, 220), (300, 240), (460, 230), (620, 260), (780, 420), (960, 480)]
    d.line(pts, fill=ORANGE, width=6)
    for p in pts:
        d.ellipse((p[0] - 8, p[1] - 8, p[0] + 8, p[1] + 8), fill=WHITE)
    d.text((140, 500), "Check tracking, season, core update, then the page", font=font(20), fill=MUTED)


def draw_construction(d):
    label(d, "Trade sites sell jobs, not blog posts")
    rounded(d, (80, 140, 1120, 560), fill=PANEL)
    d.polygon([(200, 480), (280, 220), (360, 480)], outline=ORANGE, width=8)
    d.rectangle((500, 260, 1040, 480), fill=(30, 34, 52))
    d.text((540, 320), "Service pages  ·  project proof  ·  areas served", font=font(22, True), fill=WHITE)
    d.text((540, 380), "Scaffold, heating, industrial, build", font=font(20), fill=MUTED)


def draw_legal(d):
    label(d, "Law firm SEO without outcome promises")
    rounded(d, (80, 140, 1120, 560), fill=PANEL)
    d.line((600, 180, 600, 500), fill=ORANGE, width=8)
    d.polygon([(600, 200), (480, 320), (600, 320)], fill=(40, 44, 64), outline=WHITE, width=3)
    d.polygon([(600, 200), (720, 320), (600, 320)], fill=(40, 44, 64), outline=WHITE, width=3)
    d.text((160, 400), "Practice areas and process. Not invented recoveries.", font=font(22, True), fill=WHITE)


def draw_multi(d):
    label(d, "One brand, real locations")
    rounded(d, (80, 140, 1120, 560), fill=PANEL)
    for i, city in enumerate(["Branch A", "Branch B", "Branch C"]):
        x = 220 + i * 280
        d.ellipse((x, 240, x + 90, 330), outline=ORANGE, width=6)
        d.polygon([(x + 45, 310), (x + 20, 400), (x + 70, 400)], fill=ORANGE)
        d.text((x - 10, 430), city, font=font(20, True), fill=WHITE)
    d.text((220, 500), "No doorway suburb clones", font=font(20), fill=MUTED)


def draw_ecom(d):
    label(d, "Category page vs product page")
    rounded(d, (80, 140, 560, 560), fill=PANEL)
    d.text((120, 200), "Category", font=font(28, True), fill=ORANGE)
    for i in range(4):
        x = 120 + (i % 2) * 180
        y = 270 + (i // 2) * 120
        d.rectangle((x, y, x + 150, y + 90), fill=(30, 34, 52))
    rounded(d, (640, 140, 1120, 560), fill=PANEL)
    d.text((680, 200), "Product", font=font(28, True), fill=ORANGE)
    d.rectangle((700, 270, 1060, 480), fill=(30, 34, 52))
    d.rectangle((720, 300, 900, 450), fill=ORANGE)


DRAW = {
    "how-much-does-seo-cost-in-the-philippines-2026": draw_cost,
    "seo-vs-ppc-in-the-philippines": draw_ppc,
    "what-an-seo-agency-does-month-to-month": draw_month,
    "seo-for-small-businesses-in-the-philippines": draw_sme,
    "seo-red-flags-when-hiring-in-the-philippines": draw_flags,
    "freelance-seo-vs-an-agency-in-the-philippines": draw_freelance,
    "how-to-brief-an-seo-agency": draw_brief,
    "how-to-tell-if-seo-is-working": draw_working,
    "digital-marketing-vs-seo-for-philippine-smes": draw_digital,
    "when-not-to-hire-an-seo-agency-yet": draw_notyet,
    "google-business-profile-verification-in-the-philippines": draw_gbp,
    "service-area-business-vs-storefront-on-google-maps": draw_sab,
    "nap-consistency-for-philippine-businesses": draw_nap,
    "how-long-local-pack-rankings-take": draw_pack,
    "review-velocity-without-fake-reviews": draw_reviews,
    "e-e-a-t-for-service-businesses": draw_eeat,
    "how-to-write-an-about-page-google-can-trust": draw_about,
    "author-pages-bios-and-person-schema": draw_author,
    "first-hand-experience-in-seo-content": draw_firsthand,
    "trust-pages-contact-legal-and-editorial-standards": draw_trust,
    "brand-serp-what-shows-when-someone-googles-your-company": draw_brandserp,
    "expert-quotes-vs-made-up-authority": draw_quotes,
    "outsource-seo-to-the-philippines-vs-hire-in-house": draw_outhire,
    "time-zones-overlap-and-who-owns-seo-strategy": draw_tz,
    "white-label-seo-vs-selling-your-own-retainer": draw_wl,
    "how-uk-firms-should-scope-a-philippines-seo-partner": draw_uk,
    "us-ecommerce-brands-using-a-philippines-seo-team": draw_us,
    "australian-local-seo-run-from-the-philippines": draw_au,
    "robots-txt-mistakes-that-block-google": draw_robots,
    "accidental-noindex-after-a-redesign": draw_noindex,
    "301-vs-302-vs-canonical": draw_redirects,
    "soft-404s-in-search-console": draw_soft404,
    "duplicate-title-tags-at-scale": draw_dupetitle,
    "faceted-navigation-seo-without-index-bloat": draw_facets,
    "core-web-vitals-on-wordpress-in-2026": draw_cwv,
    "how-to-read-a-ranking-drop-in-search-console": draw_drop,
    "seo-for-construction-and-trade-sites": draw_construction,
    "seo-for-law-firms-without-legal-promises": draw_legal,
    "seo-for-multi-location-home-services": draw_multi,
    "ecommerce-seo-in-the-philippines-category-vs-product": draw_ecom,
}

ALTS = {
    "how-much-does-seo-cost-in-the-philippines-2026": "Four SEO budget bands from freelance to enterprise, no public rate card",
    "seo-vs-ppc-in-the-philippines": "Search results with a paid ad row above an organic listing",
    "what-an-seo-agency-does-month-to-month": "Four week columns labelled audit, fixes, content and report",
    "seo-for-small-businesses-in-the-philippines": "Shop front beside a map pin",
    "seo-red-flags-when-hiring-in-the-philippines": "Proposal checklist marking ranking guarantees as a fail",
    "freelance-seo-vs-an-agency-in-the-philippines": "One freelancer circle beside a four-role delivery bench",
    "how-to-brief-an-seo-agency": "Clipboard with site, markets, pages and GSC access ticked",
    "how-to-tell-if-seo-is-working": "Bar chart of search clicks rising",
    "digital-marketing-vs-seo-for-philippine-smes": "Ads, social and email boxes beside a highlighted SEO box",
    "when-not-to-hire-an-seo-agency-yet": "Website wireframe with noindex still on",
    "google-business-profile-verification-in-the-philippines": "Verification postcard beside a map pin",
    "service-area-business-vs-storefront-on-google-maps": "Shop doorway beside a van on a service area",
    "nap-consistency-for-philippine-businesses": "Website, GBP and directory rows showing the same NAP",
    "how-long-local-pack-rankings-take": "Three numbered local pack slots",
    "review-velocity-without-fake-reviews": "Five stars with one empty, labelled as real reviews",
    "e-e-a-t-for-service-businesses": "Four panels labelled Experience, Expertise, Authority and Trust",
    "how-to-write-an-about-page-google-can-trust": "Named person card beside rejected slogan copy",
    "author-pages-bios-and-person-schema": "Author portrait beside Person schema that must match the bio",
    "first-hand-experience-in-seo-content": "Screenshot frame beside handwritten job notes",
    "trust-pages-contact-legal-and-editorial-standards": "Contact, privacy and editorial page cards",
    "brand-serp-what-shows-when-someone-googles-your-company": "Brand search result with sitelinks",
    "expert-quotes-vs-made-up-authority": "Named quote versus an anonymous quote",
    "outsource-seo-to-the-philippines-vs-hire-in-house": "Outsource bench versus in-house seat",
    "time-zones-overlap-and-who-owns-seo-strategy": "Three clocks for Manila, London and New York",
    "white-label-seo-vs-selling-your-own-retainer": "Client agency letterhead on a report",
    "how-uk-firms-should-scope-a-philippines-seo-partner": "UK scoping checklist for GSC, queries, copy and CMS",
    "us-ecommerce-brands-using-a-philippines-seo-team": "Category, product and collection cards",
    "australian-local-seo-run-from-the-philippines": "Australian GBP circle with a note that presence must be real",
    "robots-txt-mistakes-that-block-google": "robots.txt file showing Disallow slash",
    "accidental-noindex-after-a-redesign": "CMS visibility toggle left on discourage indexing",
    "301-vs-302-vs-canonical": "Three rows explaining 301, 302 and canonical",
    "soft-404s-in-search-console": "HTTP 200 beside an empty product page",
    "duplicate-title-tags-at-scale": "Two browser tabs sharing the same title",
    "faceted-navigation-seo-without-index-bloat": "Filter sidebar spawning many parameter URLs",
    "core-web-vitals-on-wordpress-in-2026": "LCP, INP and CLS gauges",
    "how-to-read-a-ranking-drop-in-search-console": "Line chart dropping then labelled for diagnosis",
    "seo-for-construction-and-trade-sites": "Scaffold triangle beside trade service proof",
    "seo-for-law-firms-without-legal-promises": "Balance scale with no dollar amounts",
    "seo-for-multi-location-home-services": "Three map pins for real branches",
    "ecommerce-seo-in-the-philippines-category-vs-product": "Category grid beside a single product card",
}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    missing = []
    for slug, fn in DRAW.items():
        im, d = canvas()
        fn(d)
        path = OUT / f"{slug}.webp"
        im.save(path, "WEBP", quality=82, method=6)
        if path.stat().st_size < 1000:
            missing.append(slug)
    print("wrote", len(DRAW), "missing_small", missing)


if __name__ == "__main__":
    main()
