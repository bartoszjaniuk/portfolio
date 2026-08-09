import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { defaultLocale, locales } from "@/lib/i18n/config";

/**
 * Always prefix locale-less paths with the default locale (`en`).
 * Never negotiate Accept-Language — language is chosen via URL / LanguageToggle only.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    return;
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
