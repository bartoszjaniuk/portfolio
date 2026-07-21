"use client";

import type React from "react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

type MagneticButtonProps = Omit<
  React.ComponentProps<"button">,
  "onMouseMove" | "onMouseLeave"
> & {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "lg";
};

export function MagneticButton({
  children,
  className = "",
  variant = "primary",
  size = "default",
  style,
  type = "button",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
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
  };

  const handleMouseLeave = () => {
    positionRef.current = { x: 0, y: 0 };
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.style.transform = "translate3d(0px, 0px, 0)";
      }
    });
  };

  const variants = {
    primary:
      "border-primary bg-primary/10 text-primary hover:bg-primary-surface hover:text-primary-foreground",
    secondary:
      "border-border bg-transparent text-muted-foreground hover:border-foreground hover:bg-secondary/50 hover:text-foreground",
    ghost: "border-transparent bg-transparent text-foreground hover:bg-muted",
  };

  const sizes = {
    default: "px-6 py-2.5 text-sm",
    lg: "px-5 py-3 text-sm sm:px-7 sm:py-3.5",
  };

  return (
    <button
      ref={ref}
      type={type}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group focus-visible:border-ring focus-visible:ring-ring/50 relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-lg border font-medium transition-all duration-300 ease-out outline-none select-none focus-visible:ring-[3px] active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      style={{
        transform: "translate3d(0px, 0px, 0)",
        contain: "layout style paint",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
