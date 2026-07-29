"use client";

import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import * as React from "react";

import { RevealImage } from "@/components/features/RevealImage";

export default function RevealOnScrollPage() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scrollRoot, setScrollRoot] = React.useState<HTMLDivElement | null>(
    null,
  );
  const scrollRootRef = React.useMemo(
    () => (scrollRoot ? { current: scrollRoot } : undefined),
    [scrollRoot],
  );
  const { scrollYProgress } = useScroll({
    container: scrollRootRef,
  });
  const handleContainerRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      setScrollRoot(node);
    },
    [],
  );

  return (
    <section className="px-4 pb-16 sm:px-6 sm:pt-24 sm:pb-24">
      <div
        ref={handleContainerRef}
        id="scroll-container"
        className="border-primary relative mx-auto h-[min(620px,80vh)] max-w-7xl overflow-y-auto overscroll-contain rounded-md border"
      >
        <div className="relative min-h-[200vh]">
          <ProgressBar scrollYProgress={scrollYProgress} />

          <ImageRevealContainer containerRef={containerRef} />
        </div>
      </div>
    </section>
  );
}

const ImageRevealContainer = ({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div className="relative min-h-[200vh]">
      <RevealImage
        containerRef={containerRef}
        once={false}
        src="/images/forest1.avif"
        alt="Mando image"
        width={400}
        height={400}
        className="border-border/70 absolute top-32 left-[8%] w-[min(400px,42vw)] rounded-none border"
      />

      <RevealImage
        containerRef={containerRef}
        once={false}
        src="/images/forest2.avif"
        alt="Shrek image"
        width={400}
        height={400}
        className="border-border/70 absolute top-[500px] right-[8%] w-[min(400px,42vw)] rounded-none border"
      />

      <RevealImage
        containerRef={containerRef}
        once={false}
        src="/images/forest3.avif"
        alt="Shrek image"
        width={400}
        height={400}
        className="border-border/70 absolute top-[800px] left-[8%] w-[min(400px,42vw)] rounded-none border"
      />

      <RevealImage
        containerRef={containerRef}
        once={false}
        src="/images/forest4.avif"
        alt="Shrek image"
        width={400}
        height={400}
        className="border-border/70 absolute top-[1200px] right-[8%] w-[min(400px,42vw)] rounded-none border"
      />
    </div>
  );
};

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
