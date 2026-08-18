import { localeValues } from "@/dev/values";
import type { ComponentMeta } from "./types";

export const languageSwitcherMeta = {
  name: "LanguageSwitcher",
  slug: "language-switcher",
  kind: "template",
  file: "src/components/templates/language-switcher/language-switcher.tsx",
  importStatement:
    'import { LanguageSwitcher } from "@/components/templates/language-switcher";',
  description:
    "Client template. Soft Dropdown with the current locale flag. Choosing a row swaps the locale segment with replaceLocaleInPathname. Labels come from localeMeta, not dictionaries.",
  rules: [
    "Pass currentLocale and label as props. Do not import message JSON here.",
    "On /dev this control still navigates to locale-prefixed product URLs.",
    "The trigger is a Dropdown; do not restyle a second language menu.",
  ],
  props: [
    {
      name: "currentLocale",
      type: "enum",
      values: [...localeValues],
      default: "en",
      description: "Active locale code.",
      playground: true,
    },
    {
      name: "label",
      type: "string",
      default: "Language",
      description: "Accessible name for the nav.",
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
