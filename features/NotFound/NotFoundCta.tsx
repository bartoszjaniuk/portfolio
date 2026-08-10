import Link from "next/link";

import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { CmsLink } from "@/lib/sanity/fetchers/get-home-page";
import { cn } from "@/lib/utils";

export type NotFoundCtaProps = {
  locale: Locale;
  cta: NonNullable<CmsLink>;
  className?: string;
};

const ctaClassName =
  "group focus-visible:border-ring focus-visible:ring-ring/50 relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-lg border border-primary bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 ease-out outline-none select-none hover:bg-primary/90 focus-visible:ring-[3px] active:translate-y-px sm:px-7 sm:py-3.5";

export function NotFoundCta({ locale, cta, className }: NotFoundCtaProps) {
  const href = localizeHref(locale, cta.href);

  return (
    <Link href={href} className={cn(ctaClassName, className)}>
      <span className="relative z-10 tracking-wide uppercase">{cta.label}</span>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
