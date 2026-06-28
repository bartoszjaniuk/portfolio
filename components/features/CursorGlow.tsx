"use client";

import * as React from "react";

export const CursorGlow = () => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
    });
    setIsVisible(true);
  }, []);

  React.useEffect(() => {
    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(
        'a, button, [role="button"], input, textarea, select',
      );
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [handleMouseMove]);

  return (
    <>
      <div
        className="cursor-glow pointer-events-none hidden lg:block"
        style={{
          left: position.x,
          top: position.y,
          opacity: isVisible ? 1 : 0,
          width: isHovering ? "500px" : "400px",
          height: isHovering ? "500px" : "400px",
          transition: "opacity 0.4s ease, width 0.3s ease, height 0.3s ease",
        }}
      />
      <div
        className="pointer-events-none fixed hidden h-8 w-8 rounded-full mix-blend-screen lg:block"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
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
