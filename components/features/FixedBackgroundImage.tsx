"use client";

import Image, { type ImageProps } from "next/image";
import { type ReactNode, useLayoutEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { div } from "motion/react-client";

type FixedBackgroundImageProps = {
  src: ImageProps["src"];
  children?: ReactNode;

  /**
   * Obraz działa jak CSS background-image,
   * dlatego zazwyczaj powinien być dekoracyjny.
   */
  alt?: string;

  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  contentClassName?: string;

  sizes?: string;
  quality?: number;
  preload?: boolean;
};

export function FixedBackgroundImage({
  src,
  children,
  alt = "",
  className,
  imageClassName,
  overlayClassName,
  contentClassName,
  sizes = "300px",
  quality = 80,
  preload = false,
}: FixedBackgroundImageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  return (
    <div id="wrapper" className={cn("w-24", className)}>
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}
