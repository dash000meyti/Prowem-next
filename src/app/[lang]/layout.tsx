import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/templates/site-header";
import {
  getLocaleDirection,
  hasLocale,
  localeMeta,
  locales,
} from "@/i18n/config";
import { getDictionaryByLocale } from "@/i18n/get-dictionary";
import { toCssVars } from "@/settings/css-vars";
import { getSettings } from "@/settings/get-settings";
import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

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

  const [dict, settings] = await Promise.all([
    getDictionaryByLocale(lang),
    getSettings(),
  ]);
  const dir = getLocaleDirection(lang);

  return (
    <html
      lang={localeMeta[lang].htmlLang}
      dir={dir}
      className="h-full min-w-0 overflow-x-clip antialiased"
      style={toCssVars(settings.theme)}
    >
      <body className="flex min-h-full min-w-0 flex-col bg-background text-foreground">
        <SiteHeader
          siteName={dict.site.name}
          nav={dict.nav}
          currentLocale={lang}
          navFrom={settings.header.navFrom}
        />
        {children}
      </body>
    </html>
  );
}
