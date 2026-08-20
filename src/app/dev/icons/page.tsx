import type { Metadata } from "next";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { copy } from "@/dev/copy";
import { IconsGallery } from "@/dev/gallery/icons";

export const metadata: Metadata = {
  title: copy.iconsPage.title,
};

export default function DevIconsPage() {
  return (
    <article className="flex min-w-0 flex-col gap-8">
      <header className="flex min-w-0 flex-col gap-3">
        <Heading level={1}>{copy.iconsPage.title}</Heading>
        <Text variant="muted">{copy.iconsPage.intro}</Text>
      </header>
      <IconsGallery />
    </article>
  );
}
