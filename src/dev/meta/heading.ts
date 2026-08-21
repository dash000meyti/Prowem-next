import { fontFaceLabels, fontFaceValues } from "@/fonts";
import { headingLevelValues, headingToneValues } from "@/dev/values";
import type { ComponentMeta } from "./types";

export const headingMeta = {
  name: "Heading",
  slug: "heading",
  kind: "ui",
  file: "src/components/ui/heading/heading.tsx",
  importStatement: 'import { Heading, headingVariants } from "@/components/ui/heading";',
  description:
    "Semantic h1–h6. Site type scale follows level (not a size prop). font picks a catalog face (name + weight).",
  rules: [
    "Use level for the real heading tag. Do not fake a heading with Text.",
    "Default font is Bebas Neue Regular. Override size/tracking only with className.",
    "tone muted is for quieter section labels (gallery headings).",
    "Pass the title as children. Do not hardcode copy inside Heading.",
  ],
  props: [
    {
      name: "children",
      type: "string",
      default: "Heading",
      description: "Heading text.",
      playground: true,
      group: "Demo",
    },
    {
      name: "level",
      type: "enum",
      values: [...headingLevelValues],
      default: "1",
      description: "Renders h1–h6. Size follows the site type scale for that level.",
      playground: true,
      group: "Appearance",
    },
    {
      name: "font",
      type: "enum",
      values: [...fontFaceValues],
      default: "bebasNeueRegular",
      description: `Catalog face. ${fontFaceValues.map((key) => `${key}=${fontFaceLabels[key]}`).join("; ")}.`,
      playground: true,
      group: "Appearance",
    },
    {
      name: "tone",
      type: "enum",
      values: [...headingToneValues],
      default: "default",
      description: "Foreground vs muted.",
      playground: true,
      group: "Appearance",
    },
    {
      name: "className",
      type: "string",
      description: "Merged onto the heading with cn(). Use to leave the site type scale.",
      playground: false,
    },
  ],
} satisfies ComponentMeta;
