export function splitNavItems<T>(items: T[]): [T[], T[]] {
  const midpoint = Math.ceil(items.length / 2);
  return [items.slice(0, midpoint), items.slice(midpoint)];
}

export function resolveCopyrightName(
  brandName: string | null | undefined,
  personName: string | null | undefined,
  fallback: string,
): string {
  return brandName?.trim() || personName?.trim() || fallback;
}
