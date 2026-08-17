import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useSaveData } from "@/hooks/useSaveData";

const INTERACTION_EVENTS = [
  "pointerdown",
  "pointermove",
  "touchstart",
  "keydown",
] as const;

export const useIdleOrInteractionGate = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const saveData = useSaveData();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || saveData) {
      return;
    }

    let cancelled = false;

    const openGate = () => {
      if (cancelled) {
        return;
      }

      cancelled = true;
      setIsReady(true);
    };

    for (const event of INTERACTION_EVENTS) {
      window.addEventListener(event, openGate, { once: true, passive: true });
    }

    return () => {
      cancelled = true;
      for (const event of INTERACTION_EVENTS) {
        window.removeEventListener(event, openGate);
      }
    };
  }, [prefersReducedMotion, saveData]);

  if (prefersReducedMotion || saveData) {
    return false;
  }

  return isReady;
};
