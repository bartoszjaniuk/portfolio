"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../../ThemeToggle";
import { type Locale } from "@/lib/i18n/config";
import { ResolvedNavItem } from "../Header.types";
import { isNavItemActive } from "../Header.utils";

type DesktopMenuProps = {
  locale: Locale;
  navItems: ResolvedNavItem[];
};

export function DesktopMenu({ locale, navItems }: DesktopMenuProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const pathname = usePathname();

  return (
    <div className="hidden items-center gap-1 md:flex">
      {navItems.map((item, index) => {
        const active = isNavItemActive(pathname, locale, item.rawHref);
        return (
          <Link
            key={`${item.href}-${item.label}`}
            href={item.href}
            className={cn(
              "relative rounded-lg px-4 py-2.5 text-xs font-medium tracking-widest uppercase transition-all duration-300",
              active
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
              hoveredIndex === index && !active && "text-foreground",
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span
              className={cn(
                "transition-transform duration-200",
                (hoveredIndex === index || active) && "translate-x-2",
              )}
            >
              {item.label}
            </span>
            <span
              className={cn(
                "bg-primary absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full transition-all duration-300",
                active || hoveredIndex === index ? "w-6" : "w-0",
              )}
            />
          </Link>
        );
      })}
      <div className="ml-2 flex items-center gap-1">
        <ThemeToggle />
      </div>
    </div>
  );
}
