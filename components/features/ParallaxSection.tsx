"use client";

import Image, { type StaticImageData } from "next/image";
import { type ReactNode, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";

type ParallaxSectionProps = {
  src: string | StaticImageData;
  alt?: string;
  children?: ReactNode;

  className?: string;
  imageClassName?: string;
  contentClassName?: string;
  overlayClassName?: string;

  priority?: boolean;
  strength?: number;
};

export function ParallaxSection({
  src,
  alt = "",
  children,
  className,
  imageClassName,
  contentClassName,
  overlayClassName,
  priority = false,
  strength = 80,
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [-strength, strength],
  );

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative isolate min-h-[70svh] overflow-hidden",
        className,
      )}
    >
      {/* Obraz jest większy od sekcji, aby ruch nie odsłaniał pustych miejsc */}
      <motion.div
        aria-hidden={alt === ""}
        className="pointer-events-none absolute inset-x-0 -top-[18%] -bottom-[18%] z-0 will-change-transform"
        style={{
          y: prefersReducedMotion ? 0 : parallaxY,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className={cn("object-cover", imageClassName)}
        />
      </motion.div>

      {overlayClassName && (
        <div
          aria-hidden="true"
          className={cn("absolute inset-0 z-10", overlayClassName)}
        />
      )}

      <div className={cn("relative z-20", contentClassName)}>{children}</div>
    </section>
  );
}
