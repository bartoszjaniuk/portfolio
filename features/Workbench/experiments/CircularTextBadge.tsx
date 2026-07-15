"use client";

import * as React from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { useRef } from "react";

export type CircularTextBadgeVariant = "primary" | "default";

const variantStyles = {
  primary: {
    ring: "text-foreground/70",
    center: "bg-primary/70 backdrop-blur-md",
    focus: "focus-visible:ring-offset-background",
  },
  default: {
    ring: "text-primary-foreground/70",
    center:
      "bg-primary-foreground/15 text-primary-foreground/80 backdrop-blur-md",
    focus:
      "focus-visible:ring-primary-foreground focus-visible:ring-offset-primary",
  },
} as const;

type CircularTextBadgeProps = {
  text: string;
  variant?: CircularTextBadgeVariant;
  size?: number;
  radius?: number;
  expandedRadius?: number;
  spinDuration?: number;
  className?: string;
  centerClassName?: string;
  center?: React.ReactNode;
  "aria-label"?: string;
};

const circlePath = (cx: number, cy: number, r: number) =>
  `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.001} ${cy - r}`;

const useMagneticHover = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      positionRef.current = { x: x * 0.15, y: y * 0.15 };

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`;
        }
      });
    },
    [ref, positionRef, rafRef],
  );

  const handleMouseLeave = React.useCallback(() => {
    positionRef.current = { x: 0, y: 0 };
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.style.transform = "translate3d(0px, 0px, 0)";
      }
    });
  }, [ref, positionRef, rafRef]);

  return { ref, handleMouseMove, handleMouseLeave };
};

export const CircularTextBadge = ({
  text,
  variant = "primary",
  size = 192,
  radius = 76,
  expandedRadius = 92,
  spinDuration = 8,
  className,
  centerClassName,
  center,
  "aria-label": ariaLabel,
}: CircularTextBadgeProps) => {
  const pathId = React.useId();
  const prefersReducedMotion = usePrefersReducedMotion();
  const centerPoint = size / 2;
  const scaleExpanded = expandedRadius / radius;
  const { ref, handleMouseMove, handleMouseLeave } = useMagneticHover();
  const styles = variantStyles[variant];

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      type="button"
      data-variant={variant}
      aria-label={ariaLabel ?? text}
      className={cn(
        "group relative inline-flex shrink-0 items-center justify-center transition-all ease-out",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2",
        styles.focus,
        className,
      )}
      style={{ width: size, height: size }}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 origin-center",
          !prefersReducedMotion &&
            "animate-[circular-text-spin_var(--ctb-spin-duration)_linear_infinite]",
        )}
        style={
          {
            ["--ctb-spin-duration" as never]: `${spinDuration}s`,
          } as React.CSSProperties
        }
      >
        <svg
          className={cn("size-full overflow-visible", styles.ring)}
          viewBox={`0 0 ${size} ${size}`}
        >
          <defs>
            <path
              id={pathId}
              d={circlePath(centerPoint, centerPoint, radius)}
            />
          </defs>

          <g
            className={cn(
              "origin-center transition-transform duration-500 ease-[cubic-bezier(0.2,0.9,0.2,1)]",
              "motion-reduce:transition-none",
              "group-hover:scale-(--ctb-scale-expanded) group-focus-visible:scale-(--ctb-scale-expanded)",
            )}
            style={
              {
                transformBox: "fill-box",
                transformOrigin: "center",
                ["--ctb-scale-expanded" as never]: String(scaleExpanded),
              } as React.CSSProperties
            }
          >
            <text
              fill="currentColor"
              fontSize={12}
              fontWeight={500}
              letterSpacing="4px"
              className={cn(
                "uppercase transition-[letter-spacing] duration-500 ease-[cubic-bezier(0.2,0.9,0.2,1)]",
                "motion-reduce:transition-none",
              )}
            >
              <textPath href={`#${pathId}`} startOffset="0%">
                {text}
              </textPath>
            </text>
          </g>
        </svg>
      </div>

      <span
        aria-hidden="true"
        className={cn(
          "relative z-10 grid h-[56%] w-[56%] place-items-center rounded-full",
          styles.center,
          centerClassName,
        )}
      >
        {center}
      </span>
    </button>
  );
};
