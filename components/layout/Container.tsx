import * as React from "react";

import { cn } from "@/lib/utils";

const spacingClasses = {
  default: "py-12 sm:py-[70px]",
  compact: "py-12 sm:py-16",
} as const;

type ContainerProps = React.ComponentPropsWithoutRef<"section"> & {
  children: React.ReactNode;
  /** Horizontal padding off root — for full-bleed children (e.g. Tech Stack carousel). */
  bleed?: boolean;
  /** Vertical rhythm between sections. */
  spacing?: keyof typeof spacingClasses;
  /**
   * When false, children are not wrapped in max-w-7xl (caller manages width).
   * Defaults to false when `bleed` is set, otherwise true.
   */
  contained?: boolean;
  innerClassName?: string;
};

export const Container = ({
  children,
  bleed = false,
  spacing = "default",
  contained,
  innerClassName,
  className,
  ...props
}: ContainerProps) => {
  const wrapInner = contained ?? !bleed;

  return (
    <section
      className={cn(
        "relative",
        spacingClasses[spacing],
        !bleed && "px-4 sm:px-6",
        className,
      )}
      {...props}
    >
      {wrapInner ? (
        <div className={cn("mx-auto max-w-7xl", innerClassName)}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
};
