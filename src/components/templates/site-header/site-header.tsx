"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon, type IconName } from "@/components/icons";
import {
  Button,
  buttonVariants,
  type ButtonColor,
} from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Dropdown } from "@/components/ui/dropdown";
import {
  SideMenu,
  SideMenuContent,
  SideMenuFooter,
  SideMenuHeader,
} from "@/components/ui/side-menu";
import { locales, localeMeta, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { replaceLocaleInPathname } from "@/i18n/pathname";
import { cn } from "@/lib/cn";
import type { BreakpointName } from "@/settings/types";

const stuckAfterPx = 8;

const navFromClasses = {
  xs: {
    nav: "hidden min-w-0 flex-1 items-center justify-start gap-1 xs:flex",
    tools: "ms-auto flex min-w-0 shrink-0 items-center gap-2 xs:ms-0",
    cta: "hidden shrink-0 whitespace-nowrap xs:inline-flex",
    menu: "xs:hidden",
  },
  sm: {
    nav: "hidden min-w-0 flex-1 items-center justify-start gap-1 sm:flex",
    tools: "ms-auto flex min-w-0 shrink-0 items-center gap-2 sm:ms-0",
    cta: "hidden shrink-0 whitespace-nowrap sm:inline-flex",
    menu: "sm:hidden",
  },
  md: {
    nav: "hidden min-w-0 flex-1 items-center justify-start gap-1 md:flex",
    tools: "ms-auto flex min-w-0 shrink-0 items-center gap-2 md:ms-0",
    cta: "hidden shrink-0 whitespace-nowrap md:inline-flex",
    menu: "md:hidden",
  },
  lg: {
    nav: "hidden min-w-0 flex-1 items-center justify-start gap-1 lg:flex",
    tools: "ms-auto flex min-w-0 shrink-0 items-center gap-2 lg:ms-0",
    cta: "hidden shrink-0 whitespace-nowrap lg:inline-flex",
    menu: "lg:hidden",
  },
  xl: {
    nav: "hidden min-w-0 flex-1 items-center justify-start gap-1 xl:flex",
    tools: "ms-auto flex min-w-0 shrink-0 items-center gap-2 xl:ms-0",
    cta: "hidden shrink-0 whitespace-nowrap xl:inline-flex",
    menu: "xl:hidden",
  },
} as const satisfies Record<
  BreakpointName,
  { nav: string; tools: string; cta: string; menu: string }
>;

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

const localeFlagIcons = {
  en: "flag-en",
  de: "flag-de",
  pt: "flag-pt",
  es: "flag-es",
  ar: "flag-ar",
} as const satisfies Record<Locale, IconName>;

export type SiteHeaderProps = {
  siteName: string;
  nav: Dictionary["nav"];
  currentLocale: Locale;
  navFrom: BreakpointName;
  className?: string;
};

function hrefFor(locale: Locale, path: string) {
  return path === "" ? `/${locale}` : `/${locale}${path}`;
}

function LanguageMenu({
  currentLocale,
  pathname,
  label,
}: {
  currentLocale: Locale;
  pathname: string;
  label: string;
}) {
  const currentLabel = localeMeta[currentLocale].label;

  return (
    <nav aria-label={label} className="flex justify-end">
      <Dropdown
        label={`${label}: ${currentLabel}`}
        icon={localeFlagIcons[currentLocale]}
        variant="soft"
      >
        <ul className="flex min-w-0 flex-col">
          {locales.map((locale) => {
            const isCurrent = locale === currentLocale;

            return (
              <li key={locale}>
                <Link
                  href={replaceLocaleInPathname(pathname, locale)}
                  hrefLang={localeMeta[locale].htmlLang}
                  lang={localeMeta[locale].htmlLang}
                  role="menuitem"
                  aria-current={isCurrent ? "true" : undefined}
                  className={cn(
                    buttonVariants({
                      variant: isCurrent ? "filled" : "ghost",
                      size: "sm",
                      radius: "md",
                    }),
                    "w-full justify-start gap-2",
                  )}
                >
                  <Icon name={localeFlagIcons[locale]} />
                  <span className="min-w-0 truncate">
                    {localeMeta[locale].label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Dropdown>
    </nav>
  );
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
  navFrom,
  className,
}: SiteHeaderProps) {
  const pathname = usePathname() || `/${currentLocale}`;
  const [stuck, setStuck] = useState(false);
  const homeHref = hrefFor(currentLocale, "");
  const layout = navFromClasses[navFrom];

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
          "sticky top-0 z-40 w-full min-w-0 border-b border-md transition-colors duration-300",
          stuck
            ? "h-18 border-border bg-panel/72 backdrop-blur-sm"
            : "h-20 border-transparent bg-transparent backdrop-blur-none",
          className,
        )}
      >
        <Container className="flex h-full min-w-0 items-center gap-x-3 md:gap-x-4">
          <Link
            href={homeHref}
            className="inline-flex min-w-0 shrink-0 items-center"
          >
            <Image
              src="/logo.svg"
              alt={siteName}
              width={972}
              height={177}
              className="h-[1.44rem] w-auto"
              priority
              unoptimized
            />
          </Link>
          <nav aria-label={nav.menu} className={layout.nav}>
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
          <div className={layout.tools}>
            <LanguageMenu
              currentLocale={currentLocale}
              pathname={pathname}
              label={nav.language}
            />
            <Button className={layout.cta}>
              {nav.getStarted}
            </Button>
            <SideMenu
              className={layout.menu}
              icon="menu"
              label={nav.menu}
              closeLabel={nav.close}
              variant="secondary"
              side="end"
            >
              <SideMenuHeader>{nav.menu}</SideMenuHeader>
              <SideMenuContent>
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
              </SideMenuContent>
              <SideMenuFooter>
                <Button className="w-full">{nav.getStarted}</Button>
              </SideMenuFooter>
            </SideMenu>
          </div>
        </Container>
      </header>
      {stuck ? <div className="h-2 w-full shrink-0" aria-hidden="true" /> : null}
    </>
  );
}
