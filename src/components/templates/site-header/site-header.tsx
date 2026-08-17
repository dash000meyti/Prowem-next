"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/templates/language-switcher";
import {
  Button,
  buttonVariants,
  type ButtonColor,
} from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SideMenu } from "@/components/ui/side-menu";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { cn } from "@/lib/cn";

const stuckAfterPx = 8;

const pageLinks = [
  { key: "home", path: "", color: "primary" },
  { key: "myEventApp", path: "/my-event-app", color: "accent-1" },
  { key: "myBroadcast", path: "/my-broadcast", color: "accent-4" },
  { key: "mySocialmedia", path: "/my-socialmedia", color: "accent-3" },
  { key: "myClub", path: "/my-club", color: "accent-2" },
  { key: "eventTeam", path: "/event-team", color: "primary" },
  { key: "login", path: "/login", color: "foreground" },
] as const satisfies ReadonlyArray<{
  key: keyof Dictionary["nav"];
  path: string;
  color: ButtonColor;
}>;

export type SiteHeaderProps = {
  siteName: string;
  nav: Dictionary["nav"];
  currentLocale: Locale;
  className?: string;
};

function hrefFor(locale: Locale, path: string) {
  return path === "" ? `/${locale}` : `/${locale}${path}`;
}

function NavItem({
  href,
  label,
  color,
  current,
  className,
  radius,
  size,
  role,
}: {
  href: string;
  label: string;
  color: ButtonColor;
  current: boolean;
  className?: string;
  radius?: "md" | "full";
  size?: "sm" | "md";
  role?: "menuitem";
}) {
  if (current) {
    return (
      <Button
        variant="subtle"
        color={color}
        size={size}
        radius={radius}
        disabled
        aria-current="page"
        role={role}
        className={className}
      >
        {label}
      </Button>
    );
  }

  return (
    <Link
      href={href}
      role={role}
      className={cn(
        buttonVariants({
          variant: "subtle",
          color,
          size,
          radius,
        }),
        className,
      )}
    >
      {label}
    </Link>
  );
}

export function SiteHeader({
  siteName,
  nav,
  currentLocale,
  className,
}: SiteHeaderProps) {
  const pathname = usePathname() || `/${currentLocale}`;
  const [stuck, setStuck] = useState(false);
  const homeHref = hrefFor(currentLocale, "");

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;

      setStuck((isStuck) => {
        if (isStuck) {
          return y > 0;
        }

        return y > stuckAfterPx;
      });
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = pageLinks.map((item) => {
    const href = hrefFor(currentLocale, item.path);

    return {
      href,
      label: nav[item.key],
      color: item.color,
      current: pathname === href,
    };
  });

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full min-w-0 border-b border-sm transition-colors duration-300",
          stuck
            ? "h-18 border-border bg-panel/72 backdrop-blur-sm"
            : "h-20 border-transparent bg-transparent backdrop-blur-none",
          className,
        )}
      >
        <Container className="flex h-full min-w-0 items-center gap-x-3 md:gap-x-4">
          <Link
            href={homeHref}
            className="min-w-0 shrink-0 truncate text-sm font-semibold tracking-tight"
          >
            {siteName}
          </Link>
          <nav
            aria-label={nav.menu}
            className="hidden min-w-0 flex-1 items-center justify-start gap-1 lg:flex"
          >
            {links.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                color={item.color}
                current={item.current}
                size="sm"
                className="shrink-0 whitespace-nowrap"
              />
            ))}
          </nav>
          <div className="ms-auto flex min-w-0 shrink-0 items-center gap-2 lg:ms-0">
            <LanguageSwitcher
              currentLocale={currentLocale}
              label={nav.language}
            />
            <Button className="hidden shrink-0 whitespace-nowrap lg:inline-flex">
              {nav.getStarted}
            </Button>
            <SideMenu
              className="lg:hidden"
              icon="menu"
              label={nav.menu}
              closeLabel={nav.close}
              variant="secondary"
              side="end"
              footer={<Button className="w-full">{nav.getStarted}</Button>}
            >
              <ul className="flex min-w-0 flex-col">
                {links.map((item) => (
                  <li key={item.href}>
                    <NavItem
                      href={item.href}
                      label={item.label}
                      color={item.color}
                      current={item.current}
                      role="menuitem"
                      className="w-full justify-start"
                    />
                  </li>
                ))}
              </ul>
            </SideMenu>
          </div>
        </Container>
      </header>
      {stuck ? <div className="h-2 w-full shrink-0" aria-hidden="true" /> : null}
    </>
  );
}
