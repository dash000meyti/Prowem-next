import { Container } from "@/components/ui/container";
import { GalleryHeading } from "@/dev/gallery/shared";
import { containerWidthValues, paddingValues } from "@/dev/values";

export function ContainerGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-4">
      <GalleryHeading label="width × padding" defaults="xl, md" />
      {containerWidthValues.map((width) =>
        paddingValues.map((padding) => (
          <Container
            key={`${width}-${padding}`}
            width={width}
            padding={padding}
            className="border-md border-border bg-panel"
          >
            <p className="border-md border-dashed border-border py-3 text-sm">
              width={width} padding={padding}
            </p>
          </Container>
        )),
      )}
    </div>
  );
}
