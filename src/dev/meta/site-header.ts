import { breakpointValues, localeValues } from "@/dev/values";
import type { ComponentMeta } from "./types";

export const siteHeaderMeta = {
  name: "SiteHeader",
  slug: "site-header",
  kind: "template",
  file: "src/components/templates/site-header/site-header.tsx",
  importStatement: 'import { SiteHeader } from "@/components/templates/site-header";',
  description:
    "Composes Container, locale-prefixed nav, LanguageSwitcher, Get Started Button, and a SideMenu below navFrom. Copy and locale arrive as props.",
  rules: [
    "Pass siteName, nav, currentLocale, and navFrom. Do not import dictionaries inside the template.",
    "navFrom is a named breakpoint from settings.header.navFrom, not a pixel value in the template.",
    "The home link is the wordmark (/logo.svg) with siteName as alt.",
    "Do not put lab chrome in SiteHeader.",
  ],
  props: [
    {
      name: "siteName",
      type: "string",
      default: "Prowem",
      description: "Wordmark alt text.",
      playground: true,
    },
    {
      name: "currentLocale",
      type: "enum",
      values: [...localeValues],
      default: "en",
      description: "Locale prefix for nav hrefs.",
      playground: true,
    },
    {
      name: "navFrom",
      type: "enum",
      values: [...breakpointValues],
      default: "xl",
      description: "Breakpoint where desktop nav replaces the hamburger.",
      playground: true,
    },
    {
      name: "className",
      type: "string",
      description: "Merged onto the root with cn().",
      playground: false,
    },
  ],
} satisfies ComponentMeta;
