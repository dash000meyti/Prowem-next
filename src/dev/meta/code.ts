import { codeDisplayValues } from "@/dev/values";
import type { ComponentMeta } from "./types";

export const codeMeta = {
  name: "Code",
  slug: "code",
  kind: "ui",
  file: "src/components/ui/code/code.tsx",
  importStatement: 'import { Code, codeVariants } from "@/components/ui/code";',
  description:
    "Inline code or a bordered panel. Block matches the lab import snippet (panel fill, token border, mono xs).",
  rules: [
    "display inline is a code tag. display block wraps pre > code.",
    "Pass the snippet as children. Do not hardcode copy inside Code.",
    "Text variant=code is the same inline look without the Code atom.",
  ],
  props: [
    {
      name: "children",
      type: "string",
      default: 'import { Button } from "@/components/ui/button";',
      description: "Code snippet.",
      playground: true,
      group: "Demo",
    },
    {
      name: "display",
      type: "enum",
      values: [...codeDisplayValues],
      default: "block",
      description: "Inline tag or bordered pre panel.",
      playground: true,
      group: "Appearance",
    },
    {
      name: "className",
      type: "string",
      description: "Merged onto pre (block) or code (inline).",
      playground: false,
    },
  ],
} satisfies ComponentMeta;
