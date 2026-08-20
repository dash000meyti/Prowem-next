import {
  badgeVariantValues,
  buttonColorValues,
  fieldSizeValues,
  radiusValues,
} from "@/dev/values";
import type { ComponentMeta } from "./types";

export const badgeMeta = {
  name: "Badge",
  slug: "badge",
  kind: "ui",
  file: "src/components/ui/badge/badge.tsx",
  importStatement: 'import { Badge, badgeVariants } from "@/components/ui/badge";',
  description:
    "Compact status chip. variant filled | outline | soft | muted and the same color tokens as Button. No title slot.",
  rules: [
    "Pass the label as children. Do not hardcode copy inside Badge.",
    "Color tokens only — no hex.",
  ],
  props: [
    {
      name: "children",
      type: "string",
      default: "Badge",
      description: "Badge label.",
      playground: true,
      group: "Demo",
    },
    {
      name: "variant",
      type: "enum",
      values: [...badgeVariantValues],
      default: "filled",
      description: "Visual style.",
      playground: true,
      group: "Appearance",
    },
    {
      name: "color",
      type: "enum",
      values: [...buttonColorValues],
      default: "primary",
      description: "Action color token.",
      playground: true,
      group: "Appearance",
    },
    {
      name: "size",
      type: "enum",
      values: [...fieldSizeValues].filter((value) => value !== "lg"),
      default: "sm",
      description: "Type and padding.",
      playground: true,
      group: "Appearance",
    },
    {
      name: "radius",
      type: "enum",
      values: [...radiusValues],
      default: "full",
      description: "Token radius.",
      playground: true,
      group: "Appearance",
    },
    {
      name: "className",
      type: "string",
      description: "Merged onto the span with cn().",
      playground: false,
    },
  ],
} satisfies ComponentMeta;
