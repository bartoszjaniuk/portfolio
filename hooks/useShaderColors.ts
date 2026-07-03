"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export type ShaderColors = {
  primary: string;
  swirlA: string;
  swirlB: string;
};

const FALLBACK_LIGHT: ShaderColors = {
  primary: "#6d28d9",
  swirlA: "#ffffff",
  swirlB: "#ede9fe",
};

const FALLBACK_DARK: ShaderColors = {
  primary: "#a78bfa",
  swirlA: "#050508",
  swirlB: "#1a1235",
};

const readCssColor = (variable: string): string => {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();

  if (!raw) return "";

  if (raw.startsWith("#")) {
    return raw;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  ctx.fillStyle = raw;
  const normalized = ctx.fillStyle;

  if (normalized.startsWith("#")) {
    return normalized;
  }

  const parts = normalized.match(/\d+/g);
  if (!parts || parts.length < 3) {
    return "";
  }

  return `#${parts
    .slice(0, 3)
    .map((value) => parseInt(value, 10).toString(16).padStart(2, "0"))
    .join("")}`;
};

const readShaderColors = (isDark: boolean): ShaderColors => {
  const fallback = isDark ? FALLBACK_DARK : FALLBACK_LIGHT;

  return {
    primary: readCssColor("--shader-primary") || fallback.primary,
    swirlA: readCssColor("--shader-swirl-a") || fallback.swirlA,
    swirlB: readCssColor("--shader-swirl-b") || fallback.swirlB,
  };
};

export const useShaderColors = (): ShaderColors => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [colors, setColors] = useState(isDark ? FALLBACK_DARK : FALLBACK_LIGHT);

  useEffect(() => {
    const updateColors = () => {
      const dark = document.documentElement.classList.contains("dark");
      setColors(readShaderColors(dark));
    };

    updateColors();

    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    return () => observer.disconnect();
  }, [resolvedTheme]);

  return colors;
};
