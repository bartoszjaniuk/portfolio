"use client";

import { useShaderColors } from "@/hooks/useShaderColors";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ChromaFlow, Shader, Swirl, Blob } from "shaders/react";

const subscribeToMount = (onStoreChange: () => void) => {
  queueMicrotask(onStoreChange);
  return () => {};
};

const getMountedSnapshot = () => true;
const getMountedServerSnapshot = () => false;

export const ShaderBackground = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { resolvedTheme } = useTheme();
  const colors = useShaderColors();
  const shaderContainerRef = useRef<HTMLDivElement>(null);
  const isMounted = useSyncExternalStore(
    subscribeToMount,
    getMountedSnapshot,
    getMountedServerSnapshot,
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    if (!isMounted) return;

    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas");
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true);
          return true;
        }
      }
      return false;
    };

    if (checkShaderReady()) return;

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId);
      }
    }, 100);

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    return () => {
      clearInterval(intervalId);
      clearTimeout(fallbackTimer);
    };
  }, [isMounted]);

  if (!isMounted || prefersReducedMotion) {
    return null;
  }

  const overlayOpacity = isDark ? "bg-background/40" : "bg-background/10";

  return (
    <div
      ref={shaderContainerRef}
      className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      style={{ contain: "strict" }}
      aria-hidden
    >
      <Shader key={resolvedTheme} className="h-full w-full">
        <Swirl
          colorA={colors.swirlA}
          colorB={colors.swirlB}
          speed={0.4}
          detail={0.4}
          blend={28}
          coarseX={40}
          coarseY={40}
          mediumX={40}
          mediumY={40}
          fineX={40}
          fineY={40}
          colorSpace={"linear"} // "linear" | "oklch" | "oklab" | "hsl" | "hsv" | "lch"
        />
        <Blob
          colorA={colors.primary}
          colorB={colors.primary}
          size={0.4}
          center={{ x: 0.75, y: 0.5 }} // prawa strona, pionowo na środku

          blend={28}
          opacity={0.8}
          radius={1.2}
          maskType="alpha"
        />
        <ChromaFlow
          baseColor={colors.primary}
          upColor={colors.primary}
          downColor={colors.primary}
          leftColor={colors.primary}
          rightColor={colors.primary}
          intensity={isDark ? 0.75 : 0.9}
          radius={1.8}
          momentum={25}
          maskType="alpha"
          opacity={isDark ? 0.88 : 0.95}
        />
      </Shader>
      <div className={`absolute inset-0 ${overlayOpacity}`} />
    </div>
  );
};
