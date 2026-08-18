import { copy } from "@/dev/copy";

export function GalleryHeading({
  label,
  defaults,
}: {
  label: string;
  defaults: string;
}) {
  return (
    <h3 className="text-sm font-medium text-foreground/70">
      {label} - Default: {defaults}
    </h3>
  );
}

export function DemoMenu() {
  return (
    <ul className="flex min-w-0 flex-col p-1 text-sm">
      <li className="px-3 py-1.5">{copy.demo.menuItemOne}</li>
      <li className="px-3 py-1.5">{copy.demo.menuItemTwo}</li>
    </ul>
  );
}

export const cardLabPreview = "min-w-[200px] min-h-[300px]";

export const labHatchClass =
  "bg-[repeating-linear-gradient(-45deg,transparent_0_40px,color-mix(in_srgb,var(--foreground)_14%,transparent)_40px_80px)]";
