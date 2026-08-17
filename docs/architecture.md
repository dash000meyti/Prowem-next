# Architecture

Prowem is a Next.js 16 App Router site. All product code lives under `src/`. Config, docs, and tooling stay at the repo root.

Changes to this tree, the UI vs Templates contract, existing component prop APIs, locale config, or routing need user confirmation first (recommendation, advantages, risks). After a change lands, keep `docs/` in sync **and** keep Cursor (`.cursor/rules/`) and Claude (`CLAUDE.md`) summaries aligned in the same change. Map: [docs/agents.md](agents.md). Workflow: [AGENTS.md](../AGENTS.md#workflow).

## Tree

```text
src/
  app/
    globals.css
    [lang]/
      layout.tsx       Root layout: <html lang dir>, SiteHeader
      page.tsx         Locale home (foundation shell)
      not-found.tsx
  components/
    ui/                Atoms. No routes, no copy.
    templates/         Layout compositions built from UI.
  i18n/
    config.ts          Locales, default, RTL, labels.
    dictionary.ts      Dictionary type from en.json
    get-dictionary.ts  Server loaders
    pathname.ts        Locale-aware path helper
    messages/          One JSON file per locale
  lib/
    cn.ts              clsx + tailwind-merge
  proxy.ts             Locale prefix redirect
docs/                  Human and AI guides (start at agents.md)
.cursor/rules/         Cursor: workflow, core, components, i18n, app-router
AGENTS.md              Shared Cursor + Claude rules
CLAUDE.md              Claude Code entry (@AGENTS.md)
```

`src/proxy.ts` sits next to `src/app/` because Next.js 16 Proxy must live at the same level as the App Router directory.

## Request flow

1. A request hits `src/proxy.ts`.
2. If the first path segment is not a supported locale, Proxy redirects to `/{locale}{pathname}`. Locale comes from `Accept-Language`, falling back to `en`.
3. `src/app/[lang]/layout.tsx` validates `lang`, sets `<html lang dir>`, and renders `SiteHeader`.
4. Pages load copy with `getDictionary()` (`next/root-params` → `lang` → JSON).
5. Templates receive copy and `currentLocale` as props. They compose UI primitives.

```text
Request → proxy.ts → [lang]/layout.tsx → page
                         │
                         ├─ html lang + dir
                         ├─ SiteHeader (template)
                         │    ├─ Container (UI)
                         │    └─ LanguageSwitcher (template)
                         │         └─ buttonVariants (UI)
                         └─ getDictionary() / messages/*.json
```

## Aliases

`@/*` maps to `src/*` (`tsconfig.json`). Import from `@/components/...`, `@/i18n/...`, `@/lib/cn`.

## Styling

- Tailwind 4 via `@import "tailwindcss"` in `src/app/globals.css`
- Design tokens are CSS variables on `:root`, wired with `@theme inline`
- Phase 1 tokens are neutral (`background`, `foreground`, `primary`). Replace them in phase 2; do not scatter hex values in components
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
| User-facing string | `src/i18n/messages/*.json` |
| Locale list / direction | `src/i18n/config.ts` |
| Shared helper | `src/lib/` |
| Static asset | `public/` |
| Cursor agent rules | `.cursor/rules/*.mdc` |
| Shared agent contract | `AGENTS.md` + `docs/agents.md` |
| Claude Code entry | `CLAUDE.md` |
