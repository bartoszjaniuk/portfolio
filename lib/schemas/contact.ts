import { z } from "zod";

import type { Locale } from "@/lib/i18n/config";

const contactMessages = {
  en: {
    email: "Please enter a valid email address",
    subject: "Subject must be at least 2 characters",
    message: "Message must be at least 10 characters",
    invalidForm: "Invalid form data. Please check your inputs.",
    configError: "Server configuration error.",
    sendFailed: "Failed to send the message. Please try again.",
  },
  pl: {
    email: "Podaj prawidłowy adres e-mail",
    subject: "Temat musi mieć co najmniej 2 znaki",
    message: "Wiadomość musi mieć co najmniej 10 znaków",
    invalidForm: "Nieprawidłowe dane formularza. Sprawdź pola.",
    configError: "Błąd konfiguracji serwera.",
    sendFailed: "Nie udało się wysłać wiadomości. Spróbuj ponownie.",
  },
} as const;

export type ContactServerMessages = (typeof contactMessages)[Locale];

export function getContactServerMessages(
  locale: Locale,
): ContactServerMessages {
  return contactMessages[locale];
}

export function createContactSchema(locale: Locale) {
  const messages = getContactServerMessages(locale);

  return z.object({
    email: z.string().email(messages.email),
    subject: z.string().min(2, messages.subject),
    message: z.string().min(10, messages.message),
  });
}

export type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;
