"use client";

import { Suspense, type CSSProperties, type ReactNode } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useNearViewport } from "@/hooks/useNearViewport";

type DeferUntilVisibleProps = {
  children: ReactNode;
  fallback: ReactNode;
  className?: string;
  style?: CSSProperties;
  rootMargin?: string;
  /** When set, children load only if this media query matches. */
  mediaQuery?: string;
};

export const DeferUntilVisible = ({
  children,
  fallback,
  className,
  style,
  rootMargin = "400px",
  mediaQuery,
}: DeferUntilVisibleProps) => {
  const mediaMatches = useMediaQuery(mediaQuery);
  const { ref, isNear } = useNearViewport<HTMLDivElement>({
    rootMargin,
    enabled: mediaMatches,
  });
  const shouldLoad = isNear && mediaMatches;

  return (
    <div ref={ref} className={className} style={style}>
      {shouldLoad ? (
        <Suspense fallback={fallback}>{children}</Suspense>
      ) : (
        fallback
      )}
    </div>
  );
};
