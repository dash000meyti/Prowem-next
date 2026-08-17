# Components

Three layers. Do not mix their jobs.

| Layer | Path | Job |
| --- | --- | --- |
| **UI** | `src/components/ui/` | Atoms: look and interaction only |
| **Templates** | `src/components/templates/` | Compositions: header, switcher, later hero/footer |
| **Icons** | `src/components/icons/` | SVG glyphs and flags. No CVA, no copy, no routes |

UI never knows about locales, dictionaries, or routes. Templates may, but they still take copy as props instead of importing JSON. UI and Templates both import icons from `@/components/icons`. Do not put glyphs inside `ui/` or `templates/`.

The visual inventory is `src/app/dev` (`/dev/ui`, `/dev/templates`, `/dev/icons`). Keep those galleries complete in the same change as UI, Templates, Icons, or token/config updates.

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
6. Color, radius, and border width come from settings tokens. Use `rounded-sm|md|lg|xl|full`, `border-sm|md|lg`, `border-border`, `bg-background`, `bg-panel`, `bg-primary`, `bg-accent-1`…`4`, `bg-success`, `bg-warning`, `bg-error`, and `*-foreground` / `*-hover` / `*-glow` / `*-shadow` (glow and shadow on action colors only). No hex and no `rounded-[…]`. UI does not import `getSettings()`.
7. Mobile-first. Base styles are the small screen. Scale up with `sm:` `md:` `lg:` from the theme breakpoints. Do not design desktop-only and patch later. Flex children that can shrink need `min-w-0`.

## UI inventory (phase 1)

### Button

`variant`: `filled` | `secondary` | `outline` | `soft` | `ghost` | `subtle` | `link`  
`color`: `background` | `foreground` | `primary` (default) | `accent-1` | `accent-2` | `accent-3` | `accent-4` | `success` | `warning` | `error`  
`size`: `sm` | `md` | `lg` (`link` drops the box height, keeps the same horizontal padding)  
`radius`: `sm` | `md` | `lg` | `xl` | `full` (default `full`)  
`icon?`: `IconName` from `@/components/icons`  
`iconPosition?`: `start` (default) | `end`  
Also: native `button` attributes (`disabled`, `type`, `onClick`, …). `color` tints `filled` / `outline` / `soft` / `ghost` / `subtle` / `link`. `outline` and `soft` draw `border-border` inside the box (`shadow-outline`) so they do not add width. `filled` and `outline` hover with a `*-glow` halo (`shadow-glow-*`, including `background` / `foreground`); `:active` has no glow. `soft` rest matches `outline`; hover tints with `color` like `secondary` (`*-hover/20`), with no glow. `secondary` rest is panel; hover tints with `color` like ghost (`*-hover/20`). `ghost` rest uses the `color` text. `subtle` rest uses `text-panel-foreground` like secondary, then hover tints and recolors like ghost.

Icon-only (`icon` and no label): equal padding, same height as `size` (`sm`: `size-8`; `md`: `size-9 md:size-10`; `lg`: `size-10 md:size-12`), with CVA compounds that zero `md:px-*`. Icon + text: normal button height, icon `size-4`, `gap-2`.

`buttonVariants()` is exported for non-button elements (language menu rows). Future Card (and other chrome) must reuse this same `radius` scale — do not invent a second set.

### Dropdown

Props: `icon?` (`IconName`), `trigger?` (text or node), `children`, `label`, `variant?` (`filled` | `secondary` | `outline` | `soft` | `link`, default `outline`), `color?` (same as Button, default `primary`), `align?` (`start` | `end`, default `end`), `className?`.  
Client atom. No copy, no routing. Closed/open, click-outside, and Escape live here. The trigger is a Button: `icon` alone uses icon-only square padding; `trigger` alone keeps normal button height; both render icon + text. Panel uses `bg-panel border-sm border-border rounded-lg` and fades open/closed in `300ms` (`duration-300`).

### Container

`width`: `sm` | `md` | `lg` | `full` (`full` is `max-w-none`)  
`padding`: `none` | `sm` | `md` | `lg` (each step is already viewport-scaled, e.g. default `md` is `px-4 md:px-6 lg:px-8`)  
Use as the page/section shell. Horizontal padding is symmetric (`px-*`), which is RTL-safe. `min-w-0` is on the root so flex layouts can shrink.

## Icons inventory (phase 1)

Public API: `<Icon name="close" className="size-5" />`. Names live in `src/components/icons/registry.ts`.

Linear glyphs only (`viewBox="0 0 24 24"`, `stroke="currentColor"`, `strokeWidth={1.5}`, round caps). Draw our own paths — do not copy Iconsax files. Bold/Broken styles are later.

Current names: `close`, `menu`, `chevron-up`, `chevron-down`, `flag-en`, `flag-de`, `flag-pt`, `flag-es`, `flag-ar`. Flags keep their own fills (national colors, not theme tokens). `Icon` clips flags with `overflow-hidden rounded-full`.

## Template inventory (phase 1)

### LanguageSwitcher

Props: `currentLocale`, `label`, `className?`.  
Client component. Trigger is a `soft` Dropdown with the current locale’s flag `Icon` (no custom `trigger`). Menu rows use `<Icon name={…} />` plus the native name. Choosing a row swaps the locale segment with `replaceLocaleInPathname`. Labels come from `localeMeta`, not from dictionaries.

### SiteHeader

Props: `siteName`, `nav` (`Dictionary["nav"]`), `currentLocale`, `className?`.  
Composes `Container` + locale-prefixed nav links + `LanguageSwitcher` + filled Get Started `Button`. Destinations are `/`, `/my-event-app`, `/my-broadcast`, `/my-socialmedia`, `/my-club`, `/event-team`, `/login` under the current locale; pages can be added later on those routes. Each nav item is `variant="subtle"` with a fixed `color`: Home `primary`, My Event-App `accent-1`, My Broadcast `accent-4`, My Socialmedia `accent-3`, My Club `accent-2`, Prowem Event Team `primary`, Login `foreground` (last in the list). The current page is `disabled` (`aria-current="page"`). Get Started stays a filled primary CTA after the language switcher. From `lg` the links follow the site name at the start of the bar. Below `lg` a `secondary` `menu` Dropdown holds the same items. At the top of the page it is `h-20` with no background and a transparent bottom edge. After `8px` of scroll it sticks (`sticky top-0`) at `h-18` with `bg-panel` and `border-border`. The bottom edge stays `border-b border-sm` in both states so the color can fade in over `300ms`; an `h-2` spacer keeps layout from jumping. It returns to the tall transparent bar when `scrollY` is `0`.

## Checklist: add a UI component

1. Create `src/components/ui/<name>/<name>.tsx` with `cva` variants and a typed props object extending the native element props.
2. Export from `index.ts`: component, variants, props type.
3. Use `cn()` for `className`.
4. Add a short entry to this file.
5. Do not add the component unless a template or page will use it in the same change.
6. Show it in `src/app/dev/ui` in the same turn.

## Checklist: add an icon

1. Linear glyph: add `src/components/icons/glyphs/<name>.tsx` using `Glyph` (`viewBox="0 0 24 24"`, stroke `currentColor`, width 1.5, round caps). Flag: add to `src/components/icons/flags/flags.tsx` with its own fills.
2. Register the name in `src/components/icons/registry.ts`. Flag names start with `flag-`.
3. Do not add unused glyphs. Do not copy third-party icon files.
4. Confirm it appears in `src/app/dev/icons` (the grid reads `iconRegistry`).

## Checklist: add a template

1. Create `src/components/templates/<name>/`.
2. Compose existing UI. Add a new UI primitive first if the template would otherwise duplicate atom styles.
3. Accept all copy and locale as props.
4. Keep routing details inside the template only when they are the template’s job (e.g. language switching).
5. Preview it in `src/app/dev/templates` in the same turn.

## Responsive (first layer)

Every UI, template, and page is mobile-first. Breakpoints live in [`src/app/globals.css`](../src/app/globals.css) (`--breakpoint-sm` … `--breakpoint-2xl`). They stay in CSS, not settings/SQLite: media queries cannot take runtime CSS variables.

| Prefix | Width |
| --- | --- |
| (base) | < 40rem |
| `sm` | 40rem |
| `md` | 48rem |
| `lg` | 64rem |
| `xl` | 80rem |
| `2xl` | 96rem |

Write the small-screen layout first, then `md:` / `lg:`. Do not use `max-*` as the default approach. Do not assume a desktop header height or a single-line toolbar.

## Styling helpers

```ts
import { cn } from "@/lib/cn";
```

`cn` is `clsx` + `tailwind-merge`. Always merge inbound `className` last.

## Anti-patterns (agents)

```tsx
// BAD — hardcoded copy, physical CSS, hex / arbitrary radius
import { getDictionary } from "@/i18n/get-dictionary";
export async function Button() {
  const dict = await getDictionary();
  return <button className="ml-4 rounded-[10px] bg-[#171717]">{dict.nav.language}</button>;
}

// GOOD — UI is copy-agnostic; parent passes children/text; tokens via CVA
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
export function SiteHeader({ siteName, nav, currentLocale }: SiteHeaderProps) {
  return (
    <header>
      <p>{siteName}</p>
      <LanguageSwitcher currentLocale={currentLocale} label={nav.language} />
      <Button>{nav.getStarted}</Button>
    </header>
  );
}
```

Changing `ButtonProps` / `SiteHeaderProps` (rename, remove, break callers) needs user confirmation. Adding optional `className` that already exists is not a change.

## What not to add yet

Hero, footer, cards, Bold/Broken icon styles, and Prowem marketing sections wait for later phases. Header nav labels are in `SiteHeader`; destination pages are not.
