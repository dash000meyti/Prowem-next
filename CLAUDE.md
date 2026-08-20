@AGENTS.md

# Claude Code

This is the Claude Code project memory. Cursor uses `AGENTS.md` and `.cursor/rules/`. Shared truth is `docs/` — do not invent a parallel architecture here.

When agent rules change, update **Claude and Cursor together** in the same turn (`CLAUDE.md` + `.cursor/rules/` + `docs/agents.md` / `AGENTS.md` as needed). Same sections, same meaning. Pairing: [docs/agents.md](docs/agents.md#keep-cursor-and-claude-in-lockstep).

## Before you write code

Read, in order:

1. [docs/agents.md](docs/agents.md) — Cursor vs Claude, traps, finish checklist
2. [docs/architecture.md](docs/architecture.md)
3. The topic file: [docs/i18n.md](docs/i18n.md), [docs/content.md](docs/content.md), [docs/components.md](docs/components.md), [docs/phases.md](docs/phases.md)
4. The relevant guide in `node_modules/next/dist/docs/` for **this** Next.js version

This app is Next.js 16 App Router. Proxy is `src/proxy.ts`. There is no `middleware.ts`. There is no `next-intl`.

## Workflow

Permanent. The user will not repeat it.

- Changing folder tree, UI / Templates / Icons, existing prop APIs, locale config, or routing: stop, explain recommendation / advantages / risks / alternatives, wait for confirmation.
- Filling tokens, adding message keys, adding a glyph to the icons pack, or adding a component that follows `docs/components.md`: implement.
- If the change alters behavior, folders, components, phase, or i18n rules: update `docs/` (and `AGENTS.md` if needed) in the same turn. Also update the matching `.cursor/rules/*.mdc` so Cursor stays in lockstep. If nothing changed, leave docs alone.
- Same turn: if UI / Templates / Icons / tokens / config changed, update the lab (`src/dev/meta`, playground renderer, gallery; `/dev/icons` for glyphs). Lab chrome is full-width (`Container width="full"`). Product code must not import `src/dev` or `src/app/dev`.

## Layout

- Routes: `src/app/[lang]/` — prefixes `/en` `/de` `/pt` `/es` `/ar`
- UI atoms: `src/components/ui/<name>/` (higher atoms compose lower ones: Dropdown → Button + Card; SelectMenu / Combobox → field + Card listbox; SideMenu / Popup → Button + Card slots)
- Templates: `src/components/templates/<name>/` (phase 1: SiteHeader)
- Icons: `src/components/icons/` (`<Icon name="…" />`; Linear only)
- Static assets: `public/` (`logo.svg` wordmark, `favicon/` PHP set)
- Locales: `src/i18n/config.ts` + `src/i18n/messages/*.json` (copy via `getDictionary()`)
- Settings: `src/settings/` (theme tokens, `theme.container`, and `header.navFrom` via `getSettings()`; UI uses `rounded-*` / `border-*` / `max-w-container-*` classes)
- Product `<html lang dir>` + theme CSS vars: `src/app/[lang]/layout.tsx`. Optional lab layout: `src/app/dev/layout.tsx` (English, playground LTR/RTL, no dark mode)
- Mobile-first UI/templates/pages (`min-w-0`, wrap, `xs:`–`xl:` type/spacing)
