"use client";

import { motion, useScroll, useTransform } from "motion/react";
import * as React from "react";

import { TechStackItem, type TechStackItemView } from "./TechStackItem";

const useHorizontalScroll = () => {
  const targetRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  return { targetRef, x };
};

export type TechStackTrackProps = {
  items: TechStackItemView[];
  heading: React.ReactNode;
};

/** Desktop sticky horizontal carousel — scroll/motion island only. */
export function TechStackTrack({ items, heading }: TechStackTrackProps) {
  const { targetRef, x } = useHorizontalScroll();

  return (
    <div ref={targetRef} className="relative hidden h-[300vh] md:block">
      <div
        id="tech-stack-sticky"
        className="sticky top-0 flex h-screen min-w-0 flex-col gap-4 overflow-x-clip px-4 sm:gap-6 sm:px-6"
      >
        <div className="mx-auto w-full max-w-7xl shrink-0">{heading}</div>
        <div className="flex min-h-0 w-full min-w-0 flex-1 items-center">
          <motion.div
            style={{ x }}
            className="ml-[max(0px,calc((100%-80rem)/2))] flex gap-6"
          >
            {items.map((item) => (
              <TechStackItem key={item.key} item={item} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
