import { fontFaceLabels, fontFaceValues } from "@/fonts";
import { textAsValues, textVariantValues } from "@/dev/values";
import type { ComponentMeta } from "./types";

export const textMeta = {
  name: "Text",
  slug: "text",
  kind: "ui",
  file: "src/components/ui/text/text.tsx",
  importStatement: 'import { Text, textVariants } from "@/components/ui/text";',
  description:
    "Body copy, muted intros, captions, overlines, and inline code. Full font catalog on font. No heading sizes — use Heading.",
  rules: [
    "as is p or span. Default p.",
    "body/muted default to Ubuntu Light and the site body type scale.",
    "All catalog faces are available on font (same keys as Heading/Label).",
    "variant code stays mono unless font is set. Use Code display=block for a snippet panel.",
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
      name: "font",
      type: "enum",
      values: [...fontFaceValues],
      default: "ubuntuLight",
      description: `Catalog face. ${fontFaceValues.map((key) => `${key}=${fontFaceLabels[key]}`).join("; ")}.`,
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
      description: "Merged onto the root with cn(). Use to leave the site type scale.",
      playground: false,
    },
  ],
} satisfies ComponentMeta;
