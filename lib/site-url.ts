const SITE_URL_FALLBACK = "https://bartoszjaniuk.pl";

/** Absolute site origin without trailing slash. */
export function siteBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || SITE_URL_FALLBACK).replace(
    /\/$/,
    "",
  );
}
