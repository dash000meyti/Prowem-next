import { LanguageSwitcher } from "@/components/templates/language-switcher";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

export type SiteHeaderProps = {
  siteName: string;
  languageLabel: string;
  getStartedLabel: string;
  currentLocale: Locale;
  className?: string;
};

export function SiteHeader({
  siteName,
  languageLabel,
  getStartedLabel,
  currentLocale,
  className,
}: SiteHeaderProps) {
  return (
    <header className={cn("border-b border-sm border-border bg-panel", className)}>
      <Container className="flex min-h-14 flex-wrap items-center justify-between gap-x-4 gap-y-3 py-3 md:h-16 md:flex-nowrap md:py-0">
        <p className="min-w-0 text-sm font-semibold tracking-tight">{siteName}</p>
        <div className="flex min-w-0 items-center gap-2">
          <LanguageSwitcher
            currentLocale={currentLocale}
            label={languageLabel}
          />
          <Button className="shrink-0 whitespace-nowrap">
            {getStartedLabel}
          </Button>
        </div>
      </Container>
    </header>
  );
}
