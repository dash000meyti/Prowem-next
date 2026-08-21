# Content and settings

Copy and theme values are loaded through typed server APIs. Pages, templates, and UI never import JSON (or, later, a database). Swap the storage adapter inside the loaders only.

There is no SQLite, ORM, or admin UI in this phase.

## Public APIs

| Need | Call | Do not |
| --- | --- | --- |
| Page / chrome copy | `getDictionary()` / `getDictionaryByLocale()` from `@/i18n/get-dictionary` | Import `messages/*.json` in a page or component |
| Theme (colors, radius, border width, container max-widths) and header layout (`header.navFrom`) | `getSettings()` from `@/settings/get-settings` | Put hex, `rounded-[…]`, or raw `1px` in UI or templates |

`en.json` is still the compile-time `Dictionary` schema. JSON files are the current adapter, not a second public API.

UI and templates do not call `getSettings()`. They use Tailwind classes wired to the injected CSS variables (`bg-background`, `rounded-md`, `border-md`, `border-border`, `max-w-container-xl`). The locale layout passes `settings.header.navFrom` into `SiteHeader` as `navFrom`.

## What stays in code

Even after a SQLite adapter exists:

- Locale list, RTL, labels: [`src/i18n/config.ts`](../src/i18n/config.ts)
- Locale prefixing: [`src/proxy.ts`](../src/proxy.ts)
- Which variant a component uses by default (Button `radius` defaults to `full`)
- Breakpoint **widths**: [`src/app/globals.css`](../src/app/globals.css) `@theme --breakpoint-xs` … `--breakpoint-xl` (`2xl` is unset). `header.navFrom` only picks which named token SiteHeader uses (`xs`–`xl`); it does not change the pixel values. Keep those pixels the same as `theme.container` (`xs`–`xl`).
- Local fonts and the type scale: [`src/fonts/`](../src/fonts/) + type tokens in `globals.css`. Not part of `getSettings()`.

Proxy must resolve a locale synchronously without a database. Do not move `locales` into settings or SQLite without a confirmed architecture change.

## What may move to SQLite later

- Dictionary **values** (same `Dictionary` shape: `site`, `nav`, `home`, `notFound`, `metadata`, …)
- Settings **values** (same `Settings` shape: `theme.colors`, `theme.radius`, `theme.borderWidth`, `theme.container`, `header.navFrom`)

The swap points are `loadDictionaryFromJson` in [`src/i18n/get-dictionary.ts`](../src/i18n/get-dictionary.ts) and `loadSettingsFromJson` in [`src/settings/get-settings.ts`](../src/settings/get-settings.ts). Callers stay the same.

`getSettings()` always merges the overlay onto [`src/settings/default.json`](../src/settings/default.json). Missing keys keep the defaults.

## Settings files

| File | Role |
| --- | --- |
| `src/settings/types.ts` | `Settings` / `Theme` / `ThemeContainer` / `HeaderSettings` contract |
| `src/settings/default.json` | Current theme and header values (merge base) |
| `src/settings/merge.ts` | Deep-merge overlay onto defaults |
| `src/settings/get-settings.ts` | Server loader |
| `src/settings/css-vars.ts` | `toCssVars(theme)` for `<html style>` |

The locale layout injects CSS variables from `getSettings()`. [`src/app/globals.css`](../src/app/globals.css) keeps the variable names, `@theme inline` wiring, and fallbacks.

Token classes:

- Color: `bg-primary`, `text-primary-foreground`, `hover:bg-primary-hover`, `bg-primary-glow`, `bg-primary-shadow`, `bg-background`, `text-foreground`, `bg-panel`, `text-panel-foreground`, `hover:bg-panel-hover`, `border-border`, `bg-accent-1` … `bg-accent-4` (each with `-foreground`, `-hover`, `-glow`, `-shadow`), `bg-success`, `bg-warning`, `bg-error` (same suffixes)
- Radius: `rounded-none` `rounded-sm` `rounded-md` `rounded-lg` `rounded-full`
- Border width: `border-none` `border-sm` `border-md` `border-lg` (default chrome `border-md`)
- Container: `max-w-container-xs` `max-w-container-sm` `max-w-container-md` `max-w-container-lg` `max-w-container-xl` (`full` on Container is `max-w-none`)
- Fonts: `font-bebas-neue` `font-heebo` `font-ubuntu` `font-sans` (body default = Ubuntu); type scale `text-h1`…`text-h6` (+ `md:text-h*-md`), `text-body`, `text-label` / `text-label-md` / `text-label-sm`, `tracking-body`. When adding a new `text-*` size token, register it in `extendTailwindMerge` inside [`src/lib/cn.ts`](../src/lib/cn.ts) so `cn()` does not drop it next to `text-foreground` / other color utilities.

## Anti-patterns

```ts
// BAD — page reads storage
import en from "@/i18n/messages/en.json";
import theme from "@/settings/default.json";

// GOOD
const dict = await getDictionary();
const settings = await getSettings();
```

```tsx
// BAD — hex or arbitrary radius in UI
<button className="rounded-[10px] bg-[#171717]" />

// GOOD — token utilities / CVA radius
<button className={buttonVariants({ radius: "md" })} />
```

Do not add keys to `Settings` that nothing reads yet. Do not scatter hex in components.
