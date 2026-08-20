import { cardBorderColorValues, iconPlaygroundValues } from "@/dev/values";
import type { ComponentMeta } from "./types";

export const alertMeta = {
  name: "Alert",
  slug: "alert",
  kind: "ui",
  file: "src/components/ui/alert/alert.tsx",
  importStatement: 'import { Alert } from "@/components/ui/alert";',
  description:
    "Status panel. Card underneath (padding md, optional borderColor). No AlertTitle / AlertDescription — children are the message.",
  rules: [
    "Compose Card. Do not copy Card chrome.",
    "Pass the message as children. Optional icon is an IconName.",
    "No title slot. Put a Heading inside children if you need one.",
  ],
  props: [
    {
      name: "children",
      type: "string",
      default: "Use this for a short status message.",
      description: "Alert body.",
      playground: true,
      group: "Demo",
    },
    {
      name: "color",
      type: "enum",
      values: [...cardBorderColorValues],
      default: "border",
      description: "Card borderColor.",
      playground: true,
      group: "Appearance",
    },
    {
      name: "icon",
      type: "enum",
      values: [...iconPlaygroundValues],
      default: "info",
      description: "Optional IconName.",
      playground: true,
      group: "Appearance",
    },
    {
      name: "className",
      type: "string",
      description: "Merged onto the Card with cn().",
      playground: false,
    },
  ],
} satisfies ComponentMeta;
