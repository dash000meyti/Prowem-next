# Content and settings

Copy and theme values are loaded through typed server APIs. Pages, templates, and UI never import JSON (or, later, a database). Swap the storage adapter inside the loaders only.

There is no SQLite, ORM, or admin UI in this phase.

## Public APIs

| Need | Call | Do not |
| --- | --- | --- |
| Page / chrome copy | `getDictionary()` / `getDictionaryByLocale()` from `@/i18n/get-dictionary` | Import `messages/*.json` in a page or component |
| Theme (colors) | `getSettings()` from `@/settings/get-settings` | Put hex values in UI or templates |

`en.json` is still the compile-time `Dictionary` schema. JSON files are the current adapter, not a second public API.

## What stays in code

Even after a SQLite adapter exists:

- Locale list, RTL, labels: [`src/i18n/config.ts`](../src/i18n/config.ts)
- Locale prefixing: [`src/proxy.ts`](../src/proxy.ts)

Proxy must resolve a locale synchronously without a database. Do not move `locales` into settings or SQLite without a confirmed architecture change.

## What may move to SQLite later

- Dictionary **values** (same `Dictionary` shape: `site`, `nav`, `home`, `notFound`, `metadata`, …)
- Settings **values** (same `Settings` shape: `theme.colors` today)

The swap points are `loadDictionaryFromJson` in [`src/i18n/get-dictionary.ts`](../src/i18n/get-dictionary.ts) and `loadSettingsFromJson` in [`src/settings/get-settings.ts`](../src/settings/get-settings.ts). Callers stay the same.

## Settings files

| File | Role |
| --- | --- |
| `src/settings/types.ts` | `Settings` / `Theme` contract |
| `src/settings/default.json` | Current theme values |
| `src/settings/get-settings.ts` | Server loader |
| `src/settings/css-vars.ts` | `toCssVars(theme)` for `<html style>` |

The locale layout injects CSS variables from `getSettings()`. [`src/app/globals.css`](../src/app/globals.css) keeps the variable names, `@theme inline` wiring, and hex fallbacks. Components keep using Tailwind tokens (`bg-background`, `text-foreground`).

## Anti-patterns

```ts
// BAD — page reads storage
import en from "@/i18n/messages/en.json";
import theme from "@/settings/default.json";

// GOOD
const dict = await getDictionary();
const settings = await getSettings();
```

Do not add keys to `Settings` that nothing reads yet. Do not scatter hex in components.
