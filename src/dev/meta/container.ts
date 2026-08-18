import { containerWidthValues, paddingValues } from "@/dev/values";
import type { ComponentMeta } from "./types";

export const containerMeta = {
  name: "Container",
  slug: "container",
  kind: "ui",
  file: "src/components/ui/container/container.tsx",
  importStatement: 'import { Container } from "@/components/ui/container";',
  description:
    "Page/section shell. Horizontal padding is symmetric (px-*), which is RTL-safe. min-w-0 is on the root so flex layouts can shrink.",
  rules: [
    "Use as the page or section shell, not as a card.",
    "width full is max-w-none. Other widths use max-w-container-* from theme.container.",
    "Lab chrome uses width=full so it spans the viewport. Do not wrap the lab in xl.",
    "Padding steps are already viewport-scaled (default md is px-4 md:px-6 lg:px-8).",
  ],
  props: [
    {
      name: "width",
      type: "enum",
      values: [...containerWidthValues],
      default: "xl",
      description: "Max width token. full is 100%.",
      playground: true,
    },
    {
      name: "padding",
      type: "enum",
      values: [...paddingValues],
      default: "md",
      description: "Horizontal padding step.",
      playground: true,
    },
    {
      name: "className",
      type: "string",
      description: "Merged onto the root with cn().",
      playground: false,
    },
  ],
} satisfies ComponentMeta;
