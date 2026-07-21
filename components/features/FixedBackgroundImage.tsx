"use client";

import Image, { type ImageProps } from "next/image";
import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

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
  sizes = "100vw",
  quality = 80,
}: FixedBackgroundImageProps) {
  return (
    <div className={cn("relative w-24", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        className={cn("object-cover", imageClassName)}
      />
      {overlayClassName ? (
        <div aria-hidden className={cn("absolute inset-0", overlayClassName)} />
      ) : null}
      {children ? (
        <div className={cn("relative z-10", contentClassName)}>{children}</div>
      ) : null}
    </div>
  );
}
