import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { copy } from "@/dev/copy";
import { GalleryHeading } from "@/dev/gallery/shared";
import { radiusValues } from "@/dev/values";

export function TableGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-4">
      <GalleryHeading label="slots" defaults="header, body, row, head, cell" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{copy.prop}</TableHead>
            <TableHead>{copy.type}</TableHead>
            <TableHead>{copy.description}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-mono text-xs">variant</TableCell>
            <TableCell className="font-mono text-xs text-foreground/70">
              filled | outline
            </TableCell>
            <TableCell>{copy.demo.cardContent}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-xs">size</TableCell>
            <TableCell className="font-mono text-xs text-foreground/70">
              sm | md | lg
            </TableCell>
            <TableCell>{copy.demo.cardContent}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="radius" defaults="md" />
        <div className="flex min-w-0 flex-col gap-3">
          {radiusValues.map((radius) => (
            <Table key={radius} radius={radius}>
              <TableHeader>
                <TableRow>
                  <TableHead>{copy.prop}</TableHead>
                  <TableHead>{copy.type}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono text-xs">radius</TableCell>
                  <TableCell className="font-mono text-xs text-foreground/70">
                    {radius}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ))}
        </div>
      </div>
    </div>
  );
}
