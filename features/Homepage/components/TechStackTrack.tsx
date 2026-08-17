"use client";

import dynamic from "next/dynamic";

import { DeferUntilVisible } from "@/components/features/DeferUntilVisible";

import { TechStackItem } from "./TechStackItem";
import type { TechStackTrackProps } from "./TechStackTrackMotion";

const MD_MIN_WIDTH_QUERY = "(min-width: 768px)";

export type { TechStackTrackProps };

const TechStackTrackMotion = dynamic(
  () => import("./TechStackTrackMotion").then((m) => m.TechStackTrackMotion),
  { ssr: false },
);

function TechStackTrackPlaceholder({ items, heading }: TechStackTrackProps) {
  return (
    <div className="relative hidden h-[300vh] md:block">
      <div
        id="tech-stack-sticky"
        className="sticky top-0 flex h-screen min-w-0 flex-col gap-4 overflow-x-clip px-4 sm:gap-6 sm:px-6"
      >
        <div className="mx-auto w-full max-w-7xl shrink-0">{heading}</div>
        <div className="flex min-h-0 w-full min-w-0 flex-1 items-center">
          <div className="ml-[max(0px,calc((100%-80rem)/2))] flex gap-6">
            {items.map((item) => (
              <TechStackItem key={item.key} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Desktop sticky horizontal carousel — loaded at md+ when near the viewport. */
export function TechStackTrack(props: TechStackTrackProps) {
  return (
    <DeferUntilVisible
      mediaQuery={MD_MIN_WIDTH_QUERY}
      fallback={<TechStackTrackPlaceholder {...props} />}
    >
      <TechStackTrackMotion {...props} />
    </DeferUntilVisible>
  );
}
