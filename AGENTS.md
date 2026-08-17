<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Prowem agent rules

Shared contract for **Cursor** and **Claude Code**. How each tool loads files is in [docs/agents.md](docs/agents.md). Do not fork these rules per tool.

Read before changing structure, i18n, or components:

1. [docs/agents.md](docs/agents.md)
2. [docs/architecture.md](docs/architecture.md)
3. [docs/i18n.md](docs/i18n.md)
4. [docs/components.md](docs/components.md)
5. [docs/phases.md](docs/phases.md)

Also read the relevant guide in `node_modules/next/dist/docs/` for this Next.js version. This app uses **Proxy** (`src/proxy.ts`), not deprecated `middleware.ts`. Do not invent APIs from older Next.js training data.

## Workflow

This contract is permanent. The user does not need to repeat it in later prompts.

**Stop and get confirmation** before changing architecture or the component system: folder tree, UI vs Templates contract, existing component prop APIs, `src/i18n/config.ts`, locale routing, or new architectural dependencies. Do not implement yet. First present:

- recommendation
- advantages
- disadvantages / risks
- alternatives, if any

Implement only after the user confirms.

**No confirmation needed** for work that stays inside the current contract: filling design tokens, adding dictionary keys with the same schema, or adding a UI/Template that follows [docs/components.md](docs/components.md).

**Update docs when the work changes them.** If behavior, folders, components, phase status, or i18n rules changed, reflect that in `docs/` and in this file if needed. If nothing changed, leave docs alone.

**Cursor and Claude stay in lockstep.** The team uses both. Never update only `CLAUDE.md` or only `.cursor/rules/`. Shared truth is `docs/` + this file; both tool entries are summaries and must be updated together, with the same sections and meaning. Pairing table: [docs/agents.md](docs/agents.md#keep-cursor-and-claude-in-lockstep).

## Scope

- Build only the current phase. Do not add Prowem marketing sections, brand colors, logos, or fonts until the user provides them.
- Do not reintroduce Next.js starter files, unused assets, or dark mode unless asked.
- Keep the tree lean: no placeholder components that are not used.

## Layout of work

- Application code lives in `src/`.
- Routes live in `src/app/[lang]/`. Every page is locale-prefixed: `/en`, `/de`, `/pt`, `/es`, `/ar`.
- UI primitives: `src/components/ui/<name>/`
- Templates: `src/components/templates/<name>/`
- Locale config is the single source of truth: `src/i18n/config.ts`

## i18n and direction

- Never hardcode user-facing copy. Put strings in `src/i18n/messages/*.json` and read them with `getDictionary()` or pass them as props.
- `en.json` is the schema. After adding keys, TypeScript must still accept every other locale file (`src/i18n/messages/assert-complete.ts`).
- Set document language and direction on `<html>` (`lang` + `dir`). Do not assume LTR in CSS.
- Use logical CSS (`ms-`, `me-`, `ps-`, `pe-`, `text-start`, `start-0`) instead of `left` / `right` / `ml-` / `pl-`.
- Adding a language is a config + messages change. Follow [docs/i18n.md](docs/i18n.md).

## Components

- **UI** = reusable atoms (Button, Container). No page-specific copy or routing.
- **Templates** = compositions of UI for a layout role (SiteHeader, LanguageSwitcher).
- Every public component accepts explicit props and `className`, merged with `cn()`.
- Variants go through `class-variance-authority`. Export both the component and its `*Variants` helper.
- Do not hide important behavior behind magic defaults when a prop can express it.

## Next.js 16 notes

- Root layout is `src/app/[lang]/layout.tsx` and owns `<html>` and `<body>`.
- Locale for Server Components: `lang` from `next/root-params`, or `params` on the layout/page.
- Client Components cannot use `next/root-params`. Pass `currentLocale` as a prop.
- Use `LayoutProps<'/[lang]'>` and `PageProps<'/[lang]'>` for route types.

Cursor injects extra copies of these rules via `.cursor/rules/`. Claude Code starts at `CLAUDE.md`. Those files must stay aligned with this document and `docs/` in the **same change**. Do not add a Claude-only or Cursor-only product rule.
