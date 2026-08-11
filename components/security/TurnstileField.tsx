"use client";

import Script from "next/script";
import { useEffect, useId, useRef } from "react";

import {
  TURNSTILE_ACTION,
  TURNSTILE_SCRIPT_ID,
  TURNSTILE_SCRIPT_URL,
} from "@/lib/turnstile/constants";

type TurnstileRenderOptions = {
  sitekey: string;
  action?: string;
  theme?: "light" | "dark" | "auto";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

type TurnstileApi = {
  render: (
    container: string | HTMLElement,
    options: TurnstileRenderOptions,
  ) => string;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type TurnstileFieldProps = {
  siteKey: string;
  onSuccess: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  className?: string;
};

export function TurnstileField({
  siteKey,
  onSuccess,
  onExpire,
  onError,
  className,
}: TurnstileFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const callbacksRef = useRef({ onSuccess, onExpire, onError });
  const siteKeyRef = useRef(siteKey);
  const reactId = useId();
  const containerDomId = `cf-turnstile-${reactId.replace(/:/g, "")}`;

  useEffect(() => {
    callbacksRef.current = { onSuccess, onExpire, onError };
  }, [onSuccess, onExpire, onError]);

  useEffect(() => {
    siteKeyRef.current = siteKey;
  }, [siteKey]);

  useEffect(() => {
    let cancelled = false;

    const tryRender = () => {
      if (cancelled) return;
      const container = containerRef.current;
      const turnstile = window.turnstile;
      if (!container || !turnstile) return;
      if (widgetIdRef.current !== null) return;

      widgetIdRef.current = turnstile.render(container, {
        sitekey: siteKeyRef.current,
        action: TURNSTILE_ACTION,
        theme: "dark",
        callback: (token) => {
          callbacksRef.current.onSuccess(token);
        },
        "expired-callback": () => {
          callbacksRef.current.onExpire?.();
        },
        "error-callback": () => {
          callbacksRef.current.onError?.();
        },
      });
    };

    tryRender();

    const onReady = () => {
      tryRender();
    };

    window.addEventListener("turnstile-script-loaded", onReady);

    return () => {
      cancelled = true;
      window.removeEventListener("turnstile-script-loaded", onReady);
      const widgetId = widgetIdRef.current;
      widgetIdRef.current = null;
      if (widgetId !== null && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [siteKey]);

  return (
    <div className={className}>
      <Script
        id={TURNSTILE_SCRIPT_ID}
        src={TURNSTILE_SCRIPT_URL}
        strategy="afterInteractive"
        onLoad={() => {
          window.dispatchEvent(new Event("turnstile-script-loaded"));
        }}
      />
      <div ref={containerRef} id={containerDomId} className="cf-turnstile" />
    </div>
  );
}
