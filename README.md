# Prowem

Marketing site for [Prowem](https://prowem.com/index.php), rebuilt from scratch on Next.js 16.

The live Prowem site is the product reference. This repository is a new structure: multilingual routing, RTL/LTR, a two-layer component system, and phase-by-phase visual work.

## Current phase

**Phase 1 — foundation.** Routing, translations, component conventions, and docs are in place. Favicons are in `src/app/`. Logo, fonts, and page sections are not.

## Stack

- Next.js 16 App Router (React 19)
- Tailwind CSS 4
- Native i18n: JSON dictionaries + `src/proxy.ts`
- UI variants: `class-variance-authority`

## Locales

| Prefix | Language | Direction |
| --- | --- | --- |
| `/en` | English (default) | LTR |
| `/de` | German | LTR |
| `/pt` | Portuguese | LTR |
| `/es` | Spanish | LTR |
| `/ar` | Arabic | RTL |

Visiting `/` redirects to a supported prefix (`Accept-Language`, otherwise `en`).

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Docs

- [Agent guides (Cursor and Claude)](docs/agents.md)
- [Architecture](docs/architecture.md)
- [Internationalization](docs/i18n.md)
- [Components](docs/components.md)
- [Phases](docs/phases.md)
- [AGENTS.md](AGENTS.md) — Cursor + Claude shared rules
- [CLAUDE.md](CLAUDE.md) — Claude Code entry (includes AGENTS.md)

Cursor (`.cursor/rules/`) and Claude (`CLAUDE.md`) summaries must be updated together. See [docs/agents.md](docs/agents.md#keep-cursor-and-claude-in-lockstep).
