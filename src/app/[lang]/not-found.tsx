import { Container } from "@/components/ui/container";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function NotFound() {
  const dict = await getDictionary();

  return (
    <main className="flex min-w-0 flex-1 flex-col">
      <Container className="flex flex-1 flex-col justify-center py-10 md:py-16">
        <h1 className="text-2xl font-semibold tracking-tight break-words text-start md:text-3xl">
          {dict.notFound.title}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-foreground/70 text-start md:mt-4 md:text-base md:leading-7">
          {dict.notFound.hint}
        </p>
      </Container>
    </main>
  );
}
