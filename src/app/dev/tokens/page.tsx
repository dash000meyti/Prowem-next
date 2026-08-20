import type { Metadata } from "next";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { LabSection } from "@/dev/chrome/section";
import { copy } from "@/dev/copy";
import { TokenGallery } from "@/dev/tokens";

export const metadata: Metadata = {
  title: copy.tokensPage.title,
};

export default function DevTokensPage() {
  return (
    <article className="flex min-w-0 flex-col gap-8">
      <header className="flex min-w-0 flex-col gap-3">
        <Heading level={1}>{copy.tokensPage.title}</Heading>
        <Text variant="muted">{copy.tokensPage.intro}</Text>
      </header>
      <LabSection title={copy.tokensPage.title} hint={copy.tokensPage.hint}>
        <TokenGallery />
      </LabSection>
    </article>
  );
}
