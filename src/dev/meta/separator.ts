import { separatorOrientationValues } from "@/dev/values";
import type { ComponentMeta } from "./types";

export const separatorMeta = {
  name: "Separator",
  slug: "separator",
  kind: "ui",
  file: "src/components/ui/separator/separator.tsx",
  importStatement: 'import { Separator, separatorVariants } from "@/components/ui/separator";',
  description: "Horizontal or vertical rule using the border color token.",
  rules: [
    "orientation start/end is not used — this is a box edge, so horizontal | vertical.",
    "Do not draw separators with leftover Card borders when a rule is enough.",
  ],
  props: [
    {
      name: "orientation",
      type: "enum",
      values: [...separatorOrientationValues],
      default: "horizontal",
      description: "Axis of the rule.",
      playground: true,
      group: "Appearance",
    },
    {
      name: "className",
      type: "string",
      description: "Merged onto the root with cn().",
      playground: false,
    },
  ],
} satisfies ComponentMeta;
