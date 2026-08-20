import { Badge } from "@/components/ui/badge";
import { buttonColors } from "@/components/ui/button";
import { GalleryHeading } from "@/dev/gallery/shared";
import { badgeVariantValues, radiusValues } from "@/dev/values";

export function BadgeGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-8">
      <div className="flex min-w-0 flex-col gap-4">
        <GalleryHeading label="variant × color" defaults="filled, primary" />
        {badgeVariantValues.map((variant) => (
          <div key={variant} className="flex min-w-0 flex-col gap-2">
            <p className="text-xs text-foreground/70">{variant}</p>
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              {buttonColors.map((color) => (
                <Badge key={color} variant={variant} color={color}>
                  {color}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="radius" defaults="full" />
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {radiusValues.map((radius) => (
            <Badge key={radius} radius={radius}>
              {radius}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
