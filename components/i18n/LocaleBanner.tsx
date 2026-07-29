"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { localePath, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

const DISMISS_KEY = "locale-banner-dismissed";

function prefersPolish(): boolean {
  const candidates = [
    ...(navigator.languages ?? []),
    navigator.language,
  ].filter(Boolean);

  return candidates.some((lang) => lang.toLowerCase().startsWith("pl"));
}

function readDismissed(): boolean {
  try {
    return window.localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

function subscribeDismissed(onStoreChange: () => void): () => void {
  const handler = (event: StorageEvent) => {
    if (event.key === DISMISS_KEY || event.key === null) {
      onStoreChange();
    }
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

function toPolishPath(pathname: string): string {
  const segments = pathname.split("/");
  if (segments.length >= 2 && segments[1] === "en") {
    segments[1] = "pl";
    return segments.join("/") || "/pl";
  }
  return localePath("pl", pathname);
}

type LocaleBannerProps = {
  locale: Locale;
};

export function LocaleBanner({ locale }: LocaleBannerProps) {
  const pathname = usePathname();
  const prefersPl = React.useSyncExternalStore(
    () => () => {},
    prefersPolish,
    () => false,
  );
  const storedDismissed = React.useSyncExternalStore(
    subscribeDismissed,
    readDismissed,
    () => true,
  );
  const [localDismissed, setLocalDismissed] = React.useState(false);

  const dismissed = storedDismissed || localDismissed;
  const visible = locale === "en" && prefersPl && !dismissed;

  if (!visible) {
    return null;
  }

  const plHref = toPolishPath(pathname);

  const dismiss = () => {
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
    setLocalDismissed(true);
  };

  return (
    <div
      role="region"
      aria-label="Language suggestion"
      className={cn(
        "border-border bg-background text-muted-foreground relative z-60 border-b px-4 py-2.5 text-sm sm:px-6",
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <p className="text-muted-foreground">
          Wygląda na to, że preferujesz polski.{" "}
          <Link
            href={plHref}
            className="text-foreground hover:text-primary font-medium underline-offset-4 hover:underline"
          >
            Przełącz na wersję polską
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="text-muted-foreground hover:text-foreground border-border hover:bg-secondary/50 rounded-md border px-2.5 py-1 text-xs tracking-wide uppercase transition-colors"
        >
          Zamknij
        </button>
      </div>
    </div>
  );
}
