import { Label } from "@/components/ui/label";
import { copy } from "@/dev/copy";
import { GalleryHeading } from "@/dev/gallery/shared";
import { fontFaceLabels, fontFaceValues, type FontFace } from "@/fonts";
import { labelSizeValues } from "@/dev/values";

export function LabelGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-8">
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
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="font" defaults="heeboBold" />
        <div className="flex min-w-0 flex-col gap-2">
          {fontFaceValues.map((font) => (
            <Label key={font} font={font as FontFace}>
              {fontFaceLabels[font]} {copy.demo.label}
            </Label>
          ))}
        </div>
      </div>
    </div>
  );
}
