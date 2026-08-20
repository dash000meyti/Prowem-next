import { buttonColorValues, fieldSizeValues } from "@/dev/values";
import type { ComponentMeta } from "./types";

export const switchMeta = {
  name: "Switch",
  slug: "switch",
  kind: "ui",
  file: "src/components/ui/switch/switch.tsx",
  importStatement: 'import { Switch, switchVariants } from "@/components/ui/switch";',
  description:
    "Client toggle. role=switch. Thumb uses ms-auto when on so start/end follow dir. Color tokens tint the on track.",
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
      default: "md",
      description: "Track size.",
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
