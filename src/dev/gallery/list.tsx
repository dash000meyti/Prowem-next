import { List } from "@/components/ui/list";
import { copy } from "@/dev/copy";
import { GalleryHeading } from "@/dev/gallery/shared";
import { listMarkerValues } from "@/dev/values";

export function ListGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-8">
      <GalleryHeading label="marker" defaults="disc" />
      {listMarkerValues.map((marker) => (
        <List key={marker} marker={marker}>
          <li>
            {marker} — {copy.demo.menuItemOne}
          </li>
          <li>{copy.demo.menuItemTwo}</li>
        </List>
      ))}
    </div>
  );
}
