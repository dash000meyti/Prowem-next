export const locales = ["en", "de", "pt", "es", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const rtlLocales = ["ar"] as const;

export type LocaleDirection = "ltr" | "rtl";

export type LocaleMeta = {
  label: string;
  htmlLang: string;
  dir: LocaleDirection;
};

export const localeMeta: Record<Locale, LocaleMeta> = {
  en: { label: "English", htmlLang: "en", dir: "ltr" },
  de: { label: "Deutsch", htmlLang: "de", dir: "ltr" },
  pt: { label: "Português", htmlLang: "pt", dir: "ltr" },
  es: { label: "Español", htmlLang: "es", dir: "ltr" },
  ar: { label: "العربية", htmlLang: "ar", dir: "rtl" },
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getLocaleDirection(locale: Locale): LocaleDirection {
  return localeMeta[locale].dir;
}

export function isRtlLocale(locale: Locale): boolean {
  return localeMeta[locale].dir === "rtl";
}
