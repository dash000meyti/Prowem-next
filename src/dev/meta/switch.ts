import { buttonColorValues, fieldSizeValues, radiusValues } from "@/dev/values";
import type { ComponentMeta } from "./types";

export const switchMeta = {
  name: "Switch",
  slug: "switch",
  kind: "ui",
  file: "src/components/ui/switch/switch.tsx",
  importStatement: 'import { Switch, switchVariants } from "@/components/ui/switch";',
  description:
    "Client toggle. role=switch. Track has fixed sm inset outline (border token). Thumb when on: color glow; background track → foreground thumb, foreground track → background thumb. When off: border token fill.",
  rules: [
    "Use checked + onCheckedChange, or defaultChecked for uncontrolled.",
    "Pass the accessible name with aria-label or a Label. Do not hardcode copy inside Switch.",
    "Do not use left/right for the thumb — ms-auto is logical.",
  ],
  props: [
    {
      name: "checked",
      type: "boolean",
      default: true,
      description: "On state.",
      playground: true,
      group: "State",
    },
    {
      name: "color",
      type: "enum",
      values: [...buttonColorValues],
      default: "primary",
      description: "On-track color token.",
      playground: true,
      group: "Appearance",
    },
    {
      name: "size",
      type: "enum",
      values: [...fieldSizeValues],
      default: "lg",
      description: "Track size.",
      playground: true,
      group: "Appearance",
    },
    {
      name: "radius",
      type: "enum",
      values: [...radiusValues],
      default: "full",
      description: "Corner radius on track and thumb (theme.radius).",
      playground: true,
      group: "Appearance",
    },
    {
      name: "disabled",
      type: "boolean",
      default: false,
      description: "Disabled.",
      playground: true,
      group: "State",
    },
    {
      name: "className",
      type: "string",
      description: "Merged onto the button with cn().",
      playground: false,
    },
  ],
} satisfies ComponentMeta;
