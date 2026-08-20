import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { copy } from "@/dev/copy";
import { GalleryHeading } from "@/dev/gallery/shared";
import { fieldSizeValues } from "@/dev/values";

export function CheckboxGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-8">
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="size" defaults="md" />
        <div className="flex min-w-0 flex-col gap-2">
          {fieldSizeValues.map((size) => (
            <Label key={size} className="flex items-center gap-2">
              <Checkbox size={size} defaultChecked />
              {size}
            </Label>
          ))}
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="disabled" defaults="false" />
        <Label className="flex items-center gap-2">
          <Checkbox defaultChecked disabled />
          {copy.demo.label}
        </Label>
      </div>
    </div>
  );
}
