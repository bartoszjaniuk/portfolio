import { siteBaseUrl } from "@/lib/site-url";

import { TURNSTILE_ACTION, TURNSTILE_SITEVERIFY_URL } from "./constants";
import { getTurnstileSecretKey } from "./env";

type SiteverifyResponse = {
  success?: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export type VerifyTurnstileResult = { ok: true } | { ok: false };

function allowedHostnames(): Set<string> {
  const host = new URL(siteBaseUrl()).hostname.toLowerCase();
  const allowed = new Set<string>([host]);

  if (host.startsWith("www.")) {
    allowed.add(host.slice(4));
  } else {
    allowed.add(`www.${host}`);
  }

  if (process.env.NODE_ENV === "development") {
    allowed.add("localhost");
  }

  return allowed;
}

export type VerifyTurnstileInput = {
  token: string;
  remoteip?: string;
};

/**
 * Validates a Turnstile token via Cloudflare Siteverify.
 * Requires success + expected action + allowed hostname.
 */
export async function verifyTurnstileToken({
  token,
  remoteip,
}: VerifyTurnstileInput): Promise<VerifyTurnstileResult> {
  if (!token || token.length > 2048) {
    return { ok: false };
  }

  let secret: string;
  try {
    secret = getTurnstileSecretKey();
  } catch (error) {
    console.error(error);
    return { ok: false };
  }

  const body: Record<string, string> = {
    secret,
    response: token,
  };
  if (remoteip) {
    body.remoteip = remoteip;
  }

  let result: SiteverifyResponse;
  try {
    const response = await fetch(TURNSTILE_SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("Turnstile siteverify HTTP error:", response.status);
      return { ok: false };
    }

    result = (await response.json()) as SiteverifyResponse;
  } catch (error) {
    console.error("Turnstile siteverify failed:", error);
    return { ok: false };
  }

  if (!result.success) {
    console.error("Turnstile validation failed:", result["error-codes"]);
    return { ok: false };
  }

  if (result.action !== TURNSTILE_ACTION) {
    console.error("Turnstile action mismatch:", result.action);
    return { ok: false };
  }

  const hostname = result.hostname?.toLowerCase();
  if (!hostname || !allowedHostnames().has(hostname)) {
    console.error("Turnstile hostname rejected:", hostname);
    return { ok: false };
  }

  return { ok: true };
}
