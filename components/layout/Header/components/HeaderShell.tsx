"use client";

import * as React from "react";
import { HeaderShellProps } from "../Header.types";
import { BrandMark } from "./BrandMark";
import { DesktopMenu } from "./DesktopMenu";
import { MobileNav } from "./MobileNav";

export function HeaderShell({
  locale,
  brandName,
  homeHref,
  navItems,
  socialLinks,
  statusLabel,
}: HeaderShellProps) {
  const headerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      header.classList.toggle("border-border/50", scrolled);
      header.classList.toggle("bg-background/80", scrolled);
      header.classList.toggle("border-b", scrolled);
      header.classList.toggle("shadow-sm", scrolled);
      header.classList.toggle("backdrop-blur-xl", scrolled);
      header.classList.toggle("bg-transparent", !scrolled);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 right-0 left-0 z-50 bg-transparent transition-all duration-500"
    >
      <div className="px-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between py-4">
          <BrandMark brandName={brandName} homeHref={homeHref} />
          <DesktopMenu locale={locale} navItems={navItems} />
          <MobileNav
            navItems={navItems}
            socialLinks={socialLinks}
            statusLabel={statusLabel}
          />
        </div>
      </div>
    </header>
  );
}
