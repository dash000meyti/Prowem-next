import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { copy } from "@/dev/copy";
import { cardLabPreview, GalleryHeading, labHatchClass } from "@/dev/gallery/shared";
import {
  borderValues,
  cardBorderColorValues,
  cardLightValues,
  cardSlotVariantValues,
  cardSurfaceValues,
  paddingValues,
  radiusValues,
} from "@/dev/values";

export function CardGallery() {
  return (
    <div className={`flex min-w-0 flex-col gap-8 rounded-md ${labHatchClass} p-4 md:p-6`}>
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading
          label="compound"
          defaults="surface panel, lights none, padding none, radius md, border md, borderColor border"
        />
        <Card className={`max-w-sm ${cardLabPreview}`}>
          <CardHeader variant="divider">
            <CardTitle>{copy.demo.cardTitle}</CardTitle>
            <CardDescription>{copy.demo.cardDescription}</CardDescription>
          </CardHeader>
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

      {(["lightBottom", "lightTop", "lightStart", "lightEnd"] as const).map(
        (lightProp) => (
          <div key={lightProp} className="flex min-w-0 flex-col gap-2">
            <GalleryHeading label={lightProp} defaults="none" />
            <div className="flex min-w-0 flex-wrap items-stretch gap-2">
              {cardLightValues.map((light) => (
                <Card
                  key={light}
                  lightBottom={lightProp === "lightBottom" ? light : undefined}
                  lightTop={lightProp === "lightTop" ? light : undefined}
                  lightStart={lightProp === "lightStart" ? light : undefined}
                  lightEnd={lightProp === "lightEnd" ? light : undefined}
                  className={cardLabPreview}
                >
                  <CardContent>
                    <p className="text-sm">{light}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ),
      )}

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="lightBottom × lightTop" defaults="none" />
        <div className="flex min-w-0 flex-wrap items-stretch gap-2">
          {cardSurfaceValues.map((surface) => (
            <Card
              key={surface}
              surface={surface}
              lightBottom="primary"
              lightTop="foreground"
              className={cardLabPreview}
            >
              <CardContent>
                <p className="text-sm">{surface} dual</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="header / footer" defaults="none" />
        <div className="flex min-w-0 flex-wrap items-stretch gap-2">
          {cardSlotVariantValues.map((variant) => (
            <Card key={variant} className={cardLabPreview}>
              <CardHeader variant={variant}>
                <CardTitle>{variant}</CardTitle>
              </CardHeader>
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
        <GalleryHeading label="padding (slots)" defaults="md" />
        <div className="flex min-w-0 flex-wrap items-stretch gap-2">
          {paddingValues.map((padding) => (
            <Card key={padding} className={cardLabPreview}>
              <CardHeader padding={padding} variant="border">
                <CardTitle>Header {padding}</CardTitle>
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
        <GalleryHeading label="border" defaults="md" />
        <div className="flex min-w-0 flex-wrap items-stretch gap-2">
          {borderValues.map((border) => (
            <Card key={border} border={border} padding="md" className={cardLabPreview}>
              <p className="text-sm">{border}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="border × divider" defaults="md" />
        <div className="flex min-w-0 flex-wrap items-stretch gap-2">
          {borderValues.map((border) => (
            <Card key={border} border={border} className={cardLabPreview}>
              <CardHeader variant="divider">
                <CardTitle>{border}</CardTitle>
              </CardHeader>
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
              <CardHeader variant="divider">
                <CardTitle>{borderColor}</CardTitle>
              </CardHeader>
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
