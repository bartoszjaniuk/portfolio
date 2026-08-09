export const locales = ["en", "pl"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Resolves `params.locale` to a known Locale, or `null` when invalid.
 * Call sites decide the consequence (`notFound()` vs empty metadata).
 */
export async function resolveLocaleParam(
  params: Promise<{ locale: string }>,
): Promise<Locale | null> {
  const { locale } = await params;
  return isLocale(locale) ? locale : null;
}

/**
 * Prefix a path with a locale segment.
 * `/` → `/en`, `/projects` → `/en/projects`
 */
export function localePath(locale: Locale, path = "/"): string {
  const normalized =
    !path || path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;

  if (normalized === "/") {
    return `/${locale}`;
  }

  return `/${locale}${normalized}`;
}

/**
 * Swap the locale segment in a pathname, or prefix via `localePath` when absent.
 * `/en/about` + `pl` → `/pl/about`
 */
export function swapLocaleInPath(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/");
  if (segments[1] && isLocale(segments[1])) {
    segments[1] = nextLocale;
    return segments.join("/");
  }
  return localePath(nextLocale, pathname);
}

export function isExternalHref(href: string): boolean {
  return /^(https?:|mailto:|tel:)/i.test(href);
}

/**
 * Locale-prefix internal paths; leave hash and absolute/external URLs unchanged.
 */
export function localizeHref(locale: Locale, href: string): string {
  if (isExternalHref(href) || href.startsWith("#")) {
    return href;
  }
  return localePath(locale, href);
}
