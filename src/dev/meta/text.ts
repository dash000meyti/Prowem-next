import { textAsValues, textVariantValues } from "@/dev/values";
import type { ComponentMeta } from "./types";

export const textMeta = {
  name: "Text",
  slug: "text",
  kind: "ui",
  file: "src/components/ui/text/text.tsx",
  importStatement: 'import { Text, textVariants } from "@/components/ui/text";',
  description:
    "Body copy, muted intros, captions, overlines, and inline code. No heading sizes — use Heading for those.",
  rules: [
    "as is p or span. Default p.",
    "variant code is inline. Use Code display=block for a snippet panel.",
    "Pass copy as children. Do not hardcode strings inside Text.",
  ],
  props: [
    {
      name: "children",
      type: "string",
      default: "Short supporting copy for the lab.",
      description: "Text content.",
      playground: true,
      group: "Demo",
    },
    {
      name: "variant",
      type: "enum",
      values: [...textVariantValues],
      default: "body",
      description: "Visual role.",
      playground: true,
      group: "Appearance",
    },
    {
      name: "as",
      type: "enum",
      values: [...textAsValues],
      default: "p",
      description: "Element tag.",
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
