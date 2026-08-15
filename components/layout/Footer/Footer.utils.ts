/**
 * Copyright line uses the person display name (not brandName / domain).
 */
export function resolveCopyrightName(
  personName: string | null | undefined,
  fallback: string,
): string {
  return personName?.trim() || fallback;
}
