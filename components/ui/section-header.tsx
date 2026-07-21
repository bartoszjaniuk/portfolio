import * as React from "react";
import { type VariantProps } from "class-variance-authority";

import { Eyebrow, eyebrowVariants } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  children: React.ReactNode;
  eyebrow: React.ReactNode;
  eyebrowTone?: VariantProps<typeof eyebrowVariants>["tone"];
  /** Side content aligned with the headline (e.g. badge). */
  actions?: React.ReactNode;
  /**
   * When true, skips the bottom margin used before section body content.
   * Useful for sticky layouts that control spacing via flex gap.
   */
  flush?: boolean;
  className?: string;
};

function SectionHeader({
  children,
  eyebrow,
  eyebrowTone,
  actions,
  flush = false,
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn(!flush && "mb-10 sm:mb-14", className)}>
      <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>
      {actions ? (
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {children}
          {actions}
        </div>
      ) : (
        children
      )}
    </header>
  );
}

export { SectionHeader };
