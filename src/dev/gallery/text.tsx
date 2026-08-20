import { Text } from "@/components/ui/text";
import { copy } from "@/dev/copy";
import { GalleryHeading } from "@/dev/gallery/shared";
import { textVariantValues } from "@/dev/values";

export function TextGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-4">
      <GalleryHeading label="variant" defaults="body" />
      {textVariantValues.map((variant) => (
        <Text key={variant} variant={variant}>
          {variant}: {copy.demo.text}
        </Text>
      ))}
    </div>
  );
}
