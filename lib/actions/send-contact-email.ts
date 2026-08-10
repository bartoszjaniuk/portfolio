"use server";

import { Resend } from "resend";

import { isLocale, type Locale } from "@/lib/i18n/config";
import {
  createContactSchema,
  getContactServerMessages,
} from "@/lib/schemas/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

export type SendContactEmailResult =
  { ok: true } | { ok: false; error: string };

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
