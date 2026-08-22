import { Textarea } from "@/components/ui/textarea";
import { copy } from "@/dev/copy";
import { GalleryHeading } from "@/dev/gallery/shared";
import { fieldSizeValues, radiusValues } from "@/dev/values";

export function TextareaGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-8">
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="size" defaults="md" />
        <div className="flex min-w-0 max-w-sm flex-col gap-2">
          {fieldSizeValues.map((size) => (
            <Textarea
              key={size}
              size={size}
              defaultValue={size}
              placeholder={copy.demo.placeholder}
            />
          ))}
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="radius" defaults="sm" />
        <div className="flex min-w-0 max-w-sm flex-col gap-2">
          {radiusValues.map((radius) => (
            <Textarea key={radius} radius={radius} defaultValue={radius} />
          ))}
        </div>
      </div>
    </div>
  );
}
