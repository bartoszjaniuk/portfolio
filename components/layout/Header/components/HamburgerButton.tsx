"use client";

import { cn } from "@/lib/utils";

type HamburgerButtonProps = {
  isOpen: boolean;
  onClick: () => void;
  controlsId: string;
};

export function HamburgerButton({
  isOpen,
  onClick,
  controlsId,
}: HamburgerButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border-border/50 bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground flex h-10 w-10 items-center justify-center rounded-lg border transition-colors md:hidden"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls={controlsId}
    >
      <div className="flex w-5 flex-col gap-1.5">
        <span
          className={cn(
            "h-0.5 origin-center bg-current transition-all duration-300",
            isOpen ? "w-5 translate-y-2 rotate-45" : "w-5",
          )}
        />
        <span
          className={cn(
            "h-0.5 w-3.5 bg-current transition-all duration-300",
            isOpen && "translate-x-2 opacity-0",
          )}
        />
        <span
          className={cn(
            "h-0.5 origin-center bg-current transition-all duration-300",
            isOpen ? "w-5 -translate-y-2 -rotate-45" : "w-5",
          )}
        />
      </div>
    </button>
  );
}
