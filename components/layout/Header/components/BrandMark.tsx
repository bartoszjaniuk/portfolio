"use client";

import Link from "next/link";
import { Logo } from "../../Logo";

type BrandMarkProps = {
  homeHref: string;
};

export function BrandMark({ homeHref }: BrandMarkProps) {
  return (
    <Link href={homeHref} className="group flex items-center gap-2.5">
      <Logo />
    </Link>
  );
}
