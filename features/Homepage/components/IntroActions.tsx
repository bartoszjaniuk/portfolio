"use client";

import Link from "next/link";

import { MagneticButton } from "@/components/ui/magnetic-button";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import type { CmsLink } from "@/lib/sanity/fetchers/get-home-page";
import { cn } from "@/lib/utils";

export type IntroActionsProps = {
  locale: Locale;
  primaryCta: CmsLink;
};

const ctaClassName =
  "border-primary bg-primary/10 text-primary hover:bg-primary-surface hover:text-primary-foreground group focus-visible:border-ring focus-visible:ring-ring/50 relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-lg border px-5 py-3 text-sm font-medium transition-all duration-300 ease-out outline-none select-none focus-visible:ring-[3px] active:translate-y-px sm:px-7 sm:py-3.5 w-full sm:w-auto";

export const IntroActions = ({ locale, primaryCta }: IntroActionsProps) => {
  if (!primaryCta?.href || !primaryCta.label) return null;

  const href = localizeHref(locale, primaryCta.href);
  const isHash = href.startsWith("#");

  const label = (
    <>
      <span className="relative z-10">{primaryCta.label}</span>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
      <span className="bg-primary-surface absolute inset-0 z-0 -translate-x-full transition-transform duration-500 group-hover:translate-x-0" />
    </>
  );

  return (
    <div className="animate-fade-in-up stagger-3 flex flex-col gap-4 sm:flex-row">
      {isHash ? (
        <MagneticButton
          variant="primary"
          size="lg"
          className="w-full sm:w-auto"
          onClick={() => {
            document
              .querySelector(href)
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
            window.history.pushState(null, "", href);
          }}
        >
          {label}
        </MagneticButton>
      ) : (
        <Link href={href} className={cn(ctaClassName)}>
          {label}
        </Link>
      )}
    </div>
  );
};
