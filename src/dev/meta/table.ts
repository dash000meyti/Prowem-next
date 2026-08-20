import type { ComponentMeta } from "./types";

export const tableMeta = {
  name: "Table",
  slug: "table",
  kind: "ui",
  file: "src/components/ui/table/table.tsx",
  importStatement:
    'import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";',
  description:
    "Compound table: wrap, header, body, row, head, cell. No caption. Root clips overflow and uses token radius and border.",
  rules: [
    "Compose TableHeader / TableBody / TableRow / TableHead / TableCell. Do not restyle a second table.",
    "Pass cell copy as children. Do not hardcode strings inside Table.",
    "Use className on cells for mono or muted type.",
  ],
  props: [
    {
      name: "className",
      type: "string",
      description: "Merged onto the table element with cn().",
      playground: false,
    },
  ],
} satisfies ComponentMeta;
