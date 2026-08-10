"use client";

import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  LinkSimpleIcon,
  XLogoIcon,
  type Icon,
} from "@phosphor-icons/react";
import { ResolvedSocialLink } from "../Header.types";

const SOCIAL_ICONS: Record<string, Icon> = {
  github: GithubLogoIcon,
  linkedin: LinkedinLogoIcon,
  x: XLogoIcon,
  other: LinkSimpleIcon,
};

type SocialIconListProps = {
  links: ResolvedSocialLink[];
  variant: "desktop" | "mobile";
};

export function SocialIconList({ links, variant }: SocialIconListProps) {
  if (!links.length) return null;

  if (variant === "desktop") {
    return (
      <div className="hidden items-center gap-1 sm:flex">
        {links.map((link) => {
          const Icon = SOCIAL_ICONS[link.network] ?? LinkSimpleIcon;
          return (
            <a
              key={`${link.href}-${link.label}`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="group text-muted-foreground hover:text-primary hover:bg-primary/10 relative flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300"
            >
              <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="bg-card border-border text-muted-foreground pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-md border px-2.5 py-1 text-[10px] whitespace-nowrap opacity-0 shadow-lg transition-all duration-200 group-hover:-bottom-9 group-hover:opacity-100">
                {link.label}
              </span>
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <>
      {links.map((link) => {
        const Icon = SOCIAL_ICONS[link.network] ?? LinkSimpleIcon;
        return (
          <a
            key={`${link.href}-${link.label}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="border-border/50 text-muted-foreground active:bg-secondary hover:border-primary/50 hover:text-primary hover:bg-primary/10 flex h-11 w-11 items-center justify-center rounded-lg border transition-colors"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </>
  );
}
