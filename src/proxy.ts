import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, hasLocale, locales, type Locale } from "@/i18n/config";

function pathnameHasLocale(pathname: string): boolean {
  return locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
}

function getPreferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language");

  if (!header) {
    return defaultLocale;
  }

  try {
    const languages = new Negotiator({
      headers: { "accept-language": header },
    }).languages();
    const matched = match(languages, [...locales], defaultLocale);
    return hasLocale(matched) ? matched : defaultLocale;
  } catch {
    return defaultLocale;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/dev" || pathname.startsWith("/dev/")) {
    return NextResponse.next();
  }

  if (pathnameHasLocale(pathname)) {
    return NextResponse.next();
  }

  const locale = getPreferredLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|icon|apple-icon|.*\\..*).*)"],
};
