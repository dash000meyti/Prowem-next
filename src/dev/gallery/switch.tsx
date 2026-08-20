import { buttonColors } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { GalleryHeading } from "@/dev/gallery/shared";
import { fieldSizeValues } from "@/dev/values";

export function SwitchGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-8">
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="color" defaults="primary" />
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          {buttonColors.map((color) => (
            <Switch key={color} color={color} defaultChecked aria-label={color} />
          ))}
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="size" defaults="md" />
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          {fieldSizeValues.map((size) => (
            <Switch key={size} size={size} defaultChecked aria-label={size} />
          ))}
        </div>
      </div>
    </div>
  );
}
