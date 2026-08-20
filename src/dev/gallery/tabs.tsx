import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { copy } from "@/dev/copy";
import { GalleryHeading } from "@/dev/gallery/shared";

export function TabsGallery() {
  return (
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
  );
}
