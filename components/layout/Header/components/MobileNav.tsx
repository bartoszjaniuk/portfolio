"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "../../LanguageToggle";
import { ThemeToggle } from "../../ThemeToggle";
import { ResolvedNavItem, ResolvedSocialLink } from "../Header.types";
import { HamburgerButton, SocialIconList } from "./SocialIconList";
import { StatusBadge } from "./StatusBadge";

type MobileNavProps = {
  children: React.ReactNode;
  navItems: ResolvedNavItem[];
  socialLinks: ResolvedSocialLink[];
  statusLabel: string;
};

export function MobileNav({
  children,
  navItems,
  socialLinks,
  statusLabel,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <nav className="flex items-center justify-between">
        {children}
        <div className="flex items-center gap-4">
          <StatusBadge statusLabel={statusLabel} variant="online" />
          <HamburgerButton
            isOpen={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          />
        </div>
      </nav>

      <div
        className={cn(
          "bg-background transition-all duration-400 md:hidden",
          isOpen ? "max-h-96 pt-4 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="border-border/50 flex flex-col gap-1 border-t pt-4">
          {navItems.map((item, index) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground active:bg-secondary hover:text-foreground hover:bg-secondary/50 flex items-center gap-3 rounded-lg px-4 py-3.5 text-sm tracking-widest uppercase transition-all duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="text-primary">{">"}</span>
              {item.label}
            </Link>
          ))}

          <div className="border-border/50 mt-4 flex items-center gap-2 border-t px-4 pt-4">
            <SocialIconList links={socialLinks} variant="mobile" />
            <div className="border-border/50 flex h-11 items-center justify-center rounded-lg border px-1">
              <LanguageToggle />
            </div>
            <div className="border-border/50 flex h-11 w-11 items-center justify-center rounded-lg border">
              <ThemeToggle />
            </div>
          </div>

          <StatusBadge statusLabel={statusLabel} variant="static" />
        </div>
      </div>
    </>
  );
}
