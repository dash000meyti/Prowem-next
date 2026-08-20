import { Button } from "@/components/ui/button";
import {
  Popup,
  PopupContent,
  PopupFooter,
  PopupHeader,
} from "@/components/ui/popup";
import { copy } from "@/dev/copy";
import { GalleryHeading } from "@/dev/gallery/shared";
import { popupCardValues, popupSizeValues } from "@/dev/values";

export function PopupGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="card" defaults="main" />
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {popupCardValues.map((card) => (
            <Popup
              key={card}
              card={card}
              trigger={card}
              label={card}
              closeLabel={copy.demo.nav.close}
            >
              <PopupHeader>{copy.demo.popupTitle}</PopupHeader>
              <PopupContent>{copy.demo.popupBody}</PopupContent>
              <PopupFooter>
                <Button variant="subtle">{copy.demo.cancel}</Button>
                <Button>{copy.demo.confirm}</Button>
              </PopupFooter>
            </Popup>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="size" defaults="sm" />
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {popupSizeValues.map((size) => (
            <Popup
              key={size}
              size={size}
              trigger={size}
              label={size}
              closeLabel={copy.demo.nav.close}
            >
              <PopupHeader>{copy.demo.popupTitle}</PopupHeader>
              <PopupContent>{copy.demo.popupBody}</PopupContent>
              <PopupFooter>
                <Button variant="subtle">{copy.demo.cancel}</Button>
                <Button>{copy.demo.confirm}</Button>
              </PopupFooter>
            </Popup>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
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
    </div>
  );
}
