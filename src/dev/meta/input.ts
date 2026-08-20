import { fieldSizeValues, radiusValues } from "@/dev/values";
import type { ComponentMeta } from "./types";

export const inputMeta = {
  name: "Input",
  slug: "input",
  kind: "ui",
  file: "src/components/ui/input/input.tsx",
  importStatement: 'import { Input, inputVariants } from "@/components/ui/input";',
  description:
    "Native text field. Heights match Button (sm / md / lg). Radius tokens default to md. Fill is panel. The sm border is shadow-outline-sm (inside the box, border color). Native size is omitted so the design size can use that name.",
  rules: [
    "Pass placeholder and value from the parent. Do not hardcode copy inside Input.",
    "Use Label with htmlFor. Do not restyle a second text field.",
    "Tokens only: bg-panel and shadow-outline-sm. Do not use the border shorthand.",
    "Native type, disabled, and other input attributes pass through.",
  ],
  props: [
    {
      name: "value",
      type: "string",
      default: "Preview",
      description: "Field value.",
      playground: true,
      group: "Demo",
    },
    {
      name: "placeholder",
      type: "string",
      default: "Type here",
      description: "Placeholder when empty.",
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
      description: "Merged onto the input with cn().",
      playground: false,
    },
  ],
} satisfies ComponentMeta;
