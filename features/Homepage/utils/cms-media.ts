import type { SanityImageSource } from "@sanity/image-url";

import type { CmsImage, ThemedLogo } from "@/lib/sanity/fetchers/get-home-page";
import { urlFor } from "@/lib/sanity/image";

export type ResolvedThemedLogo = {
  light: string;
  dark: string;
  alt: string;
  width: number;
  height: number;
  layout?: "wordmark" | "mark";
  scale?: number;
};

/** Build a Sanity CDN URL, or `null` when the image asset is missing. */
export function cmsImageUrl(
  image: CmsImage,
  options?: { width?: number; height?: number },
): string | null {
  if (!image?.asset) return null;

  let builder = urlFor(image as SanityImageSource);
  if (options?.width) builder = builder.width(options.width);
  if (options?.height) builder = builder.height(options.height);
  return builder.url();
}

/** Resolve themed light/dark Sanity images to Next Image–ready URLs. */
export function resolveThemedLogo(logo: ThemedLogo): ResolvedThemedLogo | null {
  if (!logo) return null;

  const light = cmsImageUrl(logo.light);
  const dark = cmsImageUrl(logo.dark);
  if (!light || !dark) return null;

  return {
    light,
    dark,
    alt: logo.alt,
    width: logo.width,
    height: logo.height,
    layout: logo.layout === "mark" ? "mark" : "wordmark",
    scale: logo.scale ?? undefined,
  };
}
