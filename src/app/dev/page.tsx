import type { Metadata } from "next";
import Link from "next/link";
import { copy } from "@/dev/copy";
import { templateMetas, uiMetas } from "@/dev/meta";

export const metadata: Metadata = {
  title: copy.gettingStarted,
};

export default function DevHomePage() {
  return (
    <article className="flex min-w-0 flex-col gap-8">
      <header className="flex min-w-0 flex-col gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-start md:text-3xl">
          {copy.home.title}
        </h1>
        <p className="text-sm leading-6 text-foreground/70">{copy.home.intro}</p>
      </header>

      <section className="flex min-w-0 flex-col gap-3">
        <h2 className="text-lg font-semibold tracking-tight text-start">
          {copy.home.foldersTitle}
        </h2>
        <p className="text-sm leading-6 text-foreground/70">
          {copy.home.foldersIntro}
        </p>
        <ul className="flex list-disc flex-col gap-2 ps-5 text-sm">
          {copy.home.folders.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="flex min-w-0 flex-col gap-3">
        <h2 className="text-lg font-semibold tracking-tight text-start">
          {copy.home.dockerTitle}
        </h2>
        <p className="text-sm leading-6 text-foreground/70">
          {copy.home.dockerIntro}
        </p>
      </section>

      <section className="flex min-w-0 flex-col gap-3">
        <h2 className="text-lg font-semibold tracking-tight text-start">
          {copy.home.addTitle}
        </h2>
        <ol className="flex list-decimal flex-col gap-2 ps-5 text-sm">
          {copy.home.add.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="flex min-w-0 flex-col gap-3">
        <h2 className="text-lg font-semibold tracking-tight text-start">
          {copy.home.catalogTitle}
        </h2>
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
