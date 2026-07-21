"use client";

import { motion, useInView } from "motion/react";
import Image from "next/image";
import * as React from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const REVEAL_EASE = [0.86, 0, 0.31, 1] as const;
const REVEAL_DURATION = 1.5;
const DEFAULT_IN_VIEW_AMOUNT = 0.2;
const DEFAULT_IN_VIEW_MARGIN = "0px 0px -8% 0px" as const;

type RevealImageBase = {
  src: string;
  alt: string;
  className?: string;
  /** Classes applied to the inner `next/image` (e.g. hover scale). */
  imageClassName?: string;
  /**
   * Scroll root for `useInView`. Pass for nested scroll containers
   * (workbench). Omit on the homepage so the viewport is used.
   */
  containerRef?: React.RefObject<Element | null>;
  /**
   * When true (default for viewport scroll), reveal only once.
   * Nested scroll demos typically pass `false` to match workbench behavior.
   */
  once?: boolean;
  /** Override `useInView` amount (default `0.2`). */
  amount?: number | "some" | "all";
  /** Override `useInView` root margin (default `"0px 0px -8% 0px"`). */
  margin?: string;
};

type RevealImageFill = RevealImageBase & {
  fill: true;
  sizes: string;
  width?: never;
  height?: never;
};

type RevealImageIntrinsic = RevealImageBase & {
  fill?: false;
  sizes?: string;
  width: number;
  height: number;
};

export type RevealImageProps = RevealImageFill | RevealImageIntrinsic;

export const RevealImage = ({
  src,
  alt,
  className,
  imageClassName,
  containerRef,
  once,
  amount,
  margin,
  fill = false,
  sizes,
  ...dimensions
}: RevealImageProps) => {
  const imageRef = React.useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const onceResolved = once ?? !containerRef;
  const isInView = useInView(imageRef, {
    root: containerRef,
    amount: amount ?? DEFAULT_IN_VIEW_AMOUNT,
    margin: margin ?? DEFAULT_IN_VIEW_MARGIN,
    once: onceResolved,
  });
  const isRevealed = prefersReducedMotion || isInView;

  const width = "width" in dimensions ? dimensions.width : undefined;
  const height = "height" in dimensions ? dimensions.height : undefined;

  return (
    <figure
      ref={imageRef}
      className={cn(
        "relative m-0 overflow-hidden",
        fill && "h-full w-full",
        className,
      )}
    >
      <motion.div
        className={cn(
          "origin-center will-change-[clip-path,opacity,scale]",
          fill && "absolute inset-0",
        )}
        initial={false}
        animate={{
          opacity: isRevealed ? 1 : 0,
          scale: isRevealed ? 1 : 2,
          clipPath: isRevealed
            ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
            : "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : REVEAL_DURATION,
          ease: REVEAL_EASE,
        }}
      >
        {fill ? (
          <Image
            loading="lazy"
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className={cn("object-cover", imageClassName)}
          />
        ) : (
          <Image
            loading="lazy"
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes ?? `${width}px`}
            className={cn("block h-auto w-full", imageClassName)}
          />
        )}
      </motion.div>
    </figure>
  );
};
