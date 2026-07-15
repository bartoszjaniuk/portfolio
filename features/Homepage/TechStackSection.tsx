"use client";
import { motion, useScroll, useTransform } from "motion/react";
import * as React from "react";

import { TechStackItem } from "./components/TechStackItem";
import { techStackItems } from "./utils/tech-stack-content";

const useHorizontalScroll = () => {
  const targetRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-60%`]);
  return { targetRef, scrollYProgress, x };
};

export const TechStackSection = () => {
  const { targetRef, x } = useHorizontalScroll();

  return (
    <section className="relative px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24">
      <div ref={targetRef} className="relative mx-auto h-[300vh] max-w-7xl">
        <h1 className="text-center text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
          Pracuje w nowoczesnych technologiach
        </h1>
        <div className="sticky top-0 flex h-screen items-center">
          <motion.div style={{ x }} className="flex gap-6 px-16">
            {techStackItems.map((item) => (
              <TechStackItem key={item.id} item={item} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
