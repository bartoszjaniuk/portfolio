"use client";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

export const BrowserStatus = () => {
  const isOnline = useOnlineStatus();
  return (
    <div className="text-muted-foreground bg-secondary/50 border-border/50 hidden items-center gap-2.5 rounded-full border px-3 py-1.5 text-xs font-medium sm:flex">
      <span className="relative flex h-2 w-2">
        <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
        <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
      </span>
      <span>status: {isOnline ? "open to work" : "offline"}</span>
    </div>
  );
};
