# Components

Three layers. Do not mix their jobs.

| Layer | Path | Job |
| --- | --- | --- |
| **UI** | `src/components/ui/` | Atoms: look and interaction only |
| **Templates** | `src/components/templates/` | Compositions: header, later hero/footer |
| **Icons** | `src/components/icons/` | SVG glyphs and flags. No CVA, no copy, no routes |

UI never knows about locales, dictionaries, or routes. Templates may, but they still take copy as props instead of importing JSON. UI and Templates both import icons from `@/components/icons`. Do not put glyphs inside `ui/` or `templates/`.

The visual inventory is `/dev`: English docs, playgrounds (LTR/RTL and hatch controls on the preview Card), permutation galleries, and `/dev/test` (scratch sandbox in `src/dev/test/test-sandbox.tsx`). Routes live in `src/app/dev`; chrome, meta, playgrounds, and galleries live in `src/dev`. Product code must not import either folder. Same turn as UI / Templates / Icons / token/config updates: add or update `src/dev/meta`, the playground renderer, and the gallery. The lab shell uses `Container width="full"`. Lab copy is English in `src/dev/copy.ts`, not product dictionaries. There is no dark mode and no locale routing on `/dev`.

Playground meta props may set `group` (footer section label) and `dependsOn` (show the control only when another prop is active, e.g. border-light stop fields after a color is chosen). Components without groups keep a flat control grid.

Higher UI atoms compose lower ones. Do not copy chrome styles: Dropdown’s trigger is a Button and its open panel is a Card (`role="menu"`). SelectMenu and Combobox use the same field chrome as Select plus a Card listbox (`role="listbox"`) — do not use Dropdown as a select field. Combobox adds an Input search inside the panel. SideMenu’s panel is a Card (`SideMenuHeader` / `SideMenuContent` / `SideMenuFooter`). Popup is Card + Button (plus overlay). Alert is a Card. TabsTrigger is a Button. Tooltip’s panel is a Card. Card does not import Button or Dropdown; `CardFooter` is a layout slot.

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
6. Color, radius, and border width come from settings tokens. Use `rounded-none|xs|sm|md|lg|xl|full`, `border-none|sm|md|lg`, `border-border`, `bg-background`, `bg-panel`, `bg-primary`, `bg-accent-1`…`4`, `bg-success`, `bg-warning`, `bg-error`, and `*-foreground` / `*-hover` / `*-glow` / `*-shadow` (glow and shadow on action colors only). No hex and no `rounded-[…]`. UI does not import `getSettings()`.
7. Mobile-first. Base styles are the small screen. Scale up with `xs:` `sm:` `md:` `lg:` `xl:` from the theme breakpoints. Do not design desktop-only and patch later. Flex children that can shrink need `min-w-0`.

## UI inventory (phase 1)

### Button

`variant`: `filled` | `secondary` | `outline` | `soft` | `tinted` | `ghost` | `subtle` | `link` | `muted`  
`color`: `primary` (default) | `background` | `foreground` | `accent-1` | `accent-2` | `accent-3` | `accent-4` | `success` | `warning` | `error`  
`size`: `sm` | `md` | `lg` — fixed at all breakpoints: `sm` 32×12×14, `md` 34×14×16, `lg` 40×16×18 (height × horizontal padding × font, px)  
`font?`: catalog face (default `heeboRegular`; alternate label face `ubuntuMedium`; full catalog available)  
`radius`: `none` | `xs` | `sm` | `md` | `lg` | `xl` | `full` (default `full`)  
`icon?`: `IconName` from `@/components/icons`  
`iconPosition?`: `start` (default) | `end`  
Also: native `button` attributes (`disabled`, `type`, `onClick`, …). `color` tints `filled` / `outline` / `soft` / `tinted` / `ghost` / `subtle` / `link` / `muted`. `outline` and `soft` draw `border-border` inside the box (`shadow-outline-sm`, width `sm`) so they do not add width. `tinted` matches `soft` (text, hover tint, quiet glow on `:active` / `aria-expanded`) but the inset border uses the `color` token (`shadow-outline-sm-*`) instead of `border-border`. `filled` and `outline` hover with a `*-glow` halo (`shadow-glow-*`, including `background` / `foreground`); `:active` has no glow. `secondary` / `soft` / `tinted` / `ghost` / `subtle` use a quieter `shadow-glow-sm-*` halo (18% / 14% mix vs filled’s 35% / 28%) on `:active` and `aria-expanded` (Dropdown / SideMenu stay glowing while open). `soft` rest matches `outline`; hover tints with `color` like `secondary` (`*-hover/20`). `secondary` rest is panel; hover tints with `color` like ghost (`*-hover/20`). `ghost` rest uses the `color` text. `subtle` rest uses `text-panel-foreground` like secondary, then hover tints and recolors like ghost. `link` tints the text on hover and uses `*-hover/20` (or `background` / `foreground` at `/20`) on `:active` and `aria-expanded`. `muted` matches `link` but rest text is `text-panel-foreground` like subtle.

Icon-only (`icon` and no label): equal padding, same height as `size` (`sm`: `size-8`; `md`: `size-[34px]`; `lg`: `size-10`), with CVA compounds that zero horizontal padding. Icon + text: normal button height, icon `size-4`, `gap-2`.

`buttonVariants()` is exported for non-button elements (language menu rows). Button and Card share `theme.radius`: `none` | `xs` | `sm` | `md` | `lg` | `xl` | `full` (`rounded-none` … `rounded-full`).

### Card

Compound atom: `Card`, `CardHeader`, `CardContent` (main), `CardFooter`. No copy, no Button import. `cardVariants()`, `cardHeaderVariants()`, `cardContentVariants()`, and `cardFooterVariants()` are exported. Header and Footer are layout slots: put children in them (text, buttons, anything).

Root `Card`:

- `surface`: `panel` (default) | `glass`
- `lightBottom` / `lightTop` / `lightStart` / `lightEnd`: `none` (default) | same as Button (`primary`, `background`, `foreground`, `accent-1`…`4`, `success`, `warning`, `error`)
- `borderLightBottom` / `borderLightTop` / `borderLightStart` / `borderLightEnd`: `none` (default) | same colors as lights. Fade along that box-border edge. Needs `border` other than `none`. Start/end follow `dir`.
- `borderLightTopStart` / `borderLightTopCenter` / `borderLightTopEnd`, `borderLightBottomStart` / `borderLightBottomCenter` / `borderLightBottomEnd`, `borderLightStartStart` / `borderLightStartCenter` / `borderLightStartEnd`, `borderLightEndStart` / `borderLightEndCenter` / `borderLightEndEnd`: numeric stop percentages for each edge gradient. Defaults are `10` / `50` / `90`.
- `padding`: `none` | `sm` | `md` | `lg` (default `none`)
- `radius`: `none` | `xs` | `sm` | `md` | `lg` | `xl` | `full` (default `lg`)
- `border`: `none` | `sm` | `md` | `lg` (default `sm`)
- `borderColor`: `border` (default) | action colors at 20% (`primary`, `background`, `foreground`, `accent-1`…`4`, `success`, `warning`, `error`) | same colors at full opacity with an `Active` suffix (`primaryActive`, `accent-1Active`, …)
- Also native `div` attributes and `className?`

`surface` is only the fill: `panel` uses `--panel`; `glass` is the stuck-header mix (`panel` at 72% when unlit, 42% when any light is on) plus `backdrop-blur-sm`. Lights are independent ellipse glows (18% mix) on `bg-card-spots`. `lightStart` / `lightEnd` follow `dir` (not `left` / `right`). `borderLight*` overlays a fade on the existing box border (`card-border-lights` pseudo, same `--card-border-width`, follows `radius`); solid `borderColor` stays. The border-light stop props control where that fade starts, peaks, and ends on each edge; omitted props fall back to `10` / `50` / `90`. Old names map as: `light` → `lightBottom="primary"`; `glass-light` → `surface="glass"` + `lightBottom="primary"`; `light-dual` → `lightBottom="primary"` + `lightTop="foreground"`; `glass-light-dual` → the same lights on `glass`. Root has `overflow-hidden` so slot fills and gradients clip to radius. Root paints its box border from `--card-border-width` and `--card-border-color` (same vars Header/Footer edges inherit). Do not use the Tailwind `border` shorthand with `border-sm|md|lg` — that shorthand also sets width to 1px and wins over the token.

`CardHeader` / `CardFooter` `variant`: `none` (default) | `filled` (`bg-panel-hover/50`) | `border` (header bottom edge, footer top edge) | `divider` (`filled` + `border`). Those `border` / `divider` lines use the parent Card’s `border` width and `borderColor`; slots do not take those props. `border` insets the line on both inline sides by the slot’s `padding` (`none` stays full width; `md` matches `p-4`). `divider` keeps the line full-bleed at every padding. Fill stays full-bleed. `CardContent` has no variant yet.

`CardHeader` `underline`: `none` (default) | same colors as lights. Bar on the lowest edge of the header (`::before`). Logical `start` inset matches the slot padding (`none` → `start-0`, `md` → `start-4`). Stacks with `variant` `border` / `divider` (those keep the full-width `::after` edge). `PopupHeader` / `SideMenuHeader` inherit these props.

- `underlineSize`: `sm` | `md` (default) | `lg` — height from `theme.borderWidth` (`1px` / `2px` / `3px`)
- `underlineWidth`: `fix` (default, `50px`) | `25` (`25%`) | `50` (`50%`) | `75` (`75%`)

Slot `padding`: `none` | `sm` | `md` | `lg` (default `md` = `p-4`) on Header, Content, and Footer. Header and Footer take their content height (`shrink-0`). `CardContent` fills the leftover space (`flex-1 min-h-0`).

### Dropdown

Props: `icon?` (`IconName`), `trigger?` (text or node), `children`, `label`, `variant?` (same as Button, default `soft`), `color?` (same as Button, default `primary`), `size?` (same as Button, default `md`), `align?` (`start` | `end`, default `end`), `className?`.
Client atom. No copy, no routing. Closed/open, click-outside, and Escape live here. The trigger is a Button: `icon` alone uses icon-only square padding; `trigger` alone keeps normal button height; both render icon + text. The panel is an empty `Card` (`surface="panel"`, `padding="none"`, default `radius`, `role="menu"`). `dropdownPanelVariants()` is position and fade only (`absolute`, `align`, `p-1`, `300ms`). Chrome comes from Card. This is a menu, not a select field — use Select, SelectMenu, or Combobox for choosing a value.

### SideMenu

Compound atom: `SideMenu`, `SideMenuHeader`, `SideMenuContent`, `SideMenuFooter`. `sideMenuPanelVariants()` is exported.  
Props on the root: `icon?` (`IconName`), `trigger?` (text or node), `children`, `label`, `closeLabel`, `variant?` (`filled` | `secondary` | `outline` | `soft` | `tinted` | `link` | `muted`, default `outline`), `color?` (same as Button, default `primary`), `side?` (`start` | `end`, default `end`), `className?`. No `footer` prop — pin actions with `SideMenuFooter`.  
Client atom. No copy, no routing. Overlay, Escape, and the close control live here (close is rendered by `SideMenuHeader`). The trigger is a Button like Dropdown. The panel is a `Card` (`surface="glass"`, `lightBottom="primary"`, `lightTop="foreground"`, `padding="none"`, `radius="none"`) `fixed` from `start` or `end` (logical, RTL-safe), `w-80 max-w-full`. Header / Content / Footer are Card slots: Header default `variant="border"` and includes the close button; Content fills leftover space; Footer default `variant="border"`. Overlay uses `bg-background/72` plus `backdrop-blur-xs` (half of Card glass `backdrop-blur-sm`). Overlay and panel fade/slide in `300ms` (`duration-300`). Portal to `document.body` so sticky headers do not clip it.

### Container

`width`: `xs` | `sm` | `md` | `lg` | `xl` | `full` (`full` is `max-w-none`; others use `max-w-container-*` from `theme.container`)  
`padding`: `none` | `sm` | `md` | `lg` (each step is already viewport-scaled, e.g. default `md` is `px-4 md:px-6 lg:px-8`)  
Use as the page/section shell. Horizontal padding is symmetric (`px-*`), which is RTL-safe. `min-w-0` is on the root so flex layouts can shrink.

### Heading

`level`: `1` | `2` | `3` | `4` | `5` | `6` (renders `h1`–`h6`; **size follows the site type scale** for that level — not a size prop)  
`font?`: catalog face (`bebasNeueRegular` | `heeboRegular` | `heeboBold` | `ubuntuLight` | `ubuntuMedium`; default `bebasNeueRegular`)  
`tone`: `default` | `muted`  
No subtitle slot. Pass supporting copy as a sibling `Text`. Leave the scale with `className` only. `headingVariants()` is exported.

### Text

`as?`: `p` (default) | `span`  
`variant`: `body` | `muted` | `caption` | `overline` | `code`  
`font?`: same catalog as Heading (full set). `body` / `muted` default to `ubuntuLight` and the site body scale (`text-body` + `tracking-body`).  
No heading sizes — use Heading for those. `variant="code"` is inline mono unless `font` is set; use `Code` `display="block"` for a snippet panel. `textVariants()` is exported.

### List

`as?`: `ul` | `ol` (defaults to `ol` when `marker="decimal"`, otherwise `ul`)  
`marker`: `disc` (default) | `decimal` | `none`  
`gap`: `sm` | `md` (default `md`)  
Children are `li` nodes. No ListItem atom. `listVariants()` is exported.

### Table

Compound atom: `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`. No caption. Root wraps the table with overflow clip, `radius` (default `md`), and `border-md border-border`. Header uses `bg-panel-hover` with `text-panel-foreground`. Body rows alternate `background` / `panel` with matching foreground tokens. Body rows get a top edge. `tableWrapVariants()`, `tableVariants()`, and slot helpers are exported.

### Code

`display`: `inline` (default) | `block`  
Inline is a `code` tag. Block is `pre > code` with `bg-panel`, token border, `p-4`, `font-mono text-xs`. `codeVariants()` is exported.

### Label

Native `label`. `size`: `sm` | `md` | `lg` (default `md`). Type: `sm` 14px, `md` 16px, `lg` 20px (previous `md`). `font?`: same catalog (default `heeboBold`). Pair with `htmlFor`. `labelVariants()` is exported.

### Input

Native text field. Native `size` is omitted so the design `size` can use that name.  
`size`: `sm` | `md` | `lg` — same control height and type as Button (`32/14`, `34/16`, `40/18` px); horizontal padding `12` / `14` / `16`  
`radius`: `none` | `xs` | `sm` | `md` | `lg` | `xl` | `full` (default `sm`)  
Fill is `bg-panel` with `text-panel-foreground`. Placeholders use Heebo Regular at the body size (shared `fieldBoxClass`). The `sm` `border` edge is drawn inside the box (`shadow-outline-sm`) so it does not add width — same as Button `outline` / `soft`. Do not use the Tailwind `border` shorthand. `inputVariants()` is exported. Other native input attributes pass through.

### Select

Native `<select>`. Same panel fill and `shadow-outline-sm` edge as Input. Same `size` height/type scale as Button/Input (default radius `sm`); end padding leaves room for the chevron. Native arrow is replaced with a `chevron-down` Icon inset on the logical `end` (`appearance-none`). Options are `option` children. Not a custom listbox. Do not replace this with Dropdown (Dropdown is a menu). Use SelectMenu for a Card listbox, Combobox when that list needs in-panel search. `selectVariants()` is exported.

### SelectMenu

Client listbox field. Same field chrome and end chevron as Select; the trigger is a field button, not a Dropdown Button. Panel is a Card (`surface="panel"`, `padding="none"`) with `dropdownPanelVariants` for position and fade.

`items`: `{ value: string; label: string; disabled?: boolean }[]`  
`value` / `defaultValue` / `onValueChange`  
`placeholder` / `label` (accessible name; from the parent)  
`size` / `radius` (default `sm`) / `disabled` / `align` (`start` | `end`, default `start`)

Rows use `buttonVariants({ variant: "ghost" | "subtle", size: "sm" })` (`subtle` when selected). `role="listbox"` / `option`. Enter, ArrowUp/Down, Home/End, Escape, and click-outside live here. `className` merges onto the field wrapper. `selectMenuTriggerVariants()` and `selectMenuPanelVariants()` are exported.

### Combobox

SelectMenu plus search **inside the panel** (an Input above the list, not typing on the trigger). The trigger still shows the selected label. Client filter on `label`. Search does not change `value` until a row is chosen. Same `items` / `value` / `onValueChange` contract as SelectMenu. `searchLabel` and `emptyLabel` come from the parent. `comboboxTriggerVariants()` and `comboboxPanelVariants()` are exported.

### Checkbox

Native checkbox. `size`: `sm` | `md` | `lg` (default `md`). Token border and `accent-primary`. Pair with Label. `checkboxVariants()` is exported.

### Textarea

Native multiline field. Same panel fill and `shadow-outline-sm` edge as Input. Same `size` type scale as Button/Input (`14` / `16` / `18`) and matching padding; `radius` shared (default `sm`). Padding is on all sides (`p-*`) so the resize handle sits inset by the same amount as the start. `min-h-20` instead of Button height. `className` merges onto the chrome wrapper; native attributes go on the `textarea`. `textareaVariants()` is exported.

### Switch

Client toggle (`role="switch"`). `checked?` + `onCheckedChange?`, or `defaultChecked` for uncontrolled.  
`color`: same as Button (tints the on track)  
`size`: `sm` | `md` | `lg` (default `md`)  
The thumb uses `ms-auto` when on so start/end follow `dir`. `switchVariants()` is exported.

### Separator

`orientation`: `horizontal` (default) | `vertical`. Fills with `bg-border`. `separatorVariants()` is exported.

### Badge

`variant`: `filled` | `outline` | `soft` | `muted`  
`color`: same as Button  
`size`: `sm` (default) | `md`  
`radius`: `none` | `xs` | `sm` | `md` | `lg` | `xl` | `full` (default `full`)  
No title slot. Pass the label as children. `badgeVariants()` is exported.

### Tabs

Compound client atom: `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`.  
`defaultValue?` or controlled `value` + `onValueChange?`. `TabsList` is `w-full`; each `TabsTrigger` shares width equally (`flex-1 basis-0`). Props: `variant?` (`segmented` default | `underline`), `surface?` (`none` | `panel`, default `panel`), `borderColor?` (Card tokens, default `border`), `color?` (Button color, default `primary`), `radius?` (segmented: trigger + outer list; underline: top corners of list only; default `sm`). **segmented:** panel chrome, active `filled`, inactive `subtle`. **underline:** bottom border only. Inset `gap-1 px-1 pt-1 pb-0` (same as segmented except no bottom padding). Triggers `rounded-t-*` + flat bottom from `radius`. List top outer radius = trigger radius + `p-1`. `underlineSize?` (`sm` | `md` | `lg`, default `md`). Active `ghost` + underline on bottom border; inactive `subtle`. `TabsTrigger` accepts `size?`. `tabsListVariants()` is exported. Do not restyle a second tab chrome.

### Alert

Status panel. Card underneath (`padding="md"`, optional `borderColor`).  
`color?`: same as Card `borderColor` (default `border`)  
`icon?`: `IconName`  
No `AlertTitle` / `AlertDescription` — children are the message. Put a Heading inside children if you need one.

### Tooltip

Client hover/focus hint. Portal + Card (`padding="sm"`).  
`content`, `children` (the trigger), `side?`: `top` (default) | `bottom` | `start` | `end`  
`start` / `end` follow `dir`. No collision flip or overflow shifting — keep content short. Delay 200ms.

### Popup

Compound client atom: `Popup`, `PopupHeader`, `PopupContent`, `PopupFooter`. `popupPanelVariants()` is exported.  
Props on the root: `icon?` (`IconName`), `trigger?` (text or node), `children`, `label`, `closeLabel`, `variant?` (same as SideMenu trigger, default `outline`), `color?` (same as Button, default `primary`), `card?` (`none` | `main`, default `main`), `size?` (`sm` | `md` | `lg` | `full`, default `sm`), `className?`.  
The trigger is a Button like Dropdown / SideMenu. Overlay matches SideMenu (`bg-background/72 backdrop-blur-xs`, `duration-300`). The panel is a centered Card (`padding="none"`) portaled to `document.body`.

`size` sets panel max width one container step smaller than the name: `sm` → `max-w-container-xs`, `md` → `max-w-container-sm`, `lg` → `max-w-container-md`, `full` → `max-w-none` (still inset by the overlay `p-4`).

`card="main"` applies `surface="glass"`, `lightBottom="primary"`, `lightTop="foreground"`, `border="md"`, `borderLightTop="foreground"`, `borderLightBottom="primary"`, defaults `PopupHeader` `underline` to `primary`, and defaults Header / Footer `variant` to `none` (all overridable). `card="none"` keeps a plain Card and defaults Header / Footer `variant` to `border`.

Header / Content / Footer are Card slots: Header includes the close button. Escape, overlay click, and a light focus trap live here.

## Icons inventory (phase 1)

Public API: `<Icon name="close" className="size-5" />`. Names live in `src/components/icons/registry.ts`.

Linear glyphs only (`viewBox="0 0 24 24"`, `stroke="currentColor"`, `strokeWidth={1.5}`, round caps). Draw our own paths — do not copy Iconsax files. Bold/Broken styles are later.

Current names: `close`, `menu`, `info`, `chevron-up`, `chevron-down`, `flag-en`, `flag-de`, `flag-pt`, `flag-es`, `flag-ar`. Flags keep their own fills (national colors, not theme tokens). `Icon` clips flags with `overflow-hidden rounded-full`.

## Template inventory (phase 1)

### SiteHeader

Props: `siteName`, `nav` (`Dictionary["nav"]`), `currentLocale`, `navFrom` (named theme breakpoint from `settings.header.navFrom`), `className?`.  
Composes `Container` + locale-prefixed nav links + a `soft` Dropdown language menu (current locale flag `Icon`; rows are flag + native name from `localeMeta`; choosing a row swaps the locale segment with `replaceLocaleInPathname`) + filled Get Started `Button`. The home link shows the brand wordmark (`/logo.svg`, displayed at `h-[1.44rem]` / 0.72 of `h-8`) with `siteName` as the image `alt`. Destinations are `/`, `/my-event-app`, `/my-broadcast`, `/my-socialmedia`, `/my-club`, `/event-team`, `/login` under the current locale; pages can be added later on those routes. Each nav item is `variant="subtle"` with a fixed `color`: Home `primary`, My Event-App `accent-1`, My Broadcast `accent-4`, My Socialmedia `accent-3`, My Club `accent-2`, Prowem Event Team `primary`, Login `foreground` (last in the list). The current page is `disabled` (`aria-current="page"`). From `navFrom` the links follow the wordmark at the start of the bar and Get Started stays a filled primary CTA after the language menu. Below that breakpoint a `secondary` `menu` SideMenu (`side="end"`) holds the same nav items in `SideMenuContent` at default Button size; Get Started leaves the bar and is composed in `SideMenuFooter`. Default `navFrom` in settings is `xl` (1440px). At the top of the page it is `h-20` with no background and a transparent bottom edge. After `8px` of scroll it sticks (`sticky top-0 z-40`) at `h-18` with `bg-panel/72 backdrop-blur-sm` and `border-border`. SideMenu overlay/panel stay `z-50` so the open drawer stacks above the bar. The bottom edge stays `border-b border-md` in both states so the color can fade in over `300ms`; an `h-2` spacer keeps layout from jumping. It returns to the tall transparent bar when `scrollY` is `0`.

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
4. Keep routing details inside the template only when they are the template’s job (e.g. SiteHeader locale prefix swap).
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
      <Dropdown label={nav.language} icon="flag-en" variant="soft">
        {/* locale rows */}
      </Dropdown>
      <Button>{nav.getStarted}</Button>
    </header>
  );
}
```

Changing `ButtonProps` / `SiteHeaderProps` (rename, remove, break callers) needs user confirmation. Adding optional `className` that already exists is not a change.

## What not to add yet

Hero, footer, Bold/Broken icon styles, and Prowem marketing sections wait for later phases. Header nav labels are in `SiteHeader`; destination pages are not.
