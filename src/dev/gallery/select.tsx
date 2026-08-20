import { Select } from "@/components/ui/select";
import { copy } from "@/dev/copy";
import { GalleryHeading } from "@/dev/gallery/shared";
import { fieldSizeValues, radiusValues } from "@/dev/values";

function Options() {
  return (
    <>
      <option value="one">{copy.demo.optionOne}</option>
      <option value="two">{copy.demo.optionTwo}</option>
    </>
  );
}

export function SelectGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-8">
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="size" defaults="md" />
        <div className="flex min-w-0 max-w-sm flex-col gap-2">
          {fieldSizeValues.map((size) => (
            <Select key={size} size={size} defaultValue="one">
              <Options />
            </Select>
          ))}
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="radius" defaults="md" />
        <div className="flex min-w-0 max-w-sm flex-col gap-2">
          {radiusValues.map((radius) => (
            <Select key={radius} radius={radius} defaultValue="one">
              <Options />
            </Select>
          ))}
        </div>
      </div>
    </div>
  );
}
