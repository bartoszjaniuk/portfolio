"use client";

import { useOnlineStatus } from "../../hooks/useOnlineStatus";
import { DEFAULT_STATUS_LABEL } from "../Header.utils";

export type StatusBadgeProps = {
  statusLabel?: string | null;
};

export function StatusBadge({ statusLabel }: StatusBadgeProps) {
  const isOnline = useOnlineStatus();
  const label = statusLabel?.trim() || DEFAULT_STATUS_LABEL;
  const displayLabel = isOnline ? label : "offline";

  return (
    <div className="text-muted-foreground bg-secondary/50 border-border/50 hidden items-center gap-2.5 rounded-full border px-3 py-1.5 text-xs font-medium sm:flex">
      <span className="relative flex h-2 w-2">
        <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
        <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
      </span>
      <span>status: {displayLabel}</span>
    </div>
  );
}
