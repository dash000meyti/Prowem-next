"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Dropdown } from "@/components/ui/dropdown";
import { cn } from "@/lib/cn";

const items = [
  { href: "/dev/templates", label: "Templates" },
  { href: "/dev/ui", label: "UI" },
  { href: "/dev/icons", label: "Icons" },
] as const;

export function LabHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-sm border-border bg-panel">
      <Container className="flex min-h-14 flex-wrap items-center justify-between gap-x-4 gap-y-3 py-3 md:h-16 md:flex-nowrap md:py-0">
        <p className="min-w-0 text-sm font-semibold tracking-tight">
          Component lab
        </p>
        <Dropdown trigger="Components" label="Components" align="end">
          <ul className="flex min-w-0 flex-col">
            {items.map((item) => {
              const current = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    role="menuitem"
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      buttonVariants({
                        variant: current ? "filled" : "ghost",
                        size: "sm",
                        radius: "md",
                      }),
                      "w-full justify-start",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Dropdown>
      </Container>
    </header>
  );
}
