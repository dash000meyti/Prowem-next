# Architecture

Prowem is a Next.js 16 App Router site. All product code lives under `src/`. Config, docs, and tooling stay at the repo root.

Changes to this tree, the UI vs Templates contract, existing component prop APIs, locale config, or routing need user confirmation first (recommendation, advantages, risks). After a change lands, keep `docs/` in sync **and** keep Cursor (`.cursor/rules/`) and Claude (`CLAUDE.md`) summaries aligned in the same change. Map: [docs/agents.md](agents.md). Workflow: [AGENTS.md](../AGENTS.md#workflow).

## Tree

```text
src/
  app/
    globals.css
    [lang]/
      layout.tsx       Root layout: <html lang dir>, theme CSS vars, SiteHeader
      page.tsx         Locale home (foundation shell)
      not-found.tsx
  components/
    ui/                Atoms. No routes, no copy.
    templates/         Layout compositions built from UI.
  i18n/
    config.ts          Locales, default, RTL, labels (stays in code).
    dictionary.ts      Dictionary type from en.json
    get-dictionary.ts  Server copy API (JSON adapter today)
    pathname.ts        Locale-aware path helper
    messages/          One JSON file per locale
  settings/
    types.ts           Settings / Theme contract
    default.json       Current theme values
    get-settings.ts    Server settings API (JSON adapter today)
    css-vars.ts        Theme → CSS variables for <html>
  lib/
    cn.ts              clsx + tailwind-merge
  proxy.ts             Locale prefix redirect
docs/                  Human and AI guides (start at agents.md)
.cursor/rules/         Cursor: workflow, core, components, i18n, app-router, settings
AGENTS.md              Shared Cursor + Claude rules
CLAUDE.md              Claude Code entry (@AGENTS.md)
```

`src/proxy.ts` sits next to `src/app/` because Next.js 16 Proxy must live at the same level as the App Router directory.

Copy and settings storage: [content.md](content.md).

## Request flow

1. A request hits `src/proxy.ts`.
2. If the first path segment is not a supported locale, Proxy redirects to `/{locale}{pathname}`. Locale comes from `Accept-Language`, falling back to `en`.
3. `src/app/[lang]/layout.tsx` validates `lang`, sets `<html lang dir>`, injects theme CSS variables from `getSettings()`, and renders `SiteHeader`.
4. Pages load copy with `getDictionary()` (`next/root-params` → `lang` → dictionary API).
5. Templates receive copy and `currentLocale` as props. They compose UI primitives.

```text
Request → proxy.ts → [lang]/layout.tsx → page
                         │
                         ├─ html lang + dir
                         ├─ theme CSS vars (getSettings)
                         ├─ SiteHeader (template)
                         │    ├─ Container (UI)
                         │    └─ LanguageSwitcher (template)
                         │         └─ buttonVariants (UI)
                         └─ getDictionary() / getSettings()
```

## Aliases

`@/*` maps to `src/*` (`tsconfig.json`). Import from `@/components/...`, `@/i18n/...`, `@/settings/...`, `@/lib/cn`.

## Styling

- Tailwind 4 via `@import "tailwindcss"` in `src/app/globals.css`
- Design token **values** come from `getSettings()` (`src/settings/default.json` today)
- The locale layout sets those values as CSS variables on `<html>` via `toCssVars()`
- `globals.css` owns variable **names**, `@theme inline` wiring, and hex fallbacks
- Phase 1 tokens are neutral (`background`, `foreground`, `primary`). Replace values in settings in phase 2; do not scatter hex values in components
- No dark mode until requested

## Routing rules

- Every public URL includes a locale prefix.
- The root layout **is** `src/app/[lang]/layout.tsx`. It owns `<html>` and `<body>`. Do not add a second `src/app/layout.tsx` with those tags.
- `generateStaticParams` in the locale layout emits all locales from `src/i18n/config.ts`.
- Invalid `lang` values call `notFound()`.

## Where new code goes

| Kind | Location |
| --- | --- |
| Page / route | `src/app/[lang]/...` |
| Atom (button, card, input) | `src/components/ui/<name>/` |
| Section or chrome (hero, header, footer) | `src/components/templates/<name>/` |
| User-facing string | `src/i18n/messages/*.json` (read via `getDictionary()`) |
| Locale list / direction | `src/i18n/config.ts` |
| Theme / app settings values | `src/settings/default.json` (read via `getSettings()`) |
| Shared helper | `src/lib/` |
| Static asset | `public/` |
| Cursor agent rules | `.cursor/rules/*.mdc` |
| Shared agent contract | `AGENTS.md` + `docs/agents.md` |
| Claude Code entry | `CLAUDE.md` |
