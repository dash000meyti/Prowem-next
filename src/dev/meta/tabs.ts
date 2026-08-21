import type { ComponentMeta } from "./types";

export const tabsMeta = {
  name: "Tabs",
  slug: "tabs",
  kind: "ui",
  file: "src/components/ui/tabs/tabs.tsx",
  importStatement:
    'import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";',
  description:
    "Client tabs. Triggers are Buttons (subtle when selected, ghost otherwise). Controlled value or defaultValue.",
  rules: [
    "TabsTrigger is a Button (default size md, same heights as Button). Do not restyle a second tab chrome.",
    "Pass trigger and panel copy as children. Do not hardcode strings inside Tabs.",
    "Use defaultValue or value + onValueChange.",
  ],
  props: [
    {
      name: "defaultValue",
      type: "enum",
      values: ["one", "two"],
      default: "one",
      description: "Uncontrolled selected tab.",
      playground: true,
      group: "Demo",
    },
    {
      name: "className",
      type: "string",
      description: "Merged onto the root with cn().",
      playground: false,
    },
  ],
} satisfies ComponentMeta;
