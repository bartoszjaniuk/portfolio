"use client";

import { CircularTextBadge } from "@/features/Workbench/experiments/CircularTextBadge";
import { ScrollImageRevealY } from "@/features/Workbench/experiments/ScrollImageRevealY";

export const WorkbenchStage = () => {
  return (
    <section className="px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <div className="bg-background/95 border-border/70 flex items-center justify-center rounded-md border p-10">
          <CircularTextBadge text="ILLUSTRATION / UX / DEVELOPMENT • BRANDING •" />
        </div>
        <ScrollImageRevealY />
      </div>
    </section>
  );
};
