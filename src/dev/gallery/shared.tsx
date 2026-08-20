import { Heading } from "@/components/ui/heading";
import { List } from "@/components/ui/list";
import { copy } from "@/dev/copy";

export function GalleryHeading({
  label,
  defaults,
}: {
  label: string;
  defaults: string;
}) {
  return (
    <Heading level={3} tone="muted">
      {label} - Default: {defaults}
    </Heading>
  );
}

export function DemoMenu() {
  return (
    <List marker="none" gap="sm" className="p-1">
      <li className="px-3 py-1.5">{copy.demo.menuItemOne}</li>
      <li className="px-3 py-1.5">{copy.demo.menuItemTwo}</li>
    </List>
  );
}

export const cardLabPreview = "min-w-[200px] min-h-[300px]";

export const labHatchClass =
  "bg-[repeating-linear-gradient(-45deg,transparent_0_40px,color-mix(in_srgb,var(--foreground)_14%,transparent)_40px_80px)]";
