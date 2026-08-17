# Components

Two layers. Do not mix their jobs.

| Layer | Path | Job |
| --- | --- | --- |
| **UI** | `src/components/ui/` | Atoms: look and interaction only |
| **Templates** | `src/components/templates/` | Compositions: header, switcher, later hero/footer |

UI never knows about locales, dictionaries, or routes. Templates may, but they still take copy as props instead of importing JSON.

## Folder contract

Each component is a folder:

```text
src/components/ui/button/
  button.tsx     Implementation + variants + props type
  index.ts       Public exports
```

Import the folder, not the inner file:

```ts
import { Button, buttonVariants } from "@/components/ui/button";
```

## Required props pattern

1. Explicit props type exported next to the component (`ButtonProps`, `SiteHeaderProps`, …).
2. `className?: string` on every visual component, merged with `cn()`.
3. Variants via `cva` from `class-variance-authority`. Export `*Variants` so templates can reuse styles on `Link` or other tags.
4. No user-facing English (or any language) inside UI or templates. Parents pass strings.
5. Prefer logical CSS utilities.

## UI inventory (phase 1)

### Button

`variant`: `primary` | `secondary` | `ghost`  
`size`: `sm` | `md` | `lg`  
Also: native `button` attributes (`disabled`, `type`, `onClick`, …).

`buttonVariants()` is exported for non-button elements (language links).

### Container

`width`: `sm` | `md` | `lg`  
`padding`: `none` | `sm` | `md` | `lg`  
Use as the page/section shell. Horizontal padding is symmetric (`px-*`), which is RTL-safe.

## Template inventory (phase 1)

### LanguageSwitcher

Props: `currentLocale`, `label`, `className?`.  
Client component. Replaces the first locale segment with `replaceLocaleInPathname`. Renders locale labels from `localeMeta`, not from dictionaries.

### SiteHeader

Props: `siteName`, `languageLabel`, `currentLocale`, `className?`.  
Composes `Container` + `LanguageSwitcher`. Visual design is a temporary bar; replace styling in a later phase without changing the props contract if possible.

## Checklist: add a UI component

1. Create `src/components/ui/<name>/<name>.tsx` with `cva` variants and a typed props object extending the native element props.
2. Export from `index.ts`: component, variants, props type.
3. Use `cn()` for `className`.
4. Add a short entry to this file.
5. Do not add the component unless a template or page will use it in the same change.

## Checklist: add a template

1. Create `src/components/templates/<name>/`.
2. Compose existing UI. Add a new UI primitive first if the template would otherwise duplicate atom styles.
3. Accept all copy and locale as props.
4. Keep routing details inside the template only when they are the template’s job (e.g. language switching).

## Styling helpers

```ts
import { cn } from "@/lib/cn";
```

`cn` is `clsx` + `tailwind-merge`. Always merge inbound `className` last.

## Anti-patterns (agents)

```tsx
// BAD — hardcoded copy, physical CSS, UI imports dictionary
import { getDictionary } from "@/i18n/get-dictionary";
export async function Button() {
  const dict = await getDictionary();
  return <button className="ml-4">{dict.nav.language}</button>;
}

// GOOD — UI is copy-agnostic; parent passes children/text
export function Button({ className, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants(), className)} {...props} />;
}
```

```tsx
// BAD — template with strings baked in
export function SiteHeader() {
  return <header>Prowem</header>;
}

// GOOD — props from the layout dictionary
export function SiteHeader({ siteName, languageLabel, currentLocale }: SiteHeaderProps) {
  return (
    <header>
      <p>{siteName}</p>
      <LanguageSwitcher currentLocale={currentLocale} label={languageLabel} />
    </header>
  );
}
```

Changing `ButtonProps` / `SiteHeaderProps` (rename, remove, break callers) needs user confirmation. Adding optional `className` that already exists is not a change.

## What not to add yet

Hero, footer, cards, nav menus, icons, and Prowem sections wait for later phases. Phase 1 only locks the pattern.
