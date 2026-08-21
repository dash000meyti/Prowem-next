# Phases

Work is sequential. Finish the current phase before starting the next. Do not pre-build unused sections.

## Phase 1 — Foundation

Done in this repository:

- `src/` app structure
- Locale prefixes `/en` `/de` `/pt` `/es` `/ar`
- RTL for Arabic
- UI + template convention
- Skeleton home that proves i18n and direction
- Docs for humans and agents ([docs/agents.md](agents.md) is the Cursor/Claude map)
- Card UI atom (compound Header / Content / Footer). Added here because Dropdown’s open panel is a Card
- Lab UI kit used by `/dev`: Heading, Text, List, Table, Code, Label, Input, Select, SelectMenu, Combobox, Checkbox, Textarea, Switch, Separator, Badge, Tabs, Alert, Tooltip, Popup

Not in this phase: Prowem page sections. The site wordmark lives in `public/logo.svg` and is used by `SiteHeader`. The PHP favicon set is in `public/favicon/`; Next.js serves the same files from `src/app/` (`favicon.ico`, `icon.svg`, `icon.png`, `icon1.png`, `apple-icon.png`). Brand color values live in `src/settings/default.json`.

## Phase 2 — Design tokens and brand assets (in progress)

Done:

- Color palette, logo, favicon / app icons
- Local fonts: Bebas Neue Regular, Heebo Regular/Bold, Ubuntu Light/Medium under [`src/fonts/`](../src/fonts/) (`next/font/local`), wired on product and `/dev` layouts; type scale tokens in `globals.css`; `font` prop on Heading / Text / Label / Button

Still out of scope here: new marketing sections. Color values stay in `src/settings/default.json`; CSS variable names stay in `src/app/globals.css`. The wordmark is `public/logo.svg` (`SiteHeader` home link).

## Phase 3 — UI primitives for the homepage

Add remaining atoms actually needed for the first real page. Heading, Text, and the rest of the lab kit are already in. Follow [components.md](components.md). Still no full Prowem layout.

## Phase 4 — Site chrome templates

Rebuild Header, Footer, and navigation as templates on top of the new UI. Props remain the control surface.

## Phase 5+ — Prowem pages, section by section

Recreate [prowem.com](https://prowem.com/index.php) with this system, one section at a time, then inner pages (Event-App, Broadcast, Social, Club, Team, Login / Get started).

Each section should:

- Live as a template (or a page that composes templates)
- Take content through props / dictionaries
- Stay locale- and direction-aware

Header nav already points at `/my-event-app`, `/my-broadcast`, `/my-socialmedia`, `/my-club`, `/event-team`, and `/login` (plus Home). Add those routes in this phase, one at a time.
