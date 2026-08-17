import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/i18n/messages/en.json").then((module) => module.default),
  de: () => import("@/i18n/messages/de.json").then((module) => module.default),
  pt: () => import("@/i18n/messages/pt.json").then((module) => module.default),
  es: () => import("@/i18n/messages/es.json").then((module) => module.default),
  ar: () => import("@/i18n/messages/ar.json").then((module) => module.default),
};

export async function getDictionaryByLocale(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

export async function getDictionary(): Promise<Dictionary> {
  const locale = await lang();

  if (!hasLocale(locale)) {
    notFound();
  }

  return getDictionaryByLocale(locale);
}
