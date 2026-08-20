import { fieldSizeValues } from "@/dev/values";
import type { ComponentMeta } from "./types";

export const checkboxMeta = {
  name: "Checkbox",
  slug: "checkbox",
  kind: "ui",
  file: "src/components/ui/checkbox/checkbox.tsx",
  importStatement: 'import { Checkbox, checkboxVariants } from "@/components/ui/checkbox";',
  description: "Native checkbox. Token border and primary accent. Pair with Label.",
  rules: [
    "Keep this native. Pass checked and onChange from the parent.",
    "Use Label with htmlFor. Do not hardcode the caption inside Checkbox.",
  ],
  props: [
    {
      name: "checked",
      type: "boolean",
      default: true,
      description: "Checked state.",
      playground: true,
      group: "State",
    },
    {
      name: "size",
      type: "enum",
      values: [...fieldSizeValues],
      default: "md",
      description: "Box size.",
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
      description: "Merged onto the input with cn().",
      playground: false,
    },
  ],
} satisfies ComponentMeta;
