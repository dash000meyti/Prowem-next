import { buttonColors } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { DemoMenu, GalleryHeading } from "@/dev/gallery/shared";
import { buttonVariantValues } from "@/dev/values";

export function DropdownGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="variant" defaults="soft" />
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {buttonVariantValues.map((variant) => (
            <Dropdown
              key={variant}
              variant={variant}
              trigger={variant}
              label={variant}
            >
              <DemoMenu />
            </Dropdown>
          ))}
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="color" defaults="primary" />
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {buttonColors.map((color) => (
            <Dropdown key={color} color={color} trigger={color} label={color}>
              <DemoMenu />
            </Dropdown>
          ))}
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="icon / align" defaults="align end" />
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <Dropdown icon="menu" label="Icon only">
            <DemoMenu />
          </Dropdown>
          <Dropdown icon="menu" trigger="Menu" label="Icon and text">
            <DemoMenu />
          </Dropdown>
          <Dropdown trigger="Align start" label="Align start" align="start">
            <DemoMenu />
          </Dropdown>
          <Dropdown trigger="Align end" label="Align end" align="end">
            <DemoMenu />
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
