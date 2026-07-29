"use client";

import Link from "next/link";
import { Logo } from "../../Logo";
import { SvgTextWithProgress } from "./SvgTextWithProgress";

type BrandMarkProps = {
  brandName: string;
  homeHref: string;
};

export function BrandMark({ brandName, homeHref }: BrandMarkProps) {
  return (
    <Link href={homeHref} className="group flex items-center gap-2.5">
      <Logo />
      <SvgTextWithProgress brandName={brandName} />
    </Link>
  );
}
