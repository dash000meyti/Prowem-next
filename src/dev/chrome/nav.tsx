"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import { copy } from "@/dev/copy";
import { templateMetas, uiMetas } from "@/dev/meta";
import { cn } from "@/lib/cn";

const guide = [
  { href: "/dev", label: copy.gettingStarted },
  { href: "/dev/tokens", label: copy.tokens },
  { href: "/dev/icons", label: copy.icons },
] as const;

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const current =
    href === "/dev" ? pathname === "/dev" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={cn(
        buttonVariants({
          variant: current ? "subtle" : "ghost",
          size: "sm",
          radius: "md",
        }),
        "w-full justify-start",
      )}
    >
      {label}
    </Link>
  );
}

function NavGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-foreground/70">
        {title}
      </p>
      {children}
    </div>
  );
}

export function DevNav({ className }: { className?: string }) {
  return (
    <nav className={cn("flex min-w-0 flex-col gap-6 text-sm", className)}>
      <NavGroup title={copy.guide}>
        {guide.map((item) => (
          <NavLink key={item.href} href={item.href} label={item.label} />
        ))}
      </NavGroup>
      <NavGroup title={copy.components}>
        {uiMetas.map((meta) => (
          <NavLink
            key={meta.slug}
            href={`/dev/components/${meta.slug}`}
            label={meta.name}
          />
        ))}
      </NavGroup>
      <NavGroup title={copy.templates}>
        {templateMetas.map((meta) => (
          <NavLink
            key={meta.slug}
            href={`/dev/templates/${meta.slug}`}
            label={meta.name}
          />
        ))}
      </NavGroup>
    </nav>
  );
}
