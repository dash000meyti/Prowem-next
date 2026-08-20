import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Text } from "@/components/ui/text";
import { copy } from "@/dev/copy";
import { cn } from "@/lib/cn";

export function DevHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-md border-border bg-panel/72 backdrop-blur-sm">
      <Container
        width="full"
        className="flex min-h-14 flex-wrap items-center justify-between gap-x-4 gap-y-3 py-3 md:h-16 md:flex-nowrap md:py-0"
      >
        <Link href="/dev" className="min-w-0">
          <Text
            as="span"
            className="text-sm font-semibold tracking-tight text-foreground md:text-base"
          >
            {copy.siteName}
          </Text>
        </Link>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "min-w-0")}
        >
          {copy.siteLink}
        </Link>
      </Container>
    </header>
  );
}
