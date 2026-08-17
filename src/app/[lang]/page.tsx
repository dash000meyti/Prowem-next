import { Container } from "@/components/ui/container";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function HomePage() {
  const dict = await getDictionary();

  return (
    <main className="flex flex-1 flex-col">
      <Container className="flex flex-1 flex-col justify-center py-16">
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-start">
          {dict.home.title}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-foreground/70 text-start">
          {dict.home.hint}
        </p>
      </Container>
    </main>
  );
}
