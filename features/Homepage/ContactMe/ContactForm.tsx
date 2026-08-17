"use client";

import dynamic from "next/dynamic";

import { DeferUntilVisible } from "@/components/features/DeferUntilVisible";
import type { Locale } from "@/lib/i18n/config";
import type { HomePageData } from "@/lib/sanity/fetchers/get-home-page";

export type ContactFormCopy = NonNullable<
  NonNullable<HomePageData["gotIdea"]>["form"]
>;

type ContactFormProps = {
  locale: Locale;
  form: ContactFormCopy;
};

const ContactFormInteractive = dynamic(
  () =>
    import("./ContactFormInteractive").then((m) => m.ContactFormInteractive),
  { ssr: false },
);

const ContactFormPlaceholder = () => {
  return (
    <div className="min-h-[36rem] w-full max-w-md md:shrink-0" aria-hidden />
  );
};

export function ContactForm({ locale, form }: ContactFormProps) {
  return (
    <DeferUntilVisible
      className="w-full max-w-md md:shrink-0"
      fallback={<ContactFormPlaceholder />}
    >
      <ContactFormInteractive locale={locale} form={form} />
    </DeferUntilVisible>
  );
}
