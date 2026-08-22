import { fieldSizeValues, radiusValues } from "@/dev/values";
import type { ComponentMeta } from "./types";

export const textareaMeta = {
  name: "Textarea",
  slug: "textarea",
  kind: "ui",
  file: "src/components/ui/textarea/textarea.tsx",
  importStatement: 'import { Textarea, textareaVariants } from "@/components/ui/textarea";',
  description:
    "Native multiline field. Same panel fill and sm inset border as Input. Padding is on every side so the resize handle is inset like the start. min-h-20 instead of Button height.",
  rules: [
    "Pass placeholder and value from the parent. Do not hardcode copy inside Textarea.",
    "Placeholders use Heebo Regular at the body size (same as Input).",
    "Use Label with htmlFor.",
    "Tokens only: bg-panel and shadow-outline-sm. className merges onto the chrome wrapper.",
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
      description: "Type and padding.",
      playground: true,
      group: "Appearance",
    },
    {
      name: "radius",
      type: "enum",
      values: [...radiusValues],
      default: "sm",
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
      description: "Merged onto the textarea with cn().",
      playground: false,
    },
  ],
} satisfies ComponentMeta;
