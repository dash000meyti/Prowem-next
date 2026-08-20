import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { copy } from "@/dev/copy";
import type { ComponentMeta } from "@/dev/meta/types";

export function PropsTable({ meta }: { meta: ComponentMeta }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{copy.prop}</TableHead>
          <TableHead>{copy.type}</TableHead>
          <TableHead>{copy.default}</TableHead>
          <TableHead>{copy.description}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {meta.props.map((prop) => (
          <TableRow key={prop.name}>
            <TableCell className="font-mono text-xs">{prop.name}</TableCell>
            <TableCell>
              <Badge variant="muted" color="foreground">
                {prop.type === "enum" ? prop.values?.join(" | ") : prop.type}
              </Badge>
            </TableCell>
            <TableCell className="font-mono text-xs">
              {prop.default === undefined ? "—" : String(prop.default)}
            </TableCell>
            <TableCell>{prop.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
