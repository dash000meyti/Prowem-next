import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/templates/site-header";
import {
  getLocaleDirection,
  hasLocale,
  localeMeta,
  locales,
} from "@/i18n/config";
import { getDictionaryByLocale } from "@/i18n/get-dictionary";
import "../globals.css";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    return {};
  }

  const dict = await getDictionaryByLocale(lang);

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [locale, `/${locale}`]),
      ),
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionaryByLocale(lang);
  const dir = getLocaleDirection(lang);

  return (
    <html lang={localeMeta[lang].htmlLang} dir={dir} className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SiteHeader
          siteName={dict.site.name}
          languageLabel={dict.nav.language}
          currentLocale={lang}
        />
        {children}
      </body>
    </html>
  );
}
