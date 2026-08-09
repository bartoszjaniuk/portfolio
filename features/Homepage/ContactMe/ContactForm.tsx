"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useState } from "react";
import { useForm } from "react-hook-form";

import { MagneticButton } from "@/components/ui/magnetic-button";
import { sendContactEmail } from "@/lib/actions/send-contact-email";
import type { Locale } from "@/lib/i18n/config";
import type { HomePageData } from "@/lib/sanity/fetchers/get-home-page";
import {
  createContactSchema,
  type ContactFormData,
} from "@/lib/schemas/contact";
import { cn } from "@/lib/utils";

type SubmitStatus = "idle" | "pending" | "success" | "error";

export type ContactFormCopy = NonNullable<
  NonNullable<HomePageData["gotIdea"]>["form"]
>;

type ContactFormProps = {
  locale: Locale;
  form: ContactFormCopy;
};

const fieldClassName = cn(
  "w-full rounded-lg border bg-transparent px-4 py-3 text-sm text-primary-foreground",
  "placeholder:text-primary-foreground/40",
  "border-primary-foreground/20",
  "outline-none transition-colors",
  "focus:border-primary-foreground/60 focus:ring-2 focus:ring-primary-foreground/10",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "aria-invalid:border-red-400 aria-invalid:ring-2 aria-invalid:ring-red-400/20",
);

const labelClassName =
  "block text-sm font-medium text-primary-foreground/70 mb-1.5";
const errorClassName = "mt-1 text-xs text-red-400";

export function ContactForm({ locale, form }: ContactFormProps) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(createContactSchema(locale)),
  });

  const isPending = status === "pending";

  const onSubmit = (data: ContactFormData) => {
    setStatus("pending");
    setServerError(null);

    startTransition(async () => {
      const result = await sendContactEmail(data, locale);

      if (result.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        setServerError(result.error || form.errorFallback);
      }
    });
  };

  if (status === "success") {
    return (
      <div className="border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground w-full max-w-md rounded-lg border px-8 py-10 md:shrink-0">
        <p className="text-2xl font-bold">{form.successTitle}</p>
        <p className="text-primary-foreground/70 mt-2">{form.successBody}</p>
        <button
          onClick={() => setStatus("idle")}
          className="text-primary-foreground/60 hover:text-primary-foreground mt-6 text-sm underline underline-offset-4 transition-colors"
        >
          {form.sendAnotherLabel}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full max-w-md space-y-5 md:shrink-0"
    >
      <div>
        <label htmlFor="contact-email" className={labelClassName}>
          {form.emailLabel}
        </label>
        <input
          id="contact-email"
          type="email"
          placeholder={form.emailPlaceholder ?? undefined}
          autoComplete="email"
          aria-invalid={!!errors.email}
          disabled={isPending}
          className={fieldClassName}
          {...register("email")}
        />
        {errors.email && (
          <p role="alert" className={errorClassName}>
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-subject" className={labelClassName}>
          {form.subjectLabel}
        </label>
        <input
          id="contact-subject"
          type="text"
          placeholder={form.subjectPlaceholder ?? undefined}
          aria-invalid={!!errors.subject}
          disabled={isPending}
          className={fieldClassName}
          {...register("subject")}
        />
        {errors.subject && (
          <p role="alert" className={errorClassName}>
            {errors.subject.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClassName}>
          {form.messageLabel}
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder={form.messagePlaceholder ?? undefined}
          aria-invalid={!!errors.message}
          disabled={isPending}
          className={cn(fieldClassName, "resize-none")}
          {...register("message")}
        />
        {errors.message && (
          <p role="alert" className={errorClassName}>
            {errors.message.message}
          </p>
        )}
      </div>

      {serverError && (
        <p role="alert" className="text-sm text-red-400">
          {serverError}
        </p>
      )}

      <MagneticButton
        type="submit"
        size="lg"
        disabled={isPending}
        className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full sm:w-auto"
      >
        <span className="relative z-10">
          {isPending ? form.submittingLabel : form.submitLabel}
        </span>
        {!isPending ? (
          <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        ) : null}
        <span className="bg-primary-foreground absolute inset-0 z-0 -translate-x-full transition-transform duration-500 group-hover:translate-x-0" />
      </MagneticButton>
    </form>
  );
}
