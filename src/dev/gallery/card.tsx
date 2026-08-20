import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { copy } from "@/dev/copy";
import { cardLabPreview, GalleryHeading } from "@/dev/gallery/shared";
import {
  borderValues,
  cardBorderColorValues,
  cardLightValues,
  cardSlotVariantValues,
  cardSurfaceValues,
  cardUnderlineSizeValues,
  cardUnderlineWidthValues,
  paddingValues,
  radiusValues,
} from "@/dev/values";

const lightDirs = ["bottom", "top", "start", "end"] as const;

const lightCombos = Array.from({ length: 16 }, (_, mask) => {
  const on = lightDirs.filter((_, index) => Boolean(mask & (1 << index)));

  return {
    key: String(mask),
    label: on.length === 0 ? "none" : on.join(" + "),
    lightBottom: on.includes("bottom") ? ("primary" as const) : undefined,
    lightTop: on.includes("top") ? ("primary" as const) : undefined,
    lightStart: on.includes("start") ? ("primary" as const) : undefined,
    lightEnd: on.includes("end") ? ("primary" as const) : undefined,
  };
});

const borderLightCombos = Array.from({ length: 16 }, (_, mask) => {
  const on = lightDirs.filter((_, index) => Boolean(mask & (1 << index)));

  return {
    key: String(mask),
    label: on.length === 0 ? "none" : on.join(" + "),
    borderLightBottom: on.includes("bottom") ? ("primary" as const) : undefined,
    borderLightTop: on.includes("top") ? ("primary" as const) : undefined,
    borderLightStart: on.includes("start") ? ("primary" as const) : undefined,
    borderLightEnd: on.includes("end") ? ("primary" as const) : undefined,
  };
});

export function CardGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-8">
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading
          label="compound"
          defaults="surface panel, lights none, padding none, radius md, border sm, borderColor border"
        />
        <Card className={`max-w-sm ${cardLabPreview}`}>
          <CardHeader variant="divider">{copy.demo.cardTitle}</CardHeader>
          <CardContent>
            <p className="text-sm">{copy.demo.cardContent}</p>
          </CardContent>
          <CardFooter variant="divider">
            <Button variant="subtle">{copy.demo.cancel}</Button>
            <Button>{copy.demo.confirm}</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="surface" defaults="panel" />
        <div className="flex min-w-0 flex-wrap items-stretch gap-2">
          {cardSurfaceValues.map((surface) => (
            <Card key={surface} surface={surface} className={cardLabPreview}>
              <CardContent>
                <p className="text-sm">{surface}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="lights" defaults="none" />
        <div className="flex min-w-0 flex-wrap items-stretch gap-2">
          {lightCombos.map((combo) => (
            <Card
              key={combo.key}
              lightBottom={combo.lightBottom}
              lightTop={combo.lightTop}
              lightStart={combo.lightStart}
              lightEnd={combo.lightEnd}
              className={cardLabPreview}
            >
              <CardContent>
                <p className="text-sm">{combo.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="light color" defaults="none; lightBottom" />
        <div className="flex min-w-0 flex-wrap items-stretch gap-2">
          {cardLightValues.map((light) => (
            <Card
              key={light}
              lightBottom={light}
              className={cardLabPreview}
            >
              <CardContent>
                <p className="text-sm">{light}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="border lights" defaults="none; needs border" />
        <div className="flex min-w-0 flex-wrap items-stretch gap-2">
          {borderLightCombos.map((combo) => (
            <Card
              key={combo.key}
              border="md"
              borderLightBottom={combo.borderLightBottom}
              borderLightTop={combo.borderLightTop}
              borderLightStart={combo.borderLightStart}
              borderLightEnd={combo.borderLightEnd}
              className={cardLabPreview}
            >
              <CardContent>
                <p className="text-sm">{combo.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading
          label="borderLight color"
          defaults="none; borderLightTop"
        />
        <div className="flex min-w-0 flex-wrap items-stretch gap-2">
          {cardLightValues.map((light) => (
            <Card
              key={light}
              border="md"
              borderLightTop={light}
              className={cardLabPreview}
            >
              <CardContent>
                <p className="text-sm">{light}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading
          label="borderLight stops"
          defaults="top 10/50/90; bottom 0/20/40"
        />
        <div className="flex min-w-0 flex-wrap items-stretch gap-2">
          <Card
            border="md"
            borderLightTop="primary"
            borderLightBottom="accent-2"
            borderLightTopStart={10}
            borderLightTopCenter={50}
            borderLightTopEnd={90}
            borderLightBottomStart={0}
            borderLightBottomCenter={20}
            borderLightBottomEnd={40}
            className={cardLabPreview}
          >
            <CardContent>
              <p className="text-sm">top 10/50/90</p>
              <p className="text-sm">bottom 0/20/40</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="header / footer" defaults="none" />
        <div className="flex min-w-0 flex-wrap items-stretch gap-2">
          {cardSlotVariantValues.map((variant) => (
            <Card key={variant} className={cardLabPreview}>
              <CardHeader variant={variant}>{variant}</CardHeader>
              <CardContent>
                <p className="text-sm">Main</p>
              </CardContent>
              <CardFooter variant={variant}>
                <Button variant="subtle" size="sm">
                  Action
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="header underline" defaults="none" />
        <div className="flex min-w-0 flex-wrap items-stretch gap-2">
          {cardLightValues.map((underline) => (
            <Card key={underline} className={cardLabPreview}>
              <CardHeader underline={underline}>{underline}</CardHeader>
              <CardContent>
                <p className="text-sm">Main</p>
              </CardContent>
            </Card>
          ))}
          <Card className={cardLabPreview}>
            <CardHeader variant="border" underline="primary">
              border + primary
            </CardHeader>
            <CardContent>
              <p className="text-sm">Main</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="header underlineSize" defaults="md" />
        <div className="flex min-w-0 flex-wrap items-stretch gap-2">
          {cardUnderlineSizeValues.map((underlineSize) => (
            <Card key={underlineSize} className={cardLabPreview}>
              <CardHeader underline="primary" underlineSize={underlineSize}>
                {underlineSize}
              </CardHeader>
              <CardContent>
                <p className="text-sm">Main</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="header underlineWidth" defaults="fix" />
        <div className="flex min-w-0 flex-wrap items-stretch gap-2">
          {cardUnderlineWidthValues.map((underlineWidth) => (
            <Card key={underlineWidth} className={cardLabPreview}>
              <CardHeader underline="primary" underlineWidth={underlineWidth}>
                {underlineWidth}
              </CardHeader>
              <CardContent>
                <p className="text-sm">Main</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="padding (root)" defaults="none" />
        <div className="flex min-w-0 flex-wrap items-stretch gap-2">
          {paddingValues.map((padding) => (
            <Card key={padding} padding={padding} className={cardLabPreview}>
              <p className="text-sm">{padding}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading
          label="padding (slots)"
          defaults="md; border inset matches slot padding"
        />
        <div className="flex min-w-0 flex-wrap items-stretch gap-2">
          {paddingValues.map((padding) => (
            <Card key={padding} className={cardLabPreview}>
              <CardHeader padding={padding} variant="border">
                Header {padding}
              </CardHeader>
              <CardContent padding={padding}>
                <p className="text-sm">Main {padding}</p>
              </CardContent>
              <CardFooter padding={padding} variant="border">
                <p className="text-sm">Footer {padding}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading
          label="divider × padding"
          defaults="md; divider line is full width"
        />
        <div className="flex min-w-0 flex-wrap items-stretch gap-2">
          {paddingValues.map((padding) => (
            <Card key={padding} className={cardLabPreview}>
              <CardHeader padding={padding} variant="divider">
                Header {padding}
              </CardHeader>
              <CardContent padding={padding}>
                <p className="text-sm">Main {padding}</p>
              </CardContent>
              <CardFooter padding={padding} variant="divider">
                <p className="text-sm">Footer {padding}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="radius" defaults="md" />
        <div className="flex min-w-0 flex-wrap items-stretch gap-2">
          {radiusValues.map((radius) => (
            <Card key={radius} radius={radius} padding="md" className={cardLabPreview}>
              <p className="text-sm">{radius}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="border" defaults="sm" />
        <div className="flex min-w-0 flex-wrap items-stretch gap-2">
          {borderValues.map((border) => (
            <Card key={border} border={border} padding="md" className={cardLabPreview}>
              <p className="text-sm">{border}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="border × divider" defaults="sm" />
        <div className="flex min-w-0 flex-wrap items-stretch gap-2">
          {borderValues.map((border) => (
            <Card key={border} border={border} className={cardLabPreview}>
              <CardHeader variant="divider">{border}</CardHeader>
              <CardContent>
                <p className="text-sm">Main</p>
              </CardContent>
              <CardFooter variant="divider">
                <p className="text-sm">Footer</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="borderColor" defaults="border" />
        <div className="flex min-w-0 flex-wrap items-stretch gap-2">
          {cardBorderColorValues.map((borderColor) => (
            <Card
              key={borderColor}
              borderColor={borderColor}
              padding="md"
              className={cardLabPreview}
            >
              <p className="text-sm">{borderColor}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="borderColor × divider" defaults="border" />
        <div className="flex min-w-0 flex-wrap items-stretch gap-2">
          {cardBorderColorValues.map((borderColor) => (
            <Card
              key={borderColor}
              borderColor={borderColor}
              className={cardLabPreview}
            >
              <CardHeader variant="divider">{borderColor}</CardHeader>
              <CardContent>
                <p className="text-sm">Main</p>
              </CardContent>
              <CardFooter variant="divider">
                <p className="text-sm">Footer</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
