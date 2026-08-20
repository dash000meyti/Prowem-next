import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { copy } from "@/dev/copy";
import { GalleryHeading } from "@/dev/gallery/shared";
import { tooltipSideValues } from "@/dev/values";

export function TooltipGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-4">
      <GalleryHeading label="side" defaults="top" />
      <div className="flex min-w-0 flex-wrap items-center gap-3 p-8">
        {tooltipSideValues.map((side) => (
          <Tooltip key={side} content={copy.demo.tooltip} side={side}>
            <Button size="sm" variant="soft">
              {side}
            </Button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
