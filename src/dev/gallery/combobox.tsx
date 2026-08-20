import { Combobox } from "@/components/ui/combobox";
import { copy } from "@/dev/copy";
import { demoComboboxItems, GalleryHeading } from "@/dev/gallery/shared";
import { alignValues, fieldSizeValues, radiusValues } from "@/dev/values";

export function ComboboxGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-8">
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="size" defaults="md" />
        <div className="flex min-w-0 max-w-sm flex-col gap-2">
          {fieldSizeValues.map((size) => (
            <Combobox
              key={size}
              size={size}
              items={demoComboboxItems}
              defaultValue="one"
              label={copy.demo.choose}
              placeholder={copy.demo.choose}
              searchLabel={copy.demo.search}
              emptyLabel={copy.demo.empty}
            />
          ))}
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="radius" defaults="md" />
        <div className="flex min-w-0 max-w-sm flex-col gap-2">
          {radiusValues.map((radius) => (
            <Combobox
              key={radius}
              radius={radius}
              items={demoComboboxItems}
              defaultValue="one"
              label={copy.demo.choose}
              placeholder={copy.demo.choose}
              searchLabel={copy.demo.search}
              emptyLabel={copy.demo.empty}
            />
          ))}
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="align / disabled" defaults="align start" />
        <div className="flex min-w-0 max-w-sm flex-col gap-2">
          {alignValues.map((align) => (
            <Combobox
              key={align}
              align={align}
              items={demoComboboxItems}
              defaultValue="one"
              label={align}
              placeholder={copy.demo.choose}
              searchLabel={copy.demo.search}
              emptyLabel={copy.demo.empty}
            />
          ))}
          <Combobox
            items={demoComboboxItems}
            defaultValue="one"
            label={copy.demo.choose}
            placeholder={copy.demo.choose}
            searchLabel={copy.demo.search}
            emptyLabel={copy.demo.empty}
            disabled
          />
        </div>
      </div>
    </div>
  );
}
