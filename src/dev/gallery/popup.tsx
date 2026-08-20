import { Button } from "@/components/ui/button";
import {
  Popup,
  PopupContent,
  PopupFooter,
  PopupHeader,
} from "@/components/ui/popup";
import { copy } from "@/dev/copy";
import { GalleryHeading } from "@/dev/gallery/shared";

export function PopupGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-4">
      <GalleryHeading label="slots" defaults="header, content, footer" />
      <Popup
        trigger={copy.demo.popupTitle}
        label={copy.demo.popupTitle}
        closeLabel={copy.demo.nav.close}
      >
        <PopupHeader>{copy.demo.popupTitle}</PopupHeader>
        <PopupContent>{copy.demo.popupBody}</PopupContent>
        <PopupFooter>
          <Button variant="subtle">{copy.demo.cancel}</Button>
          <Button>{copy.demo.confirm}</Button>
        </PopupFooter>
      </Popup>
    </div>
  );
}
