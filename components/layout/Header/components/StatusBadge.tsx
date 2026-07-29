"use client";

import { cn } from "@/lib/utils";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";
import { DEFAULT_STATUS_LABEL } from "../Header.utils";

export type StatusBadgeProps = {
  statusLabel?: string | null;
  variant: "online" | "static";
};

export function StatusBadge({ statusLabel, variant }: StatusBadgeProps) {
  const isOnline = useOnlineStatus();
  const label = statusLabel?.trim() || DEFAULT_STATUS_LABEL;
  const displayLabel = variant === "online" && !isOnline ? "offline" : label;

  return (
    <div
      className={cn(
        "text-muted-foreground flex items-center gap-2.5 text-xs",
        variant === "online" &&
          "bg-secondary/50 border-border/50 hidden rounded-full border px-3 py-1.5 font-medium sm:flex",
        variant === "static" &&
          "bg-secondary/30 mx-4 mt-3 mb-2 rounded-lg px-4 py-3",
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
        <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
      </span>
      <span>status: {displayLabel}</span>
    </div>
  );
}
