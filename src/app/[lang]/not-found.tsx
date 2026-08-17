import { Container } from "@/components/ui/container";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function NotFound() {
  const dict = await getDictionary();

  return (
    <main className="flex flex-1 flex-col">
      <Container className="flex flex-1 flex-col justify-center py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-start">
          {dict.notFound.title}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-foreground/70 text-start">
          {dict.notFound.hint}
        </p>
      </Container>
    </main>
  );
}
