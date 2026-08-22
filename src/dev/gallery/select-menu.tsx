import { SelectMenu } from "@/components/ui/select-menu";
import { copy } from "@/dev/copy";
import { demoSelectItems, GalleryHeading } from "@/dev/gallery/shared";
import { alignValues, fieldSizeValues, radiusValues } from "@/dev/values";

export function SelectMenuGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-8">
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="size" defaults="md" />
        <div className="flex min-w-0 max-w-sm flex-col gap-2">
          {fieldSizeValues.map((size) => (
            <SelectMenu
              key={size}
              size={size}
              items={demoSelectItems}
              defaultValue="one"
              label={copy.demo.choose}
              placeholder={copy.demo.choose}
            />
          ))}
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="radius" defaults="sm" />
        <div className="flex min-w-0 max-w-sm flex-col gap-2">
          {radiusValues.map((radius) => (
            <SelectMenu
              key={radius}
              radius={radius}
              items={demoSelectItems}
              defaultValue="one"
              label={copy.demo.choose}
              placeholder={copy.demo.choose}
            />
          ))}
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="align / disabled" defaults="align start" />
        <div className="flex min-w-0 max-w-sm flex-col gap-2">
          {alignValues.map((align) => (
            <SelectMenu
              key={align}
              align={align}
              items={demoSelectItems}
              defaultValue="one"
              label={align}
              placeholder={copy.demo.choose}
            />
          ))}
          <SelectMenu
            items={demoSelectItems}
            defaultValue="one"
            label={copy.demo.choose}
            placeholder={copy.demo.choose}
            disabled
          />
        </div>
      </div>
    </div>
  );
}
