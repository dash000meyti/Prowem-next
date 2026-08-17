# Phases

Work is sequential. Finish the current phase before starting the next. Do not pre-build unused sections.

## Phase 1 — Foundation (current)

Done in this repository:

- `src/` app structure
- Locale prefixes `/en` `/de` `/pt` `/es` `/ar`
- RTL for Arabic
- UI + template convention
- Skeleton home that proves i18n and direction
- Docs for humans and agents ([docs/agents.md](agents.md) is the Cursor/Claude map)

Not in this phase: brand colors, logo, favicon, fonts, Prowem page sections.

## Phase 2 — Design tokens and brand assets

User supplies:

- Color palette
- Logo
- Favicon / app icons
- Fonts

Then replace the neutral values in `src/settings/default.json` (CSS variable names stay in `src/app/globals.css`) and wire fonts in the locale layout. No new marketing sections.

## Phase 3 — UI primitives for the homepage

Add atoms actually needed for the first real page (heading, card, etc.). Follow [components.md](components.md). Still no full Prowem layout.

## Phase 4 — Site chrome templates

Rebuild Header, Footer, and navigation as templates on top of the new UI. Props remain the control surface.

## Phase 5+ — Prowem pages, section by section

Recreate [prowem.com](https://prowem.com/index.php) with this system, one section at a time, then inner pages (Event-App, Broadcast, Social, Club, Team, Login / Get started).

Each section should:

- Live as a template (or a page that composes templates)
- Take content through props / dictionaries
- Stay locale- and direction-aware
