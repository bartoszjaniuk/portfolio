"use client";

import { motion, useScroll, useTransform } from "motion/react";
import * as React from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type RevealImage = {
  id: string;
  title: string;
  caption: string;
  aspect: string;
  objectPosition: string;
  className?: string;
};

const revealImages: RevealImage[] = [
  {
    id: "threshold",
    title: "Threshold",
    caption: "clip-path opens as the target enters the viewport",
    aspect: "aspect-[4/3]",
    objectPosition: "center 42%",
    className: "lg:ml-16",
  },
  {
    id: "curtain",
    title: "Curtain",
    caption: "image scale relaxes while the mask expands",
    aspect: "aspect-[16/10]",
    objectPosition: "center 50%",
    className: "lg:mr-12 lg:self-end",
  },
  {
    id: "settle",
    title: "Settle",
    caption: "the frame is stable; only the mask and inner image change",
    aspect: "aspect-[3/4]",
    objectPosition: "center 58%",
    className: "lg:ml-32",
  },
  {
    id: "finish",
    title: "Finish",
    caption: "the reveal completes before the image leaves the viewport",
    aspect: "aspect-[16/9]",
    objectPosition: "center 48%",
    className: "lg:mr-20 lg:self-end",
  },
];

export const ScrollImageRevealY = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="bg-background/95 relative h-[620px] w-full overflow-y-auto overscroll-contain rounded-md"
      aria-label="scroll image reveal y animation"
    >
      <div className="mx-auto flex min-h-[2100px] max-w-5xl flex-col gap-28 px-6 py-24 sm:px-10 sm:py-28">
        <header>
          <p className="text-primary text-xs font-semibold tracking-[0.24em] uppercase">
            Scroll Image Reveal
          </p>
          <h3 className="text-foreground font-heading mt-3 text-3xl sm:text-5xl">
            clip-path curtain
          </h3>
        </header>

        {revealImages.map((image) => (
          <RevealImagePanel
            key={image.id}
            image={image}
            scrollContainer={containerRef}
          />
        ))}
      </div>
    </div>
  );
};

const RevealImagePanel = ({
  image,
  scrollContainer,
}: {
  image: RevealImage;
  scrollContainer: React.RefObject<HTMLDivElement | null>;
}) => {
  const targetRef = React.useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    container: scrollContainer,
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.25, 0.58, 1],
    [
      "inset(0% 40% 0% 40%)", // (gora, prawo, dol, lewo)
      "inset(0% 20% 0% 20%)", // obraz jest widoczny na początku, ale nie jest skalowany
      "inset(0% 0% 0% 0%)", // obraz jest skalowany i jest widoczny na środku
      "inset(0% 0% 0% 0%)", // obraz jest skalowany i jest widoczny na końcu
    ],
  );

  const scale = useTransform(scrollYProgress, [0, 0.58, 1], [1.3, 1.05, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], [44, -44]);

  return (
    <article
      ref={targetRef}
      className={cn("w-full max-w-2xl sm:max-w-3xl", image.className)}
    >
      <motion.div
        className={cn(
          "reveal-mask border-border/70 bg-card/80 relative overflow-hidden rounded-md border shadow-2xl shadow-black/20",
          image.aspect,
        )}
        style={{
          clipPath: prefersReducedMotion ? "inset(0% 0% 0% 0%)" : clipPath,
        }}
      >
        <motion.img
          src="/mando.jpeg"
          alt=""
          className="h-full w-full object-cover grayscale"
          style={{
            objectPosition: image.objectPosition,
            scale: prefersReducedMotion ? 1 : scale,
            y: prefersReducedMotion ? 0 : y,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,var(--primary)_0,transparent_28%)] opacity-35 mix-blend-screen" />
      </motion.div>

      <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <h4 className="text-foreground text-xl font-black">{image.title}</h4>
        <p className="text-muted-foreground max-w-sm text-[10px] tracking-[0.18em] uppercase">
          {image.caption}
        </p>
      </div>
    </article>
  );
};
