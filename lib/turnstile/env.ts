function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined || v === "") {
    throw new Error(errorMessage);
  }
  return v;
}

/** Public sitekey for the Turnstile widget (safe for client). */
export function getTurnstileSiteKey(): string | undefined {
  const value = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  return value || undefined;
}

/** Server-only secret. Throws when missing. */
export function getTurnstileSecretKey(): string {
  return assertValue(
    process.env.TURNSTILE_SECRET_KEY,
    "Missing environment variable: TURNSTILE_SECRET_KEY",
  );
}
