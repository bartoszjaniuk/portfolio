"use client";
import { cn } from "@/lib/utils";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";

type ParallaxImageProps = {
  overlayComponent?: React.ReactNode;
  src: string;
  alt: string;
  containerClassName?: string;
};

export const OverlayComponent = () => {
  return <div aria-hidden="true" className={"absolute inset-0 bg-black/45"} />;
};

export const ParallaxImage = ({
  src,
  alt,
  overlayComponent,
  containerClassName = "h-[300px] w-[300px]",
}: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <div
      ref={ref}
      className={cn("relative isolate overflow-hidden", containerClassName)}
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 bottom-0 z-0 will-change-transform"
        style={{ y: prefersReducedMotion ? 0 : parallaxY }}
      >
        <Image
          sizes="100vw"
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </motion.div>

      {overlayComponent ? overlayComponent : null}
    </div>
  );
};
