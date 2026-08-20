import { Code } from "@/components/ui/code";
import { copy } from "@/dev/copy";
import { GalleryHeading } from "@/dev/gallery/shared";
import { codeDisplayValues } from "@/dev/values";

export function CodeGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-8">
      {codeDisplayValues.map((display) => (
        <div key={display} className="flex min-w-0 flex-col gap-2">
          <GalleryHeading label="display" defaults="inline" />
          <Code display={display}>{copy.demo.codeSample}</Code>
        </div>
      ))}
    </div>
  );
}
