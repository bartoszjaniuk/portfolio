"use client";

import { usePathname, useRouter } from "next/navigation";

import {
  defaultLocale,
  isLocale,
  locales,
  swapLocaleInPath,
  type Locale,
} from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

const localeLabels: Record<Locale, string> = {
  en: "English",
  pl: "Polish",
};

/** Display order for the dual label (PL/EN). */
const displayLocales = ["en", "pl"] as const satisfies readonly Locale[];

export function LanguageToggle() {
  const pathname = usePathname();
  const router = useRouter();

  const segment = pathname.split("/")[1];
  const currentLocale: Locale =
    segment && isLocale(segment) ? segment : defaultLocale;

  const currentIndex = locales.indexOf(currentLocale);
  const nextLocale = locales[(currentIndex + 1) % locales.length];

  return (
    <button
      type="button"
      onClick={() => {
        router.push(
          swapLocaleInPath(pathname, nextLocale) + window.location.hash,
        );
      }}
      className="group relative flex h-8 cursor-pointer items-center justify-center gap-0.5 rounded px-1.5"
      aria-label={`Switch to ${localeLabels[nextLocale]}`}
    >
      {displayLocales.map((locale, index) => (
        <span key={locale} className="flex items-center gap-0.5">
          {index > 0 ? (
            <span className="text-muted-foreground/50 text-[10px]">/</span>
          ) : null}
          <span
            className={cn(
              "text-xs font-medium tracking-wider",
              // No color transition: theme swaps rewrite --primary and would flash if interpolated.
              locale === currentLocale
                ? "text-primary"
                : "text-muted-foreground",
            )}
          >
            {locale.toUpperCase()}
          </span>
        </span>
      ))}
      <span className="bg-card text-muted-foreground absolute -bottom-6 left-1/2 -translate-x-1/2 rounded px-2 py-0.5 text-[10px] whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {localeLabels[nextLocale]}
      </span>
    </button>
  );
}
