import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { localePath, type Locale } from "@/lib/i18n/config";

export type ServiceDocumentPageProps = {
  locale: Locale;
  title: string;
  intro: string | null;
  contactCtaLabel: string;
  backHomeLabel: string;
};

export function ServiceDocumentPage({
  locale,
  title,
  intro,
  contactCtaLabel,
  backHomeLabel,
}: ServiceDocumentPageProps) {
  return (
    <main className="bg-background min-h-screen">
      <Container spacing="compact" aria-labelledby="service-heading">
        <p className="mb-8">
          <Link
            href={localePath(locale, "/")}
            className="text-muted-foreground hover:text-primary text-sm underline-offset-4 transition-colors hover:underline"
          >
            ← {backHomeLabel}
          </Link>
        </p>

        <header className="mb-10 max-w-3xl">
          <h1
            id="service-heading"
            className="font-heading text-primary text-4xl uppercase sm:text-5xl"
          >
            {title}
          </h1>
        </header>

        {intro ? (
          <p className="text-muted-foreground mb-10 max-w-3xl text-sm leading-relaxed sm:text-base">
            {intro}
          </p>
        ) : null}

        <p>
          <Link
            href={`${localePath(locale, "/")}#contact`}
            className="text-primary text-sm font-medium underline-offset-4 hover:underline"
          >
            {contactCtaLabel}
          </Link>
        </p>
      </Container>
    </main>
  );
}
