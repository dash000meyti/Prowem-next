import { hasLocale, type Locale } from "@/i18n/config";

export function replaceLocaleInPathname(
  pathname: string,
  nextLocale: Locale,
): string {
  const segments = pathname.split("/");
  const current = segments[1];

  if (current && hasLocale(current)) {
    segments[1] = nextLocale;
    const nextPath = segments.join("/");
    return nextPath.startsWith("/") ? nextPath : `/${nextPath}`;
  }

  return `/${nextLocale}${pathname === "/" ? "" : pathname}`;
}
