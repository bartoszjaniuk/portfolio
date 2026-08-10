import type { Locale } from "@/lib/i18n/config";
import type { NotFoundPageData } from "@/lib/sanity/fetchers/get-not-found-page";

import { NotFoundCta } from "./NotFoundCta";

export type NotFoundViewProps = {
  locale: Locale;
  data: NotFoundPageData | null;
};

const FALLBACK = {
  headline: "Oops! This page lost its power.",
  primaryCta: {
    href: "/",
    label: "Back to home",
  },
} as const;

/**
 * Constantine-style centered 404: giant watermark, headline, solid primary CTA.
 * Uses CMS copy when present; otherwise a minimal English fallback.
 */
export function NotFoundView({ locale, data }: NotFoundViewProps) {
  const headline = data?.headline?.trim() || FALLBACK.headline;
  const cta =
    data?.primaryCta?.href && data.primaryCta.label
      ? data.primaryCta
      : FALLBACK.primaryCta;

  return (
    <main className="relative flex min-h-[calc(100dvh-8rem)] flex-col items-center justify-center overflow-hidden px-6 py-16">
      <span
        aria-hidden
        className="font-heading text-primary/8 dark:text-primary/12 pointer-events-none absolute inset-0 flex items-center justify-center text-[min(42vw,18rem)] leading-none font-normal select-none"
      >
        404
      </span>

      <div className="relative z-10 flex max-w-3xl flex-col items-center gap-8 text-center">
        <h1 className="font-heading text-primary text-3xl leading-tight uppercase sm:text-4xl md:text-5xl lg:text-6xl">
          {headline}
        </h1>
        <NotFoundCta locale={locale} cta={cta} />
      </div>
    </main>
  );
}
