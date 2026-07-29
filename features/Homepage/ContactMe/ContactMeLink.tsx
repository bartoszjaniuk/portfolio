"use client";

import { motion, useInView, type UseInViewOptions } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { localizeHref, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

const DEFAULT_IN_VIEW_AMOUNT = 0.2;
const DEFAULT_IN_VIEW_MARGIN = "0px 0px -8% 0px" satisfies NonNullable<
  UseInViewOptions["margin"]
>;
const UNDERLINE_DURATION = 0.6;
const UNDERLINE_EASE = [0.22, 1, 0.36, 1] as const;

export type ContactMeLinkProps = {
  locale: Locale;
};

// TODO: Localize label
export const ContactMeLink = ({ locale }: ContactMeLinkProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isInView = useInView(ref, {
    once: false,
    amount: DEFAULT_IN_VIEW_AMOUNT,
    margin: DEFAULT_IN_VIEW_MARGIN,
  });

  return (
    <Link
      ref={ref}
      href={localizeHref(locale, "/contact-me")}
      className={cn(
        "text-primary-foreground relative mt-8 inline-block w-fit font-bold tracking-tight",
        "text-5xl sm:text-7xl lg:text-9xl",
        "focus-visible:ring-ring focus-visible:ring-offset-primary outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-offset-2",
      )}
    >
      <span className="relative inline-block pb-1 uppercase">
        Contact me
        <motion.span
          aria-hidden
          className="absolute bottom-0 left-0 h-2 w-full origin-left bg-current"
          initial={false}
          animate={{ scaleX: isInView ? 1 : 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : UNDERLINE_DURATION,
            ease: UNDERLINE_EASE,
          }}
        />
      </span>
    </Link>
  );
};
