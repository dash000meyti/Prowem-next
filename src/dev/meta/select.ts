import { fieldSizeValues, radiusValues, selectOptionValues } from "@/dev/values";
import type { ComponentMeta } from "./types";

export const selectMeta = {
  name: "Select",
  slug: "select",
  kind: "ui",
  file: "src/components/ui/select/select.tsx",
  importStatement: 'import { Select, selectVariants } from "@/components/ui/select";',
  description:
    "Native select. Same height and radius scale as Input. Not a custom listbox — options are option children.",
  rules: [
    "Keep this native. Do not replace it with Dropdown unless the product needs a custom listbox.",
    "Pass option children from the parent. Labels come from the parent.",
    "Heights match Button / Input (sm / md / lg). Default radius is md.",
  ],
  props: [
    {
      name: "value",
      type: "enum",
      values: [...selectOptionValues],
      default: "one",
      description: "Selected option.",
      playground: true,
      group: "Demo",
    },
    {
      name: "size",
      type: "enum",
      values: [...fieldSizeValues],
      default: "md",
      description: "Height aligned with Button.",
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
      name: "disabled",
      type: "boolean",
      default: false,
      description: "Native disabled.",
      playground: true,
      group: "State",
    },
    {
      name: "className",
      type: "string",
      description: "Merged onto the select with cn().",
      playground: false,
    },
  ],
} satisfies ComponentMeta;
