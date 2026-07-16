"use client";

import { AnimatePresence, motion } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { ExperienceItem } from "../utils/experience-content";

type ExperiencePanelProps = {
  job: ExperienceItem;
  panelId: string;
  labelledBy: string;
};

export const ExperiencePanel = ({
  job,
  panelId,
  labelledBy,
}: ExperiencePanelProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const content = (
    <>
      <h3 className="text-foreground font-sans text-xl font-semibold tracking-tight normal-case sm:text-2xl">
        <span>{job.role}</span>
        <span className="text-primary">
          {" @ "}
          <a
            href={job.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible:ring-ring/50 transition-colors hover:underline focus-visible:rounded-sm focus-visible:ring-2 focus-visible:outline-none"
          >
            {job.companyFull}
          </a>
        </span>
      </h3>

      <p className="text-muted-foreground mt-2 font-mono text-xs sm:text-sm">
        {job.range}
      </p>

      <ul className="mt-6 space-y-4">
        {job.bullets.map((bullet) => (
          <li
            key={bullet}
            className="text-muted-foreground flex gap-3 text-sm leading-relaxed sm:text-base"
          >
            <span aria-hidden className="text-primary mt-1 shrink-0">
              ▹
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </>
  );

  if (prefersReducedMotion) {
    return (
      <div
        id={panelId}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={labelledBy}
        className="min-w-0 flex-1 outline-none"
      >
        {content}
      </div>
    );
  }

  return (
    <div
      id={panelId}
      role="tabpanel"
      tabIndex={0}
      aria-labelledby={labelledBy}
      className="min-w-0 flex-1 outline-none"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={job.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          {content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
