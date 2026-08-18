import type { Metadata } from "next";
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
        <h1 className="text-2xl font-semibold tracking-tight text-start md:text-3xl">
          {copy.tokensPage.title}
        </h1>
        <p className="text-sm leading-6 text-foreground/70">
          {copy.tokensPage.intro}
        </p>
      </header>
      <LabSection title={copy.tokensPage.title} hint={copy.tokensPage.hint}>
        <TokenGallery />
      </LabSection>
    </article>
  );
}
