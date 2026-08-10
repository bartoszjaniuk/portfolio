import { headers } from "next/headers";

import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config";

/**
 * Resolve locale for special files that do not receive `params` (e.g. not-found).
 * Prefers `x-locale` set by `proxy.ts`, then falls back to the default locale.
 */
export async function resolveLocaleFromHeaders(): Promise<Locale> {
  const headerStore = await headers();
  const candidate = headerStore.get("x-locale");
  if (candidate && isLocale(candidate)) {
    return candidate;
  }
  return defaultLocale;
}
