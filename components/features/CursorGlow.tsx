"use client";

import * as React from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select';

export const CursorGlow = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const enabled = !prefersReducedMotion;

  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);

  const positionRef = React.useRef({ x: 0, y: 0 });
  const frameRef = React.useRef<number | null>(null);

  const positionTransform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`;

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    positionRef.current = { x: e.clientX, y: e.clientY };

    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(() => {
        setPosition(positionRef.current);
        frameRef.current = null;
      });
    }

    setIsVisible((visible) => (visible ? visible : true));
  }, []);

  React.useEffect(() => {
    if (!enabled) return;

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(INTERACTIVE_SELECTOR);
      setIsHovering((prev) => {
        const next = !!isInteractive;
        return prev === next ? prev : next;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [handleMouseMove, enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div
        className="cursor-glow pointer-events-none hidden lg:block"
        style={{
          transform: positionTransform,
          opacity: isVisible ? 1 : 0,
          width: isHovering ? "500px" : "400px",
          height: isHovering ? "500px" : "400px",
          transition: "opacity 0.4s ease, width 0.3s ease, height 0.3s ease",
        }}
      />
      <div
        className="pointer-events-none fixed top-0 left-0 hidden h-8 w-8 rounded-full mix-blend-screen lg:block"
        style={{
          transform: positionTransform,
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
          opacity: isVisible ? 0.15 : 0,
          transition: "opacity 0.2s ease",
          filter: "blur(4px)",
        }}
      />
    </>
  );
};
