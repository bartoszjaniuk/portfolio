"use client";

import * as React from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  experienceItems,
  type ExperienceItem,
} from "../utils/experience-content";
import { ExperiencePanel } from "./ExperiencePanel";

const tabId = (id: string) => `experience-tab-${id}`;
const panelId = (id: string) => `experience-panel-${id}`;
const desktopQuery = "(min-width: 768px)";

const useIsDesktopTabs = () => {
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(desktopQuery);
    const sync = () => setIsDesktop(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  return isDesktop;
};

export const ExperienceTabs = () => {
  const [activeId, setActiveId] = React.useState(experienceItems[0].id);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktopTabs();
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  const activeIndex = experienceItems.findIndex((item) => item.id === activeId);
  const activeJob: ExperienceItem =
    experienceItems[activeIndex] ?? experienceItems[0];

  const focusTabAt = (index: number) => {
    const next = (index + experienceItems.length) % experienceItems.length;
    const nextItem = experienceItems[next];
    setActiveId(nextItem.id);
    tabRefs.current[next]?.focus();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        focusTabAt(index + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        focusTabAt(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTabAt(0);
        break;
      case "End":
        event.preventDefault();
        focusTabAt(experienceItems.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col gap-8 md:flex-row md:gap-10 lg:gap-12">
      <div
        role="tablist"
        aria-label="Companies"
        aria-orientation={isDesktop ? "vertical" : "horizontal"}
        className={cn(
          "relative flex shrink-0 overflow-x-auto",
          "border-border border-b md:flex-col md:overflow-visible md:border-b-0 md:border-l",
        )}
      >
        {experienceItems.map((item, index) => {
          const isActive = item.id === activeId;

          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={tabId(item.id)}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId(item.id)}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                "relative shrink-0 px-5 py-3 text-left font-mono text-sm whitespace-nowrap transition-colors",
                "focus-visible:ring-ring/50 focus-visible:z-10 focus-visible:ring-2 focus-visible:outline-none",
                "md:w-44 md:px-5 md:py-3",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              )}
            >
              {isActive && !prefersReducedMotion && (
                <motion.span
                  layoutId="experience-active-indicator"
                  aria-hidden
                  className={cn(
                    "bg-primary absolute",
                    "inset-x-0 bottom-0 h-0.5",
                    "md:inset-y-0 md:-left-px md:h-auto md:w-0.5",
                  )}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {isActive && prefersReducedMotion && (
                <span
                  aria-hidden
                  className={cn(
                    "bg-primary absolute",
                    "inset-x-0 bottom-0 h-0.5",
                    "md:inset-y-0 md:-left-px md:h-auto md:w-0.5",
                  )}
                />
              )}
              {item.company}
            </button>
          );
        })}
      </div>

      <ExperiencePanel
        job={activeJob}
        panelId={panelId(activeJob.id)}
        labelledBy={tabId(activeJob.id)}
      />
    </div>
  );
};
