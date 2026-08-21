import { Heading, type HeadingLevel } from "@/components/ui/heading";
import { GalleryHeading } from "@/dev/gallery/shared";
import { fontFaceLabels, fontFaceValues, type FontFace } from "@/fonts";
import { headingLevelValues, headingToneValues } from "@/dev/values";

export function HeadingGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-8">
      <div className="flex min-w-0 flex-col gap-4">
        <GalleryHeading label="level" defaults="1" />
        {headingLevelValues.map((level) => (
          <Heading key={level} level={Number(level) as HeadingLevel}>
            Level {level}
          </Heading>
        ))}
      </div>
      <div className="flex min-w-0 flex-col gap-4">
        <GalleryHeading label="font" defaults="bebasNeueRegular" />
        {fontFaceValues.map((font) => (
          <Heading key={font} level={3} font={font as FontFace}>
            {fontFaceLabels[font]}
          </Heading>
        ))}
      </div>
      <div className="flex min-w-0 flex-col gap-4">
        <GalleryHeading label="tone" defaults="default" />
        {headingToneValues.map((tone) => (
          <Heading key={tone} level={2} tone={tone}>
            {tone}
          </Heading>
        ))}
      </div>
    </div>
  );
}
