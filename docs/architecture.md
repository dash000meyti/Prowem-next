# Architecture

Prowem is a Next.js 16 App Router site. All product code lives under `src/`. Config, docs, and tooling stay at the repo root.

Changes to this tree, the UI / Templates / Icons contract, existing component prop APIs, locale config, or routing need user confirmation first (recommendation, advantages, risks). After a change lands, keep `docs/` in sync **and** keep Cursor (`.cursor/rules/`) and Claude (`CLAUDE.md`) summaries aligned in the same change. Map: [docs/agents.md](agents.md). Workflow: [AGENTS.md](../AGENTS.md#workflow).

## Tree

```text
src/
  app/
    globals.css
    favicon.ico        Favicon 16×16 (from PHP favicon.ico)
    icon.svg           Favicon SVG mark (from PHP favicon.svg)
    icon.png           Favicon 32×32 (from PHP favicon-32.png)
    icon1.png          Favicon 256×256 (from PHP favicon-256.png)
    apple-icon.png     Apple touch icon (from PHP apple-touch-icon.png)
    [lang]/
      layout.tsx       Product root layout: <html lang dir>, theme CSS vars, font vars, SiteHeader
      page.tsx         Locale home (foundation shell)
      not-found.tsx
    dev/               Optional lab routes (/dev). English only. Sibling root <html>.
  fonts/               Local faces (next/font/local), catalog, files/
  dev/                 Optional lab internals (copy, meta, chrome, playground, gallery)
  components/
    ui/                Atoms. No routes, no copy.
    templates/         Layout compositions built from UI.
    icons/             SVG pack (glyphs + flags). Shared by UI and Templates.
  i18n/
    config.ts          Locales, default, RTL, labels (stays in code).
    dictionary.ts      Dictionary type from en.json
    get-dictionary.ts  Server copy API (JSON adapter today)
    pathname.ts        Locale-aware path helper
    messages/          One JSON file per locale
  settings/
    types.ts           Settings / Theme / ThemeContainer / HeaderSettings contract
    default.json       Current theme and header values
    get-settings.ts    Server settings API (JSON adapter today)
    merge.ts           Deep-merge overlay onto default.json
    css-vars.ts        Theme → CSS variables for <html>
  lib/
    cn.ts              clsx + tailwind-merge
  proxy.ts             Locale prefix redirect
public/
  logo.svg             Site wordmark (exact PHP logo.svg; SiteHeader home link)
  favicon/             Original PHP favicon set (svg, ico, 32, 256, apple-touch)
docs/                  Human and AI guides (start at agents.md)
.cursor/rules/         Cursor: workflow, core, lab, components, i18n, app-router, settings
AGENTS.md              Shared Cursor + Claude rules
CLAUDE.md              Claude Code entry (@AGENTS.md)
```

`src/proxy.ts` sits next to `src/app/` because Next.js 16 Proxy must live at the same level as the App Router directory.

`src/app/dev` and `src/dev` are the component lab. They import product UI; product code must not import them. Delete both folders (or leave them in `.dockerignore`) and production is unchanged. Proxy skips `/dev` as a routing exemption only — it does not import the lab.

The production `Dockerfile` sets `NEXT_CPUS=1` (and Tokio/Rayon thread caps). Next 16 defaults `experimental.cpus` to `os.cpus().length`, which inside Docker is often the **host** count; “Collecting page data using N workers” then aborts with `OS can't spawn worker thread: Resource temporarily unavailable (os error 11)`.

Copy and settings storage: [content.md](content.md).

## Request flow

1. A request hits `src/proxy.ts`.
2. If the first path segment is not a supported locale, Proxy redirects to `/{locale}{pathname}`. Locale comes from `Accept-Language`, falling back to `en`.
3. `src/app/[lang]/layout.tsx` validates `lang`, sets `<html lang dir>`, injects theme CSS variables from `getSettings()`, loads local font CSS variables from `@/fonts`, and renders `SiteHeader` with `navFrom` from `settings.header`.
4. Pages load copy with `getDictionary()` (`next/root-params` → `lang` → dictionary API).
5. Templates receive copy and `currentLocale` as props. They compose UI primitives.

```text
Request → proxy.ts → [lang]/layout.tsx → page
                         │
                         ├─ html lang + dir
                         ├─ theme CSS vars (getSettings)
                         ├─ font CSS vars (@/fonts)
                         ├─ SiteHeader (template)
                         │    ├─ Container (UI)
                         │    ├─ Dropdown language menu (UI) + Icon flags
                         │    │    └─ Button + Card
                         │    ├─ Button Get Started (UI)
                         │    └─ SideMenu (UI, Card slots, below header.navFrom)
                         └─ getDictionary() / getSettings()
```

## Aliases

`@/*` maps to `src/*` (`tsconfig.json`). Import from `@/components/...`, `@/i18n/...`, `@/settings/...`, `@/lib/cn`.

## Styling

- Tailwind 4 via `@import "tailwindcss"` in `src/app/globals.css`
- Design token **values** come from `getSettings()` (`src/settings/default.json` today), merged over defaults so a later SQLite overlay can omit keys
- Shared scales: `theme.colors` (primary, surface, panel, accent 1–4, success, warning, error — action colors are `base` + `foreground` + `hover` + `glow` + `shadow`; panel is `base` + `foreground` + `hover`), `theme.radius` (`none`–`full`), `theme.borderWidth` (`none`–`lg`), `theme.container` (`xs`–`xl` plus `full`)
- The locale layout sets those values as CSS variables on `<html>` via `toCssVars()`
- `globals.css` owns variable **names**, `@theme inline` wiring, and fallbacks
- UI and templates use Tailwind token classes only (`bg-primary`, `bg-panel`, `rounded-md`, `border-md`, `border-border`, `max-w-container-xl`). No hex, no `rounded-[…]`
- Layout is mobile-first. Breakpoint **widths** (`xs`–`xl`: 480 / 720 / 980 / 1200 / 1440px) are declared in `globals.css` `@theme`, not in settings (media queries cannot use runtime SQLite values). `2xl` is unset. `theme.container` in settings is the matching max-width scale (`full` = 100%). `header.navFrom` is which named breakpoint SiteHeader uses for desktop nav vs hamburger.
- Color values live in settings. Do not scatter hex values in components
- No dark mode until requested

## Routing rules

- Every **product** URL includes a locale prefix.
- The product root layout **is** `src/app/[lang]/layout.tsx`. It owns `<html>` and `<body>` for locale routes. Do not add a second `src/app/layout.tsx` with those tags.
- `/dev` is a sibling root layout (`src/app/dev/layout.tsx`): English, noindex, no dark mode. Playground LTR/RTL sets `dir` on the preview Card only. Proxy does not locale-prefix it.
- `generateStaticParams` in the locale layout emits all locales from `src/i18n/config.ts`.
- Invalid `lang` values call `notFound()`.

## Where new code goes

| Kind | Location |
| --- | --- |
| Page / route | `src/app/[lang]/...` |
| Component lab route | `src/app/dev/...` (optional; dockerignoreable) |
| Lab chrome / meta / playground / gallery | `src/dev/` (optional; dockerignoreable) |
| Atom (button, card, input) | `src/components/ui/<name>/` |
| SVG icon / flag | `src/components/icons/` (`glyphs/` or `flags/`, then `registry.ts`) |
| Section or chrome (hero, header, footer) | `src/components/templates/<name>/` |
| User-facing string | `src/i18n/messages/*.json` (read via `getDictionary()`) |
| Locale list / direction | `src/i18n/config.ts` |
| Theme / app settings values | `src/settings/default.json` (read via `getSettings()`) |
| Shared helper | `src/lib/` |
| Static asset | `public/` |
| Cursor agent rules | `.cursor/rules/*.mdc` |
| Shared agent contract | `AGENTS.md` + `docs/agents.md` |
| Claude Code entry | `CLAUDE.md` |
