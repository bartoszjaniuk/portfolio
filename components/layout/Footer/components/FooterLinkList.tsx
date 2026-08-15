import Link from "next/link";

import { isExternalHref } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export type FooterLink = {
  label: string;
  href: string;
};

type FooterLinkListProps = {
  heading: string;
  links: FooterLink[];
  className?: string;
};

const headingClassName =
  "mb-4 text-sm font-medium uppercase tracking-wide text-primary-foreground/50";

const linkClassName =
  "text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors";

export function FooterLinkList({
  heading,
  links,
  className,
}: FooterLinkListProps) {
  if (!links.length) return null;

  return (
    <nav aria-label={heading} className={className}>
      <h3 className={headingClassName}>{heading}</h3>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            {isExternalHref(link.href) ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className={cn(linkClassName)}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
