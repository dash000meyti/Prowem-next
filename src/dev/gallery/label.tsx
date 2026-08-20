import { Label } from "@/components/ui/label";
import { copy } from "@/dev/copy";
import { GalleryHeading } from "@/dev/gallery/shared";
import { labelSizeValues } from "@/dev/values";

export function LabelGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <GalleryHeading label="size" defaults="md" />
      <div className="flex min-w-0 flex-col gap-2">
        {labelSizeValues.map((size) => (
          <Label key={size} size={size}>
            {size} {copy.demo.label}
          </Label>
        ))}
      </div>
    </div>
  );
}
