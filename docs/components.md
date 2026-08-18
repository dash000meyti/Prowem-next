# Components

Three layers. Do not mix their jobs.

| Layer | Path | Job |
| --- | --- | --- |
| **UI** | `src/components/ui/` | Atoms: look and interaction only |
| **Templates** | `src/components/templates/` | Compositions: header, switcher, later hero/footer |
| **Icons** | `src/components/icons/` | SVG glyphs and flags. No CVA, no copy, no routes |

UI never knows about locales, dictionaries, or routes. Templates may, but they still take copy as props instead of importing JSON. UI and Templates both import icons from `@/components/icons`. Do not put glyphs inside `ui/` or `templates/`.

The visual inventory is `/dev`: English docs, playgrounds (LTR/RTL and hatch controls on the preview Card), and permutation galleries. Routes live in `src/app/dev`; chrome, meta, playgrounds, and galleries live in `src/dev`. Product code must not import either folder. Same turn as UI / Templates / Icons / token/config updates: add or update `src/dev/meta`, the playground renderer, and the gallery. The lab shell uses `Container width="full"`. Lab copy is English in `src/dev/copy.ts`, not product dictionaries. There is no dark mode and no locale routing on `/dev`.

Higher UI atoms compose lower ones. Do not copy chrome styles: Dropdown’s trigger is a Button and its open panel is a Card. A later Popup should be Card + Button (plus overlay). Card does not import Button or Dropdown; `CardFooter` is a layout slot.

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
6. Color, radius, and border width come from settings tokens. Use `rounded-none|sm|md|lg|full`, `border-none|sm|md|lg`, `border-border`, `bg-background`, `bg-panel`, `bg-primary`, `bg-accent-1`…`4`, `bg-success`, `bg-warning`, `bg-error`, and `*-foreground` / `*-hover` / `*-glow` / `*-shadow` (glow and shadow on action colors only). No hex and no `rounded-[…]`. UI does not import `getSettings()`.
7. Mobile-first. Base styles are the small screen. Scale up with `xs:` `sm:` `md:` `lg:` `xl:` from the theme breakpoints. Do not design desktop-only and patch later. Flex children that can shrink need `min-w-0`.

## UI inventory (phase 1)

### Button

`variant`: `filled` | `secondary` | `outline` | `soft` | `ghost` | `subtle` | `link` | `muted`  
`color`: `primary` (default) | `background` | `foreground` | `accent-1` | `accent-2` | `accent-3` | `accent-4` | `success` | `warning` | `error`  
`size`: `sm` | `md` | `lg`  
`radius`: `none` | `sm` | `md` | `lg` | `full` (default `full`)  
`icon?`: `IconName` from `@/components/icons`  
`iconPosition?`: `start` (default) | `end`  
Also: native `button` attributes (`disabled`, `type`, `onClick`, …). `color` tints `filled` / `outline` / `soft` / `ghost` / `subtle` / `link` / `muted`. `outline` and `soft` draw `border-border` inside the box (`shadow-outline-sm`, width `sm`) so they do not add width. `filled` and `outline` hover with a `*-glow` halo (`shadow-glow-*`, including `background` / `foreground`); `:active` has no glow. `secondary` / `soft` / `ghost` / `subtle` use a quieter `shadow-glow-sm-*` halo (18% / 14% mix vs filled’s 35% / 28%) on `:active` and `aria-expanded` (Dropdown / SideMenu stay glowing while open). `soft` rest matches `outline`; hover tints with `color` like `secondary` (`*-hover/20`). `secondary` rest is panel; hover tints with `color` like ghost (`*-hover/20`). `ghost` rest uses the `color` text. `subtle` rest uses `text-panel-foreground` like secondary, then hover tints and recolors like ghost. `link` tints the text on hover and uses `*-hover/20` (or `background` / `foreground` at `/20`) on `:active` and `aria-expanded`. `muted` matches `link` but rest text is `text-panel-foreground` like subtle.

Icon-only (`icon` and no label): equal padding, same height as `size` (`sm`: `size-8`; `md`: `size-9 md:size-10`; `lg`: `size-10 md:size-12`), with CVA compounds that zero `md:px-*`. Icon + text: normal button height, icon `size-4`, `gap-2`.

`buttonVariants()` is exported for non-button elements (language menu rows). Button and Card share `theme.radius`: `none` | `sm` | `md` | `lg` | `full` (`rounded-none` … `rounded-full`).

### Card

Compound atom: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` (main), `CardFooter`. No copy, no Button import. `cardVariants()`, `cardHeaderVariants()`, `cardContentVariants()`, and `cardFooterVariants()` are exported.

Root `Card`:

- `surface`: `panel` (default) | `glass`
- `lightBottom` / `lightTop` / `lightStart` / `lightEnd`: `none` (default) | same as Button (`primary`, `background`, `foreground`, `accent-1`…`4`, `success`, `warning`, `error`)
- `padding`: `none` | `sm` | `md` | `lg` (default `none`)
- `radius`: `none` | `sm` | `md` | `lg` | `full` (default `md`)
- `border`: `none` | `sm` | `md` | `lg` (default `md`)
- `borderColor`: `border` (default) | same as Button (`primary`, `background`, `foreground`, `accent-1`…`4`, `success`, `warning`, `error`)
- Also native `div` attributes and `className?`

`surface` is only the fill: `panel` uses `--panel`; `glass` is the stuck-header mix (`panel` at 72% when unlit, 42% when any light is on) plus `backdrop-blur-sm`. Lights are independent ellipse glows (18% mix) on `bg-card-spots`. `lightStart` / `lightEnd` follow `dir` (not `left` / `right`). Old names map as: `light` → `lightBottom="primary"`; `glass-light` → `surface="glass"` + `lightBottom="primary"`; `light-dual` → `lightBottom="primary"` + `lightTop="foreground"`; `glass-light-dual` → the same lights on `glass`. Root has `overflow-hidden` so slot fills and gradients clip to radius. Root paints its box border from `--card-border-width` and `--card-border-color` (same vars Header/Footer edges inherit). Do not use the Tailwind `border` shorthand with `border-sm|md|lg` — that shorthand also sets width to 1px and wins over the token.

`CardHeader` / `CardFooter` `variant`: `none` | `filled` (`bg-panel-hover/50`) | `border` (default; header bottom edge, footer top edge) | `divider` (`filled` + `border`). Those `border` / `divider` lines use the parent Card’s `border` width and `borderColor`; slots do not take those props. The line is inset on both inline sides by the slot’s `padding` (`none` stays full width; `md` matches `p-4`). Fill stays full-bleed. `CardContent` has no variant yet.

Slot `padding`: `none` | `sm` | `md` | `lg` (default `md` = `p-4`) on Header, Content, and Footer. Title and Description have no padding of their own. Header and Footer take their content height (`shrink-0`). `CardContent` fills the leftover space (`flex-1 min-h-0`).

### Dropdown

Props: `icon?` (`IconName`), `trigger?` (text or node), `children`, `label`, `variant?` (same as Button, default `soft`), `color?` (same as Button, default `primary`), `align?` (`start` | `end`, default `end`), `className?`.  
Client atom. No copy, no routing. Closed/open, click-outside, and Escape live here. The trigger is a Button: `icon` alone uses icon-only square padding; `trigger` alone keeps normal button height; both render icon + text. The panel is an empty `Card` (`surface="panel"`, `padding="none"`, default `radius`). `dropdownPanelVariants()` is position and fade only (`absolute`, `align`, `p-1`, `300ms`). Chrome comes from Card.

### SideMenu

Props: `icon?` (`IconName`), `trigger?` (text or node), `children`, `label`, `closeLabel`, `footer?`, `variant?` (`filled` | `secondary` | `outline` | `soft` | `link` | `muted`, default `outline`), `color?` (same as Button, default `primary`), `side?` (`start` | `end`, default `end`), `className?`.  
Client atom. No copy, no routing. Overlay, Escape, and the close control live here. The trigger is a Button like Dropdown. The panel is `fixed` `bg-panel` from `start` or `end` (logical, RTL-safe), `w-80 max-w-full`, with a `close` icon button. Optional `footer` stays pinned to the bottom of the panel. Overlay and panel fade/slide in `300ms` (`duration-300`). Portal to `document.body` so sticky headers do not clip it.

### Container

`width`: `xs` | `sm` | `md` | `lg` | `xl` | `full` (`full` is `max-w-none`; others use `max-w-container-*` from `theme.container`)  
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

Props: `siteName`, `nav` (`Dictionary["nav"]`), `currentLocale`, `navFrom` (named theme breakpoint from `settings.header.navFrom`), `className?`.  
Composes `Container` + locale-prefixed nav links + `LanguageSwitcher` + filled Get Started `Button`. The home link shows the brand wordmark (`/logo.svg`, displayed at `h-[1.44rem]` / 0.72 of `h-8`) with `siteName` as the image `alt`. Destinations are `/`, `/my-event-app`, `/my-broadcast`, `/my-socialmedia`, `/my-club`, `/event-team`, `/login` under the current locale; pages can be added later on those routes. Each nav item is `variant="subtle"` with a fixed `color`: Home `primary`, My Event-App `accent-1`, My Broadcast `accent-4`, My Socialmedia `accent-3`, My Club `accent-2`, Prowem Event Team `primary`, Login `foreground` (last in the list). The current page is `disabled` (`aria-current="page"`). From `navFrom` the links follow the wordmark at the start of the bar and Get Started stays a filled primary CTA after the language switcher. Below that breakpoint a `secondary` `menu` SideMenu (`side="end"`) holds the same nav items at default Button size; Get Started leaves the bar and is pinned in the SideMenu `footer`. Default `navFrom` in settings is `xl` (1440px). At the top of the page it is `h-20` with no background and a transparent bottom edge. After `8px` of scroll it sticks (`sticky top-0`) at `h-18` with `bg-panel/72 backdrop-blur-sm` and `border-border`. The bottom edge stays `border-b border-md` in both states so the color can fade in over `300ms`; an `h-2` spacer keeps layout from jumping. It returns to the tall transparent bar when `scrollY` is `0`.

## Checklist: add a UI component

1. Create `src/components/ui/<name>/<name>.tsx` with `cva` variants and a typed props object extending the native element props.
2. Export from `index.ts`: component, variants, props type.
3. Use `cn()` for `className`.
4. Add a short entry to this file.
5. Do not add the component unless a template or page will use it in the same change.
6. Same turn: `src/dev/meta/<name>.ts` (register in `src/dev/meta/index.ts`), a playground renderer in `src/dev/playground/renderers.tsx`, and a permutation gallery in `src/dev/gallery` when the component has variants. The page is `/dev/components/[slug]` from meta — do not hardcode a new route.

## Checklist: add an icon

1. Linear glyph: add `src/components/icons/glyphs/<name>.tsx` using `Glyph` (`viewBox="0 0 24 24"`, stroke `currentColor`, width 1.5, round caps). Flag: add to `src/components/icons/flags/flags.tsx` with its own fills.
2. Register the name in `src/components/icons/registry.ts`. Flag names start with `flag-`.
3. Do not add unused glyphs. Do not copy third-party icon files.
4. Confirm it appears in `/dev/icons` (the grid reads `iconRegistry`).

## Checklist: add a template

1. Create `src/components/templates/<name>/`.
2. Compose existing UI. Add a new UI primitive first if the template would otherwise duplicate atom styles.
3. Accept all copy and locale as props.
4. Keep routing details inside the template only when they are the template’s job (e.g. language switching).
5. Same turn: `src/dev/meta/<name>.ts` (register in `src/dev/meta/index.ts`), a playground renderer, and a gallery. The page is `/dev/templates/[slug]` from meta.

## Responsive (first layer)

Every UI, template, and page is mobile-first. Breakpoint **widths** live in [`src/app/globals.css`](../src/app/globals.css) (`--breakpoint-xs` … `--breakpoint-xl`). They stay in CSS, not settings/SQLite: media queries cannot take runtime CSS variables. Container **max-widths** (`theme.container`) live in settings and must use the same pixel values as those breakpoints (`full` is Container-only, `100%`). There is no `2xl`.

| Prefix | Width |
| --- | --- |
| (base) | < 480px |
| `xs` | 480px |
| `sm` | 720px |
| `md` | 980px |
| `lg` | 1200px |
| `xl` | 1440px |

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
      <Link href={`/${currentLocale}`}>
        <Image src="/logo.svg" alt={siteName} width={972} height={177} unoptimized />
      </Link>
      <LanguageSwitcher currentLocale={currentLocale} label={nav.language} />
      <Button>{nav.getStarted}</Button>
    </header>
  );
}
```

Changing `ButtonProps` / `SiteHeaderProps` (rename, remove, break callers) needs user confirmation. Adding optional `className` that already exists is not a change.

## What not to add yet

Hero, footer, Bold/Broken icon styles, and Prowem marketing sections wait for later phases. Header nav labels are in `SiteHeader`; destination pages are not.
