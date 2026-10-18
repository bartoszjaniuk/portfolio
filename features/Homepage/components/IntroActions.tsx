"use client";

import { MagneticButton } from "@/components/ui/magnetic-button";
import type { Locale } from "@/lib/i18n/config";
import type { CmsLink } from "@/lib/sanity/fetchers/get-home-page";

export type IntroActionsProps = {
  locale: Locale;
  primaryCta: CmsLink;
};

const CONTACT_HASH = "#contact";

export const IntroActions = ({ primaryCta }: IntroActionsProps) => {
  if (!primaryCta?.label) return null;

  return (
    <div className="animate-fade-in-up stagger-3 flex flex-col gap-4 sm:flex-row">
      <MagneticButton
        variant="primary"
        size="lg"
        className="w-full sm:w-auto"
        onClick={() => {
          document
            .querySelector(CONTACT_HASH)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.pushState(null, "", CONTACT_HASH);
        }}
      >
        <span className="relative z-10">{primaryCta.label}</span>
        <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
        <span className="bg-primary-surface absolute inset-0 z-0 -translate-x-full transition-transform duration-500 group-hover:translate-x-0" />
      </MagneticButton>
    </div>
  );
};
