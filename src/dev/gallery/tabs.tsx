import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { copy } from "@/dev/copy";
import { GalleryHeading } from "@/dev/gallery/shared";
import { cardBorderColorValues, cardUnderlineSizeValues, radiusValues, tabsSurfaceValues, tabsVariantValues } from "@/dev/values";

export function TabsGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-8">
      <div className="flex min-w-0 flex-col gap-4">
        <GalleryHeading label="defaultValue" defaults="one" />
        <Tabs defaultValue="one">
          <TabsList>
            <TabsTrigger value="one">{copy.demo.tabOne}</TabsTrigger>
            <TabsTrigger value="two">{copy.demo.tabTwo}</TabsTrigger>
          </TabsList>
          <TabsContent value="one">{copy.demo.tabOneBody}</TabsContent>
          <TabsContent value="two">{copy.demo.tabTwoBody}</TabsContent>
        </Tabs>
      </div>

      <div className="flex min-w-0 flex-col gap-4">
        <GalleryHeading label="variant" defaults="segmented" />
        <div className="flex min-w-0 flex-col gap-6">
          {tabsVariantValues.map((variant) => (
            <Tabs key={variant} defaultValue="one">
              <TabsList variant={variant} color="accent-3">
                <TabsTrigger value="one">{copy.demo.tabOne}</TabsTrigger>
                <TabsTrigger value="two">{copy.demo.tabTwo}</TabsTrigger>
              </TabsList>
              <TabsContent value="one">{copy.demo.tabOneBody}</TabsContent>
              <TabsContent value="two">{copy.demo.tabTwoBody}</TabsContent>
            </Tabs>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-4">
        <GalleryHeading label="surface" defaults="panel (segmented)" />
        <div className="flex min-w-0 flex-col gap-4">
          {tabsSurfaceValues.map((surface) => (
            <Tabs key={surface} defaultValue="one">
              <TabsList surface={surface}>
                <TabsTrigger value="one">{surface}</TabsTrigger>
                <TabsTrigger value="two">{copy.demo.tabTwo}</TabsTrigger>
              </TabsList>
              <TabsContent value="one">{copy.demo.tabOneBody}</TabsContent>
              <TabsContent value="two">{copy.demo.tabTwoBody}</TabsContent>
            </Tabs>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-4">
        <GalleryHeading label="borderColor" defaults="border" />
        <div className="flex min-w-0 flex-col gap-4">
          {cardBorderColorValues.map((borderColor) => (
            <Tabs key={borderColor} defaultValue="one">
              <TabsList borderColor={borderColor}>
                <TabsTrigger value="one">{borderColor}</TabsTrigger>
                <TabsTrigger value="two">{copy.demo.tabTwo}</TabsTrigger>
              </TabsList>
              <TabsContent value="one">{copy.demo.tabOneBody}</TabsContent>
              <TabsContent value="two">{copy.demo.tabTwoBody}</TabsContent>
            </Tabs>
          ))}
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-4">
        <GalleryHeading label="underlineSize" defaults="md (underline)" />
        <div className="flex min-w-0 flex-col gap-4">
          {cardUnderlineSizeValues.map((underlineSize) => (
            <Tabs key={underlineSize} defaultValue="one">
              <TabsList variant="underline" underlineSize={underlineSize}>
                <TabsTrigger value="one">{underlineSize}</TabsTrigger>
                <TabsTrigger value="two">{copy.demo.tabTwo}</TabsTrigger>
              </TabsList>
              <TabsContent value="one">{copy.demo.tabOneBody}</TabsContent>
              <TabsContent value="two">{copy.demo.tabTwoBody}</TabsContent>
            </Tabs>
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-4">
        <GalleryHeading label="radius" defaults="sm" />
        <div className="flex min-w-0 flex-col gap-4">
          {radiusValues.map((radius) => (
            <Tabs key={radius} defaultValue="one">
              <TabsList radius={radius}>
                <TabsTrigger value="one">{radius}</TabsTrigger>
                <TabsTrigger value="two">{copy.demo.tabTwo}</TabsTrigger>
              </TabsList>
              <TabsContent value="one">{copy.demo.tabOneBody}</TabsContent>
              <TabsContent value="two">{copy.demo.tabTwoBody}</TabsContent>
            </Tabs>
          ))}
        </div>
      </div>
    </div>
  );
}
