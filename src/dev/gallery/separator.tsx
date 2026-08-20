import { Separator } from "@/components/ui/separator";
import { GalleryHeading } from "@/dev/gallery/shared";

export function SeparatorGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-8">
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="orientation" defaults="horizontal" />
        <Separator />
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="vertical" defaults="horizontal" />
        <div className="flex h-16 min-w-0 items-center gap-4">
          <span>start</span>
          <Separator orientation="vertical" />
          <span>end</span>
        </div>
      </div>
    </div>
  );
}
