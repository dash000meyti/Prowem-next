import { listAsValues, listGapValues, listMarkerValues } from "@/dev/values";
import type { ComponentMeta } from "./types";

export const listMeta = {
  name: "List",
  slug: "list",
  kind: "ui",
  file: "src/components/ui/list/list.tsx",
  importStatement: 'import { List, listVariants } from "@/components/ui/list";',
  description:
    "ul or ol with disc, decimal, or none markers. Children are li nodes. No ListItem atom.",
  rules: [
    "Pass li children. Do not wrap strings without li.",
    "as defaults to ol when marker is decimal, otherwise ul.",
    "marker none is for grids and menus that already space themselves.",
  ],
  props: [
    {
      name: "as",
      type: "enum",
      values: [...listAsValues],
      default: "ul",
      description: "List element.",
      playground: true,
      group: "Appearance",
    },
    {
      name: "marker",
      type: "enum",
      values: [...listMarkerValues],
      default: "disc",
      description: "Bullet style.",
      playground: true,
      group: "Appearance",
    },
    {
      name: "gap",
      type: "enum",
      values: [...listGapValues],
      default: "md",
      description: "Space between items.",
      playground: true,
      group: "Appearance",
    },
    {
      name: "className",
      type: "string",
      description: "Merged onto the list with cn().",
      playground: false,
    },
  ],
} satisfies ComponentMeta;
