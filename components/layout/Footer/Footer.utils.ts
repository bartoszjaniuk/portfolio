export function resolveCopyrightName(
  brandName: string | null | undefined,
  personName: string | null | undefined,
  fallback: string,
): string {
  return brandName?.trim() || personName?.trim() || fallback;
}
