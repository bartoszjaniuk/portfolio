"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { DeferUntilVisible } from "./DeferUntilVisible";
import type { ParallaxImageProps } from "./ParallaxImageMotion";

export type { ParallaxImageProps };

export const OverlayComponent = () => {
  return <div aria-hidden="true" className={"absolute inset-0 bg-black/45"} />;
};

const ParallaxImageMotion = dynamic(
  () => import("./ParallaxImageMotion").then((m) => m.ParallaxImageMotion),
  { ssr: false },
);

const ParallaxImageStatic = ({
  src,
  alt,
  overlayComponent,
  sizes = "(max-width: 768px) 100vw, 700px",
}: Omit<ParallaxImageProps, "containerClassName">) => {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 bottom-0 z-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
      {overlayComponent ? overlayComponent : null}
    </>
  );
};

export const ParallaxImage = (props: ParallaxImageProps) => {
  const { containerClassName = "h-[300px] w-[300px]", ...imageProps } = props;

  return (
    <DeferUntilVisible
      className={cn("relative isolate overflow-hidden", containerClassName)}
      fallback={<ParallaxImageStatic {...imageProps} />}
    >
      <ParallaxImageMotion {...imageProps} containerClassName="h-full w-full" />
    </DeferUntilVisible>
  );
};
