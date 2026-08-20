import { tooltipSideValues } from "@/dev/values";
import type { ComponentMeta } from "./types";

export const tooltipMeta = {
  name: "Tooltip",
  slug: "tooltip",
  kind: "ui",
  file: "src/components/ui/tooltip/tooltip.tsx",
  importStatement: 'import { Tooltip } from "@/components/ui/tooltip";',
  description:
    "Client hover/focus hint. Portal + Card. side is top | bottom | start | end (logical). No collision flip.",
  rules: [
    "The panel is a Card. Do not restyle a second bubble.",
    "side start|end follows dir. top/bottom are physical edges of the trigger.",
    "No overflow flipping. Keep content short so it stays near the trigger.",
    "Pass content and wrap the trigger. Do not hardcode copy inside Tooltip.",
  ],
  props: [
    {
      name: "content",
      type: "string",
      default: "More detail",
      description: "Tooltip text.",
      playground: true,
      group: "Demo",
    },
    {
      name: "side",
      type: "enum",
      values: [...tooltipSideValues],
      default: "top",
      description: "Placement. start/end are logical.",
      playground: true,
      group: "Appearance",
    },
    {
      name: "className",
      type: "string",
      description: "Merged onto the Card panel with cn().",
      playground: false,
    },
  ],
} satisfies ComponentMeta;
