import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { DevHeader } from "@/dev/chrome/header";
import { DevNav } from "@/dev/chrome/nav";

export function DevShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full min-w-0 flex-col">
      <DevHeader />
      <Container
        width="full"
        className="flex flex-1 flex-col gap-8 py-8 md:flex-row md:gap-10 md:py-12"
      >
        <aside className="w-full shrink-0 md:w-52">
          <DevNav />
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </Container>
    </div>
  );
}
