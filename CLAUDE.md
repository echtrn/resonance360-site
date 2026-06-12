# Resonance 360 — CLAUDE.md

## Project Overview
Static website for Dr. Tham / Resonance 360 (clinical/professional services).
Hosted on GitHub Pages via the `main` branch of `https://github.com/echtrn/resonance360-site`.

## Deploy
- Push to `main` → live in ~30 seconds (no build step)
- Always push after every commit

## Site Structure
- `index.html` — Home: hero (wave motif) → trust bar → pillars → Meet Dr Tham → recent writing → CTA band
- `about.html` — About Dr. Tham: bio → career timeline (`.journey`) → publications & speaking (`.pubs`) → R360
- `clinical.html` — Clinical services (second opinions are fully remote — written report, no clinic visit)
- `ai-innovation.html` — AI innovation services; Selected Work is a desktop grid with featured SSRN card, carousel ≤960px
- `insights.html` — Writing page: on-site article summaries with anchors (#throw-punches, #guidelines-2-0, #national-ai-council, #private-practice-scale), each linking out to SSRN/LinkedIn
- `faq.html` — FAQ (FAQPage JSON-LD)
- `contact.html` — Contact page (Formspree forms)
- `css/styles.css` — All shared styles; page-specific styles live in each page's inline `<style>`
- `js/main.js` — Nav, scroll-reveal IntersectionObserver, footer year
- `js/projects.js` — Renders project cards from `data/projects.json` (currently unused: both arrays empty, clinical section removed; AI page cards are hardcoded)
- `assets/images/dr-tham.jpg` — Profile photo (about + home Meet strip)
- `assets/images/og-card.png` — Branded 1200×630 OG image (all pages except About, which uses the portrait)
- `assets/images/favicon-32/192.png`, `apple-touch-icon.png`, `/favicon.ico`, `R360-logo-512.png` — icon set
- `sitemap.xml` — All 7 pages, www URLs, submitted to GSC + Bing
- `robots.txt` — Allows all crawlers, points to sitemap
- `llms.txt` — AI-crawler summary of the site
- `site-brief.md` — Original project brief (renamed from typo'd `calujde.md`)

## Hosting & DNS
- A record points to Vercel (216.198.79.1); `vercel.json` present in repo
- Apex `resonance360.com` 307-redirects to `www.resonance360.com` (Vercel default)
- All canonicals, OG URLs, JSON-LD ids, sitemap, robots and llms.txt use `https://www.resonance360.com/` (aligned 2026-06-12)
- DNS managed via Wix; nameservers `ns10.wixdns.net` / `ns11.wixdns.net`

## SEO
- Each HTML page has: targeted `<title>`, meta description, meta keywords, canonical URL, Open Graph, Twitter Card, JSON-LD schema
- JSON-LD types in use: `MedicalBusiness`, `Physician`, `MedicalProcedure`, `ProfessionalService`, `ContactPage`, `WebSite`, `BreadcrumbList`
- Verified in Google Search Console (TXT record on Wix DNS) and Bing Webmaster Tools (imported via GSC)
- When changing page H1s/titles, also update the corresponding `og:title` and JSON-LD `name` fields

## Conventions
- CSS custom properties for spacing: `--sp-1` through `--sp-N` (rem-based)
- Colour scheme: Deep Navy (`#0A1628`) + Teal (`#0D9488`) accent
- Typography: Fraunces (serif) for h1/h2 display headings via global rule in styles.css; Inter body; JetBrains Mono labels/AI accents. AI-page mono headings override the serif via their own class rules.
- Copy uses spaced em dashes (` — `), never spaced hyphens
- Voice: name Dr Tham personally in service copy rather than "we"/"Resonance 360"
- Dark-on-navy body text: keep white alpha ≥ 0.6 for WCAG contrast
- Prefer editing existing files over creating new ones
- Stage specific files only — never `git add -A` or `git add .`

## Known Gotchas
- `js/main.js` IntersectionObserver scans `.reveal` elements once at DOMContentLoaded, before `js/projects.js` finishes its async fetch. Dynamically-injected cards must NOT carry the `.reveal` class — they get stuck at `opacity: 0` with no observer to fire `.is-visible`. Project cards now omit `.reveal` and render visible immediately.
- `assets/images/R360-logo.png` (2048px source) has a BAKED-IN checkerboard "transparency" pattern — it is fully opaque. Any derivative icon must be circle-masked (see favicon set). Don't use the raw file in layouts.
- LinkedIn post dates: decode from the activity ID (`id >> 22` = epoch ms) rather than guessing.

## Email
- Domain: `resonance360.com` (managed via Wix)
- Google Workspace active on the domain
- `hello@resonance360.com` — public-facing generic address (footer, general CTAs), forwards to `dr.tham@resonance360.com`
- `dr.tham@resonance360.com` — primary mailbox (Dr. Tham's inbox), used for clinical enquiries
- DKIM configured via Google Workspace
- Rule: clinical enquiries → `dr.tham@`, generic/general → `hello@`

## Clinical Workflow
- No face-to-face consultations for second opinions
- Flow: email enquiry → suitability review → scan submission (digital link or physical) → second opinion report formulated
- Scans: digital link preferred, or physical to Radiologic Clinic, Mount Elizabeth Novena
- Patient fills a clinical questionnaire alongside scan submission
- Referral to clinical specialist may be recommended if necessary
