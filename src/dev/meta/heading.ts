import { headingLevelValues, headingToneValues } from "@/dev/values";
import type { ComponentMeta } from "./types";

export const headingMeta = {
  name: "Heading",
  slug: "heading",
  kind: "ui",
  file: "src/components/ui/heading/heading.tsx",
  importStatement: 'import { Heading, headingVariants } from "@/components/ui/heading";',
  description:
    "Semantic h1–h6. Size follows level. No subtitle slot — pass supporting copy as a sibling Text.",
  rules: [
    "Use level for the real heading tag. Do not fake a heading with Text.",
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
      description: "Renders h1–h6. Size follows the level.",
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
      description: "Merged onto the heading with cn().",
      playground: false,
    },
  ],
} satisfies ComponentMeta;
