import { Alert } from "@/components/ui/alert";
import { copy } from "@/dev/copy";
import { GalleryHeading } from "@/dev/gallery/shared";
import { cardBorderColorValues } from "@/dev/values";

export function AlertGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-4">
      <GalleryHeading label="color" defaults="border" />
      <div className="flex min-w-0 flex-col gap-3">
        {cardBorderColorValues.map((color) => (
          <Alert key={color} color={color} icon="info">
            {color}: {copy.demo.alert}
          </Alert>
        ))}
      </div>
    </div>
  );
}
