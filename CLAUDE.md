# Resonance 360 — CLAUDE.md

## Project Overview
Static website for Dr. Tham / Resonance 360 (clinical/professional services).
Hosted on GitHub Pages via the `main` branch of `https://github.com/echtrn/resonance360-site`.

## Deploy
- Push to `main` → live in ~30 seconds (no build step)
- Always push after every commit

## Site Structure
- `index.html` — Home / landing page
- `about.html` — About Dr. Tham
- `clinical.html` — Clinical services
- `ai-innovation.html` — AI innovation services
- `contact.html` — Contact page
- `css/styles.css` — All styles (single stylesheet)
- `assets/images/dr-tham.jpg` — Profile photo

## Conventions
- CSS custom properties for spacing: `--sp-1` through `--sp-N` (rem-based)
- Colour scheme: Deep Navy (`#0A1628`) + Teal (`#0D9488`) accent
- Prefer editing existing files over creating new ones
- Stage specific files only — never `git add -A` or `git add .`

## Email
- Domain: `resonance360.com` (managed via Wix)
- Google Workspace active on the domain
- `hello@resonance360.com` — public-facing address (shown on website), forwards to `dr.tham@resonance360.com`
- `dr.tham@resonance360.com` — primary mailbox (Dr. Tham's inbox)
- DKIM configured via Google Workspace
