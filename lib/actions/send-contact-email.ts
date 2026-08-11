"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

import { isLocale, type Locale } from "@/lib/i18n/config";
import {
  createContactSchema,
  getContactServerMessages,
} from "@/lib/schemas/contact";
import { verifyTurnstileToken } from "@/lib/turnstile/verify-turnstile";

const resend = new Resend(process.env.RESEND_API_KEY);

export type SendContactEmailResult =
  { ok: true } | { ok: false; error: string };

function clientIpFromHeaders(headerStore: Headers): string | undefined {
  const cfIp = headerStore.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp;

  const forwarded = headerStore.get("x-forwarded-for");
  if (!forwarded) return undefined;

  const first = forwarded.split(",")[0]?.trim();
  return first || undefined;
}

export async function sendContactEmail(
  data: unknown,
  locale: Locale = "en",
): Promise<SendContactEmailResult> {
  const safeLocale = isLocale(locale) ? locale : "en";
  const messages = getContactServerMessages(safeLocale);
  const parsed = createContactSchema(safeLocale).safeParse(data);

  if (!parsed.success) {
    return { ok: false, error: messages.invalidForm };
  }

  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.error("TURNSTILE_SECRET_KEY is not set");
    return { ok: false, error: messages.configError };
  }

  const headerStore = await headers();
  const remoteip = clientIpFromHeaders(headerStore);
  const captcha = await verifyTurnstileToken({
    token: parsed.data.turnstileToken,
    remoteip,
  });

  if (!captcha.ok) {
    return { ok: false, error: messages.captchaFailed };
  }

  const { email, subject, message } = parsed.data;
  const to = process.env.CONTACT_EMAIL_TO;

  if (!to) {
    console.error("CONTACT_EMAIL_TO is not set");
    return { ok: false, error: messages.configError };
  }
  // Production sender on the verified Resend domain (bjaniuk.com).
  // Until DNS verification completes, Resend may reject sends — see docs/launch-domain.md.
  const { error } = await resend.emails.send({
    from: "Contact <noreply@bjaniuk.com>",
    to,
    replyTo: email,
    subject,
    text: `From: ${email}\n\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return {
      ok: false,
      error: messages.sendFailed,
    };
  }

  return { ok: true };
}
