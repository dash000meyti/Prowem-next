import { LanguageSwitcher } from "@/components/templates/language-switcher";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

export type SiteHeaderProps = {
  siteName: string;
  languageLabel: string;
  currentLocale: Locale;
  className?: string;
};

export function SiteHeader({
  siteName,
  languageLabel,
  currentLocale,
  className,
}: SiteHeaderProps) {
  return (
    <header className={cn("border-b border-foreground/10", className)}>
      <Container className="flex h-16 items-center justify-between gap-4">
        <p className="text-sm font-semibold tracking-tight">{siteName}</p>
        <LanguageSwitcher
          currentLocale={currentLocale}
          label={languageLabel}
        />
      </Container>
    </header>
  );
}
