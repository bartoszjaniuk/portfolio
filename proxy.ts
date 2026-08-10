import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { defaultLocale, isLocale, locales } from "@/lib/i18n/config";

/**
 * Always prefix locale-less paths with the default locale (`en`).
 * Never negotiate Accept-Language — language is chosen via URL / LanguageToggle only.
 * Locale-prefixed requests get `x-locale` for segments that cannot read `params`
 * (e.g. `not-found.tsx`).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    const segment = pathname.split("/")[1] ?? defaultLocale;
    const locale = isLocale(segment) ? segment : defaultLocale;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", locale);
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  const url = request.nextUrl.clone();
  url.pathname =
    pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Skip Next internals, static assets, images, favicon, and common file extensions
    "/((?!_next|.*\\..*|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
