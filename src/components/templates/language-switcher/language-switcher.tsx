"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { locales, localeMeta, type Locale } from "@/i18n/config";
import { replaceLocaleInPathname } from "@/i18n/pathname";
import { cn } from "@/lib/cn";

export type LanguageSwitcherProps = {
  currentLocale: Locale;
  label: string;
  className?: string;
};

export function LanguageSwitcher({
  currentLocale,
  label,
  className,
}: LanguageSwitcherProps) {
  const pathname = usePathname() || `/${currentLocale}`;

  return (
    <nav aria-label={label} className={cn("flex flex-wrap items-center gap-1", className)}>
      {locales.map((locale) => {
        const isCurrent = locale === currentLocale;

        return (
          <Link
            key={locale}
            href={replaceLocaleInPathname(pathname, locale)}
            hrefLang={localeMeta[locale].htmlLang}
            lang={localeMeta[locale].htmlLang}
            aria-current={isCurrent ? "true" : undefined}
            className={cn(
              buttonVariants({
                variant: isCurrent ? "primary" : "ghost",
                size: "sm",
              }),
            )}
          >
            {localeMeta[locale].label}
          </Link>
        );
      })}
    </nav>
  );
}
