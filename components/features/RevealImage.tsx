"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { DeferUntilVisible } from "./DeferUntilVisible";
import type { RevealImageProps } from "./RevealImageMotion";

export type { RevealImageProps };

const RevealImageMotion = dynamic(
  () => import("./RevealImageMotion").then((m) => m.RevealImageMotion),
  { ssr: false },
);

const RevealImageStatic = ({
  src,
  alt,
  className,
  imageClassName,
  fill = false,
  sizes,
  ...dimensions
}: RevealImageProps) => {
  const width = "width" in dimensions ? dimensions.width : undefined;
  const height = "height" in dimensions ? dimensions.height : undefined;

  return (
    <figure
      className={cn("relative m-0 h-full w-full overflow-hidden", className)}
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
    </figure>
  );
};

export const RevealImage = (props: RevealImageProps) => {
  const { className, fill = false } = props;
  const width = "width" in props ? props.width : undefined;
  const height = "height" in props ? props.height : undefined;

  return (
    <DeferUntilVisible
      className={cn(
        "relative m-0 overflow-hidden",
        fill && "h-full w-full",
        className,
      )}
      style={
        !fill && width && height
          ? { aspectRatio: `${width} / ${height}` }
          : undefined
      }
      fallback={<RevealImageStatic {...props} className="h-full w-full" />}
    >
      <RevealImageMotion {...props} className="h-full w-full" />
    </DeferUntilVisible>
  );
};
