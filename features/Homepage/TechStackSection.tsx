"use client";
import { motion, useScroll, useTransform } from "motion/react";
import * as React from "react";

import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/section-header";
import { TechStackItem } from "./components/TechStackItem";
import { techStackItems } from "./utils/tech-stack-content";
import { ExperienceHeadlineSegment } from "./utils/experience-content";

const useHorizontalScroll = () => {
  const targetRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-60%`]);
  return { targetRef, scrollYProgress, x };
};

export const techStackCopy = {
  // title: "Where I've Worked",
  eyebrow: "↳ MY TECH STACK",
  headline: [
    { text: "I WORK WITH " },
    { text: "TECHNOLOGIES", accent: true },
    { text: " THAT HELP ME " },
    { text: "CREATE", accent: true },
    { text: " AMAZING", accent: true },
    { text: " RESULTS", accent: true },
    { text: "." },
  ] satisfies ExperienceHeadlineSegment[],
} as const;

export const TechStackSection = () => {
  const { targetRef, x } = useHorizontalScroll();

  return (
    <Container id="tech-stack" aria-label="My tech stack" bleed>
      {/* Mobile: vertical stack — no carousel */}
      <div className="px-4 sm:px-6 md:hidden">
        <div className="mx-auto max-w-7xl">
          <Heading headingId="tech-stack-heading" />
          <div className="flex flex-col gap-6">
            {techStackItems.map((item) => (
              <TechStackItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: sticky horizontal carousel */}
      <div ref={targetRef} className="relative hidden h-[300vh] md:block">
        <div
          id="tech-stack-sticky"
          className="sticky top-0 flex h-screen min-w-0 flex-col gap-4 overflow-x-clip px-4 sm:gap-6 sm:px-6"
        >
          <div className="mx-auto w-full max-w-7xl shrink-0">
            <Heading headingId="tech-stack-heading-desktop" flush />
          </div>
          <div className="flex min-h-0 w-full min-w-0 flex-1 items-center">
            <motion.div
              style={{ x }}
              className="ml-[max(0px,calc((100%-80rem)/2))] flex gap-6"
            >
              {techStackItems.map((item) => (
                <TechStackItem key={item.id} item={item} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </Container>
  );
};

const Heading = ({
  headingId,
  flush = false,
}: {
  headingId?: string;
  flush?: boolean;
}) => {
  return (
    <SectionHeader eyebrow={techStackCopy.eyebrow} flush={flush}>
      <h2
        id={headingId}
        className="text-foreground max-w-4xl text-3xl font-bold tracking-tight uppercase sm:text-5xl lg:max-w-5xl lg:text-6xl"
      >
        {techStackCopy.headline.map((segment, index) => (
          <span
            key={`${segment.text}-${index}`}
            className={segment.accent ? "text-primary" : "text-foreground"}
          >
            {segment.text}
          </span>
        ))}
      </h2>
    </SectionHeader>
  );
};
