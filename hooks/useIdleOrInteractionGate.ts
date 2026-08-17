import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useSaveData } from "@/hooks/useSaveData";

const INTERACTION_EVENTS = [
  "pointerdown",
  "touchstart",
  "keydown",
  "scroll",
] as const;

const IDLE_TIMEOUT_MS = 2000;

export const useIdleOrInteractionGate = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const saveData = useSaveData();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || saveData) {
      return;
    }

    let cancelled = false;
    let idleCallbackId: number | undefined;
    let timeoutId: number | undefined;

    const cancelIdle = () => {
      if (idleCallbackId !== undefined) {
        window.cancelIdleCallback(idleCallbackId);
        idleCallbackId = undefined;
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    };

    const openGate = () => {
      if (cancelled) {
        return;
      }

      cancelled = true;
      cancelIdle();
      setIsReady(true);
    };

    for (const event of INTERACTION_EVENTS) {
      window.addEventListener(event, openGate, { once: true, passive: true });
    }

    const scheduleIdle = () => {
      if (cancelled) {
        return;
      }

      if (typeof window.requestIdleCallback === "function") {
        idleCallbackId = window.requestIdleCallback(openGate, {
          timeout: IDLE_TIMEOUT_MS,
        });
      } else {
        timeoutId = window.setTimeout(openGate, IDLE_TIMEOUT_MS);
      }
    };

    if (document.readyState === "complete") {
      scheduleIdle();
    } else {
      window.addEventListener("load", scheduleIdle, { once: true });
    }

    return () => {
      cancelled = true;
      cancelIdle();
      window.removeEventListener("load", scheduleIdle);
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
