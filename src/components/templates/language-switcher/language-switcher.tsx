"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { locales, localeMeta, type Locale } from "@/i18n/config";
import { replaceLocaleInPathname } from "@/i18n/pathname";
import { cn } from "@/lib/cn";

const localeFlagIcons = {
  en: "flag-en",
  de: "flag-de",
  pt: "flag-pt",
  es: "flag-es",
  ar: "flag-ar",
} as const satisfies Record<Locale, IconName>;

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
  const currentLabel = localeMeta[currentLocale].label;

  return (
    <nav aria-label={label} className={cn("flex justify-end", className)}>
      <Dropdown
        label={`${label}: ${currentLabel}`}
        icon={localeFlagIcons[currentLocale]}
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
                      variant: isCurrent ? "primary" : "ghost",
                      size: "sm",
                      radius: "md",
                    }),
                    "w-full justify-start gap-2",
                  )}
                >
                  <Icon name={localeFlagIcons[locale]} />
                  <span className="min-w-0 truncate">{localeMeta[locale].label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Dropdown>
    </nav>
  );
}
