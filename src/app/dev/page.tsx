import type { Metadata } from "next";
import Link from "next/link";
import { Alert } from "@/components/ui/alert";
import { Heading } from "@/components/ui/heading";
import { List } from "@/components/ui/list";
import { Text } from "@/components/ui/text";
import { copy } from "@/dev/copy";
import { templateMetas, uiMetas } from "@/dev/meta";

export const metadata: Metadata = {
  title: copy.gettingStarted,
};

export default function DevHomePage() {
  return (
    <article className="flex min-w-0 flex-col gap-8">
      <header className="flex min-w-0 flex-col gap-3">
        <Heading level={1}>{copy.home.title}</Heading>
        <Text variant="muted">{copy.home.intro}</Text>
      </header>

      <section className="flex min-w-0 flex-col gap-3">
        <Heading level={2}>{copy.home.foldersTitle}</Heading>
        <Text variant="muted">{copy.home.foldersIntro}</Text>
        <List marker="disc">
          {copy.home.folders.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </List>
      </section>

      <section className="flex min-w-0 flex-col gap-3">
        <Heading level={2}>{copy.home.dockerTitle}</Heading>
        <Alert icon="info">
          <Text variant="muted">{copy.home.dockerIntro}</Text>
        </Alert>
      </section>

      <section className="flex min-w-0 flex-col gap-3">
        <Heading level={2}>{copy.home.addTitle}</Heading>
        <List as="ol" marker="decimal">
          {copy.home.add.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </List>
      </section>

      <section className="flex min-w-0 flex-col gap-3">
        <Heading level={2}>{copy.home.catalogTitle}</Heading>
        <div className="grid min-w-0 gap-3 sm:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-2">
            {uiMetas.map((meta) => (
              <Link
                key={meta.slug}
                href={`/dev/components/${meta.slug}`}
                className="text-primary hover:underline"
              >
                {meta.name}
              </Link>
            ))}
          </div>
          <div className="flex min-w-0 flex-col gap-2">
            {templateMetas.map((meta) => (
              <Link
                key={meta.slug}
                href={`/dev/templates/${meta.slug}`}
                className="text-primary hover:underline"
              >
                {meta.name}
              </Link>
            ))}
            <Link href="/dev/tokens" className="text-primary hover:underline">
              {copy.tokens}
            </Link>
            <Link href="/dev/icons" className="text-primary hover:underline">
              {copy.icons}
            </Link>
            <Link href="/dev/test" className="text-primary hover:underline">
              {copy.test}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
