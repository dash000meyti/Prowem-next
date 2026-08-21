import { alignValues, fieldSizeValues, radiusValues, selectOptionValues } from "@/dev/values";
import type { ComponentMeta } from "./types";

export const selectMenuMeta = {
  name: "SelectMenu",
  slug: "select-menu",
  kind: "ui",
  file: "src/components/ui/select-menu/select-menu.tsx",
  importStatement:
    'import { SelectMenu, selectMenuTriggerVariants } from "@/components/ui/select-menu";',
  description:
    "Client listbox field. Same chrome as Select, panel is a Card. Closed/open, click-outside, Escape, and arrow keys live here. Not a Dropdown — that atom is a menu.",
  rules: [
    "Use this when the product needs a custom listbox. Keep native Select for real option children. Do not use Dropdown as a select field (Dropdown is role=menu).",
    "Pass items, value/onValueChange or defaultValue, and label/placeholder from the parent. No copy inside the atom.",
    "Rows are ghost Buttons (subtle when selected). The panel is Card (surface panel, padding none) plus dropdownPanelVariants for position.",
    "className merges onto the field wrapper, like Select.",
  ],
  props: [
    {
      name: "value",
      type: "enum",
      values: [...selectOptionValues],
      default: "one",
      description: "Selected item value. Playground remounts via defaultValue.",
      playground: true,
      group: "Demo",
    },
    {
      name: "placeholder",
      type: "string",
      default: "Choose",
      description: "Shown when nothing is selected.",
      playground: true,
      group: "Demo",
    },
    {
      name: "label",
      type: "string",
      default: "Choose",
      description: "Accessible name for the trigger and listbox.",
      playground: true,
      group: "Demo",
    },
    {
      name: "size",
      type: "enum",
      values: [...fieldSizeValues],
      default: "md",
      description: "Height and type aligned with Button (32/14, 34/16, 40/18).",
      playground: true,
      group: "Appearance",
    },
    {
      name: "radius",
      type: "enum",
      values: [...radiusValues],
      default: "md",
      description: "Token radius.",
      playground: true,
      group: "Appearance",
    },
    {
      name: "align",
      type: "enum",
      values: [...alignValues],
      default: "start",
      description: "Panel alignment on the logical start/end axis.",
      playground: true,
      group: "Panel",
    },
    {
      name: "disabled",
      type: "boolean",
      default: false,
      description: "Disables the trigger.",
      playground: true,
      group: "State",
    },
    {
      name: "className",
      type: "string",
      description: "Merged onto the field wrapper with cn().",
      playground: false,
    },
  ],
} satisfies ComponentMeta;
