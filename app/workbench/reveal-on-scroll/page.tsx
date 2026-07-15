"use client";
import Image from "next/image";

import {
  motion,
  MotionValue,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import * as React from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type RevealImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
};

const RevealImage = ({
  src,
  alt,
  width,
  height,
  className,
  containerRef,
}: RevealImageProps) => {
  const imageRef = React.useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isInView = useInView(imageRef, {
    root: containerRef,
    amount: 0.2,
    margin: "0px 0px -8% 0px",
  });
  const isRevealed = prefersReducedMotion || isInView;

  return (
    <figure
      ref={imageRef}
      className={cn(
        "border-border/70 relative m-0 overflow-hidden rounded-none border",
        className,
      )}
    >
      <motion.div
        className="origin-center will-change-[clip-path,opacity,scale]"
        initial={false}
        animate={{
          opacity: isRevealed ? 1 : 0,
          scale: isRevealed ? 1 : 2,
          clipPath: isRevealed
            ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
            : "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 1.5,
          ease: [0.86, 0, 0.31, 1],
        }}
      >
        <Image
          loading="lazy"
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={`${width}px`}
          className="block h-auto w-full"
        />
      </motion.div>
    </figure>
  );
};

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
        src="/images/forest1.avif"
        alt="Mando image"
        width={400}
        height={400}
        className="absolute top-32 left-[8%] w-[min(400px,42vw)]"
      />

      <RevealImage
        containerRef={containerRef}
        src="/images/forest2.avif"
        alt="Shrek image"
        width={400}
        height={400}
        className="absolute top-[500px] right-[8%] w-[min(400px,42vw)]"
      />

      <RevealImage
        containerRef={containerRef}
        src="/images/forest3.avif"
        alt="Shrek image"
        width={400}
        height={400}
        className="absolute top-[800px] left-[8%] w-[min(400px,42vw)]"
      />

      <RevealImage
        containerRef={containerRef}
        src="/images/forest4.avif"
        alt="Shrek image"
        width={400}
        height={400}
        className="absolute top-[1200px] right-[8%] w-[min(400px,42vw)]"
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
