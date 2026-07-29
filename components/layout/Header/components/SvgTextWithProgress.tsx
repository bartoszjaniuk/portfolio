"use client";

import { useScroll, useTransform, motion } from "motion/react";

export function SvgTextWithProgress({ brandName }: { brandName: string }) {
  const { scrollYProgress } = useScroll();
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative inline-block select-none">
      <span className="text-muted-foreground font-heading text-xl leading-none tracking-tight">
        {brandName}
      </span>
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ width }}
      >
        <span className="text-primary font-heading text-xl leading-none tracking-tight whitespace-nowrap">
          {brandName}
        </span>
      </motion.div>
    </div>
  );
}
