import { Button, buttonColors } from "@/components/ui/button";
import { GalleryHeading } from "@/dev/gallery/shared";
import { fontFaceLabels, type FontFace } from "@/fonts";
import { buttonVariantValues, radiusValues, sizeValues } from "@/dev/values";

const buttonFontSamples = ["heeboRegular", "ubuntuMedium"] as const;

export function ButtonGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-8">
      <div className="flex min-w-0 flex-col gap-4">
        <GalleryHeading label="variant × color" defaults="filled, primary" />
        {buttonVariantValues.map((variant) => (
          <div key={variant} className="flex min-w-0 flex-col gap-2">
            <p className="text-xs text-foreground/70">{variant}</p>
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              {buttonColors.map((color) => (
                <Button key={color} variant={variant} color={color}>
                  {color}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="font" defaults="heeboRegular" />
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {buttonFontSamples.map((font) => (
            <Button key={font} font={font as FontFace}>
              {fontFaceLabels[font]}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="size" defaults="md" />
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {sizeValues.map((size) => (
            <Button key={size} size={size}>
              {size}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="radius" defaults="full" />
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {radiusValues.map((radius) => (
            <Button key={radius} radius={radius}>
              {radius}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="icon" defaults="iconPosition start" />
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <Button icon="close" />
          <Button icon="menu">start</Button>
          <Button icon="menu" iconPosition="end">
            end
          </Button>
          <Button icon="close" disabled />
          <Button disabled>Disabled</Button>
        </div>
      </div>
    </div>
  );
}
