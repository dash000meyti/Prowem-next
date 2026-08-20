import { Input } from "@/components/ui/input";
import { copy } from "@/dev/copy";
import { GalleryHeading } from "@/dev/gallery/shared";
import { fieldSizeValues, radiusValues } from "@/dev/values";

export function InputGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-8">
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="size" defaults="md" />
        <div className="flex min-w-0 max-w-sm flex-col gap-2">
          {fieldSizeValues.map((size) => (
            <Input
              key={size}
              size={size}
              defaultValue={size}
              placeholder={copy.demo.placeholder}
            />
          ))}
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="radius" defaults="md" />
        <div className="flex min-w-0 max-w-sm flex-col gap-2">
          {radiusValues.map((radius) => (
            <Input key={radius} radius={radius} defaultValue={radius} />
          ))}
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="disabled" defaults="false" />
        <Input
          className="max-w-sm"
          defaultValue={copy.demo.value}
          disabled
        />
      </div>
    </div>
  );
}
