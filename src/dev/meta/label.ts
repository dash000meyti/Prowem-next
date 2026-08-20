import { labelSizeValues } from "@/dev/values";
import type { ComponentMeta } from "./types";

export const labelMeta = {
  name: "Label",
  slug: "label",
  kind: "ui",
  file: "src/components/ui/label/label.tsx",
  importStatement: 'import { Label, labelVariants } from "@/components/ui/label";',
  description: "Native label. Pair with htmlFor on Input, Select, Checkbox, or Textarea.",
  rules: [
    "Pass the caption as children. Do not hardcode copy inside Label.",
    "Use htmlFor to point at the control id.",
  ],
  props: [
    {
      name: "children",
      type: "string",
      default: "Label",
      description: "Label text.",
      playground: true,
      group: "Demo",
    },
    {
      name: "size",
      type: "enum",
      values: [...labelSizeValues],
      default: "md",
      description: "Type size.",
      playground: true,
      group: "Appearance",
    },
    {
      name: "className",
      type: "string",
      description: "Merged onto the label with cn().",
      playground: false,
    },
  ],
} satisfies ComponentMeta;
