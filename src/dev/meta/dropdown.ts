import {
  alignValues,
  buttonColorValues,
  buttonVariantValues,
  iconPlaygroundValues,
} from "@/dev/values";
import type { ComponentMeta } from "./types";

export const dropdownMeta = {
  name: "Dropdown",
  slug: "dropdown",
  kind: "ui",
  file: "src/components/ui/dropdown/dropdown.tsx",
  importStatement: 'import { Dropdown } from "@/components/ui/dropdown";',
  description:
    "Client atom. Button trigger plus an empty Card panel. Closed/open, click-outside, and Escape live here. No copy, no routing.",
  rules: [
    "The trigger is a Button. icon alone is icon-only; trigger alone keeps normal height; both render icon + text.",
    "The panel is Card (surface panel, padding none). Do not restyle a second panel.",
    "align is start|end (logical), default end.",
    "Pass menu rows as children. Labels come from the parent.",
    "This is a menu (role=menu), not a select field. Use Select, SelectMenu, or Combobox to choose a value.",
  ],
  props: [
    {
      name: "trigger",
      type: "string",
      default: "Menu",
      description: "Trigger label (or a node in real use).",
      playground: true,
      group: "Demo",
    },
    {
      name: "icon",
      type: "enum",
      values: [...iconPlaygroundValues],
      default: "",
      description: "Optional IconName on the trigger.",
      playground: true,
      group: "Trigger",
    },
    {
      name: "variant",
      type: "enum",
      values: [...buttonVariantValues],
      default: "soft",
      description: "Button variant for the trigger.",
      playground: true,
      group: "Trigger",
    },
    {
      name: "color",
      type: "enum",
      values: [...buttonColorValues],
      default: "primary",
      description: "Button color for the trigger.",
      playground: true,
      group: "Trigger",
    },
    {
      name: "align",
      type: "enum",
      values: [...alignValues],
      default: "end",
      description: "Panel alignment on the logical start/end axis.",
      playground: true,
      group: "Panel",
    },
    {
      name: "label",
      type: "string",
      default: "Menu",
      description: "Accessible name for the trigger.",
      playground: true,
      group: "Demo",
    },
    {
      name: "className",
      type: "string",
      description: "Merged onto the root with cn().",
      playground: false,
    },
  ],
} satisfies ComponentMeta;
