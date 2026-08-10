"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "../../LanguageToggle";
import { ThemeToggle } from "../../ThemeToggle";
import { ResolvedNavItem, ResolvedSocialLink } from "../Header.types";
import { HamburgerButton } from "./HamburgerButton";
import { SocialIconList } from "./SocialIconList";
import { StatusBadge } from "./StatusBadge";

const MOBILE_NAV_SHEET_ID = "mobile-nav-sheet";

type MobileNavProps = {
  navItems: ResolvedNavItem[];
  socialLinks: ResolvedSocialLink[];
  statusLabel: string;
};

export function MobileNav({
  navItems,
  socialLinks,
  statusLabel,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- portal needs client mount
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mediaQuery.matches) setIsOpen(false);
    };

    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  const close = () => setIsOpen(false);

  const sheet = (
    <div
      id={MOBILE_NAV_SHEET_ID}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      aria-hidden={!isOpen}
      inert={!isOpen ? true : undefined}
      className={cn(
        "bg-background fixed inset-x-0 top-16 bottom-0 z-50 flex flex-col transition-opacity duration-300 md:hidden",
        isOpen
          ? "visible opacity-100"
          : "pointer-events-none invisible opacity-0",
      )}
    >
      <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
        <div className="border-border/50 flex flex-col gap-1 border-t pt-4">
          {navItems.map((item) => (
            <Link
              key={`${item.href}-${item.label}`}
              href={item.href}
              onClick={close}
              tabIndex={isOpen ? undefined : -1}
              className="text-muted-foreground active:bg-secondary hover:text-foreground hover:bg-secondary/50 flex items-center gap-3 rounded-lg px-4 py-3.5 text-sm tracking-widest uppercase transition-all duration-200"
            >
              <span className="text-primary">{">"}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="border-border/50 shrink-0 border-t px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-2">
          <SocialIconList links={socialLinks} variant="mobile" />
          <div className="border-border/50 flex h-11 items-center justify-center rounded-lg border px-1">
            <LanguageToggle />
          </div>
          <div className="border-border/50 flex h-11 w-11 items-center justify-center rounded-lg border">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex items-center gap-4">
        <StatusBadge statusLabel={statusLabel} />
        <HamburgerButton
          isOpen={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          controlsId={MOBILE_NAV_SHEET_ID}
        />
      </div>
      {isMounted ? createPortal(sheet, document.body) : null}
    </>
  );
}
