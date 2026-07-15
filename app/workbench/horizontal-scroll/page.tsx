"use client";
import Image from "next/image";

import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import * as React from "react";

const images = [
  { src: "/images/forest1.avif", alt: "Forest landscape 1" },
  { src: "/images/forest2.avif", alt: "Forest landscape 2" },
  { src: "/images/forest3.avif", alt: "Forest landscape 3" },
  { src: "/images/forest4.avif", alt: "Forest landscape 4" },
] as const;

export default function HorizontalScrollPage() {
  const targetRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);

  return (
    <section className="px-4 pb-16 sm:px-6 sm:pt-24 sm:pb-24">
      <div ref={targetRef} className="relative h-[300vh]">
        <ProgressBar scrollYProgress={scrollYProgress} />

        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-4 px-16">
            {images.map((image) => (
              <div
                key={image.src}
                className="relative h-[min(400px,70vh)] w-[min(800px,70vw)] shrink-0 overflow-hidden rounded-md border"
              >
                <Image
                  loading="lazy"
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="400px"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const ProgressBar = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
  });

  const percent = useTransform(
    smoothProgress,
    (v) => `${Math.round(v * 100)}%`,
  );

  return (
    <div className="pointer-events-none sticky top-0 z-20 h-0">
      <motion.div className="absolute top-4 right-4 px-3 py-2 text-xs tabular-nums backdrop-blur-md">
        <motion.span>{percent}</motion.span>
      </motion.div>
    </div>
  );
};
