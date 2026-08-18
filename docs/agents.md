# Agent guides (Cursor and Claude)

This repo is edited by **Cursor** agents and **Claude Code**. Both must follow the same product rules. Tool-specific files only change *how* those rules are loaded.

## Who reads what

| Tool | Auto-loaded | Then read |
| --- | --- | --- |
| **Cursor** | [AGENTS.md](../AGENTS.md), [`.cursor/rules/*.mdc`](../.cursor/rules/) | This file, then the topic docs below |
| **Claude Code** | [CLAUDE.md](../CLAUDE.md) (includes AGENTS.md) | This file, then the topic docs below |

Do not keep a second copy of architecture, i18n, or component contracts in the tool files. Those live in `docs/`. If a rule in `.cursor/rules/` disagrees with `docs/`, `docs/` plus AGENTS.md win — then fix **both** tool surfaces in the same change.

## Keep Cursor and Claude in lockstep

The team uses both tools. Agent guides must stay the same shape and move together.

- **One contract.** Product rules live in `docs/` + [AGENTS.md](../AGENTS.md). Cursor `.mdc` files and [CLAUDE.md](../CLAUDE.md) are short loaders/summaries of that contract, not a second architecture.
- **Never update only one tool.** If workflow, i18n, components, routing, phase, or Next.js notes change, update the shared doc **and** both entries in the same turn.
- **Same sections, same meaning.** CLAUDE.md (`Before you write code`, `Workflow`, `Layout`) must stay aligned with Cursor always-on rules (`core.mdc`, `workflow.mdc`) plus the topic `.mdc` files. Do not add a Claude-only or Cursor-only product rule.

| If you change | Also update in the same turn |
| --- | --- |
| Workflow / confirmation / docs-after-change | `AGENTS.md`, `CLAUDE.md` Workflow, `.cursor/rules/workflow.mdc` |
| Component lab (`/dev`) | `docs/components.md`, `.cursor/rules/lab.mdc`, `.cursor/rules/workflow.mdc` |
| Scope, phase, Next.js 16 traps | `docs/agents.md`, `AGENTS.md`, `CLAUDE.md`, `.cursor/rules/core.mdc` |
| Component / Icons contract | `docs/components.md`, `.cursor/rules/components.mdc` (and `CLAUDE.md` Layout if the summary changed) |
| i18n / locale config | `docs/i18n.md`, `.cursor/rules/i18n.mdc` (and `CLAUDE.md` Layout if the summary changed) |
| Copy / settings loaders | `docs/content.md`, `.cursor/rules/settings.mdc` (and `CLAUDE.md` Layout if the summary changed) |
| App Router / Proxy / `<html>` | `docs/architecture.md`, `.cursor/rules/app-router.mdc` (and `CLAUDE.md` Layout if the summary changed) |
| This pairing map itself | `docs/agents.md`, `AGENTS.md`, `CLAUDE.md` |

Done means a developer on Claude Code and a developer on Cursor would read the same rules.

## Read order (every non-trivial task)

1. [AGENTS.md](../AGENTS.md) — workflow, scope, Next.js 16 notes
2. This file
3. [architecture.md](architecture.md) — folders and request flow
4. Topic doc: [i18n.md](i18n.md), [content.md](content.md), [components.md](components.md), or [phases.md](phases.md)
5. The matching guide under `node_modules/next/dist/docs/` for **this** Next.js version (not training data)

Skip ahead only for a one-line typo with no structural effect.

## Workflow (do not wait for the user to repeat this)

- **Confirm first** if the change touches: folder tree, UI / Templates / Icons split, existing component prop APIs, `src/i18n/config.ts`, locale routing, or new architectural dependencies. Present recommendation, advantages, risks, alternatives. Implement only after yes.
- **Just do it** if the work stays inside the contract: tokens, dictionary keys with the same schema, a new glyph in `src/components/icons/`, a new UI/Template that follows [components.md](components.md).
- **Update docs** in the same change when behavior, folders, components, phase, or i18n rules changed. Update Cursor and Claude summaries together. If nothing changed, do not touch docs.
- **Keep `/dev` in sync** in the same change when UI, Templates, Icons, tokens, or component config changed (`/dev/ui`, `/dev/templates`, `/dev/icons`). Lab chrome is full-width (`Container width="full"`).

## Next.js 16 traps (this repo)

Wrong answers from older training data. Prefer `node_modules/next/dist/docs/`.

| Do not | Do |
| --- | --- |
| `middleware.ts` | [`src/proxy.ts`](../src/proxy.ts) |
| `next-intl` / `next-i18next` | JSON dictionaries via `getDictionary()` + `[lang]` |
| Root `src/app/layout.tsx` with `<html>` | [`src/app/[lang]/layout.tsx`](../src/app/[lang]/layout.tsx) owns `<html>` / `<body>` |
| `getDictionary()` in a Client Component | Pass strings and `currentLocale` as props |
| `PageProps` without the route | `LayoutProps<'/[lang]'>` / `PageProps<'/[lang]'>` |
| `left` / `right` / `ml-` / `pl-` | `start` / `end` / `ms-` / `ps-` / `text-start` |

## Output quality checklist

Before finishing a task:

1. No hardcoded user-facing copy. No hex or `rounded-[…]` in UI or templates (`getSettings()` / token classes).
2. New UI lives under `src/components/ui/<name>/` with `index.ts`, exported props type, `className` + `cn()`, `cva` variants if it has variants. New glyphs/flags live under `src/components/icons/` and are registered in `registry.ts`.
3. New chrome/sections live under `src/components/templates/<name>/` and compose UI.
4. Every locale JSON still matches `en.json` (`assert-complete.ts`).
5. Phase 1 does not add Prowem marketing sections, brand fonts, or unused placeholders.
6. Layouts are mobile-first and do not assume a desktop width.
7. Docs updated only if the contract or inventory changed.
8. Cursor and Claude surfaces still match (see lockstep table above). If you touched one, you touched the other.
9. `src/app/dev` galleries still match the inventory (UI / tokens, templates, icons).

## Cursor rules map

| File | When |
| --- | --- |
| `workflow.mdc` | Always |
| `core.mdc` | Always |
| `lab.mdc` | Always (`/dev` gallery sync) |
| `components.mdc` | `src/components/**` |
| `i18n.mdc` | `src/i18n/**` |
| `settings.mdc` | `src/settings/**` |
| `app-router.mdc` | `src/app/**` |
