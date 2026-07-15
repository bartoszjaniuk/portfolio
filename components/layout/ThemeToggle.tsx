"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import { SunIcon, MoonIcon, MonitorIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex h-8 w-8 items-center justify-center">
        <div className="bg-muted h-4 w-4 animate-pulse rounded" />
      </div>
    );
  }

  const themes = [
    { value: "light", icon: SunIcon, label: "Light" },
    { value: "dark", icon: MoonIcon, label: "Dark" },
  ];

  // Handle undefined theme - default to "dark" as per layout.tsx defaultTheme
  const currentTheme = theme ?? "dark";

  // Determine which icon to show based on resolved theme (what user actually sees)
  let CurrentIcon: typeof SunIcon | typeof MoonIcon | typeof MonitorIcon;
  if (currentTheme === "system") {
    CurrentIcon = MonitorIcon;
  } else {
    // Use resolvedTheme for icon when available (handles system theme case)
    const displayTheme = resolvedTheme ?? currentTheme;
    const themeIndex = themes.findIndex((t) => t.value === displayTheme);
    CurrentIcon = themes[themeIndex >= 0 ? themeIndex : 0]?.icon || MoonIcon;
  }

  // For next theme, cycle through available themes based on current theme setting
  // If current theme is "system" or not in themes array, start from "light"
  const themeIndex = themes.findIndex((t) => t.value === currentTheme);
  const nextIndex = themeIndex >= 0 ? (themeIndex + 1) % themes.length : 0;
  const nextTheme = themes[nextIndex];

  return (
    <button
      onClick={() => setTheme(nextTheme.value)}
      className={cn(
        "group relative flex size-8 items-center justify-center rounded",
        "text-muted-foreground hover:text-primary transition-all duration-200",
      )}
      aria-label={`Switch to ${nextTheme.label} theme`}
    >
      <CurrentIcon className="size-4" />
      <span className="bg-card text-muted-foreground absolute -bottom-6 left-1/2 -translate-x-1/2 rounded px-2 py-0.5 text-[10px] whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {resolvedTheme ?? currentTheme}
      </span>
    </button>
  );
}
