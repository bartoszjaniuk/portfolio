import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { localePath, type Locale } from "@/lib/i18n/config";
import type { LegalContent } from "@/lib/content/privacy";

type LegalDocumentPageProps = {
  content: LegalContent;
  locale: Locale;
};

export function LegalDocumentPage({ content, locale }: LegalDocumentPageProps) {
  return (
    <main className="bg-background min-h-screen">
      <Container spacing="compact" aria-labelledby="legal-heading">
        <p className="mb-8">
          <Link
            href={localePath(locale, "/")}
            className="text-muted-foreground hover:text-primary text-sm underline-offset-4 transition-colors hover:underline"
          >
            ← {content.backHomeLabel}
          </Link>
        </p>

        <header className="mb-10 max-w-3xl">
          <h1
            id="legal-heading"
            className="font-heading text-primary text-4xl uppercase sm:text-5xl"
          >
            {content.title}
          </h1>
          <p className="text-muted-foreground mt-3 text-sm">
            {content.lastUpdatedLabel}: {content.lastUpdated}
          </p>
        </header>

        <div className="text-primary max-w-3xl space-y-10">
          {content.sections.map((section) => (
            <section key={section.heading} className="space-y-3">
              <h2 className="text-lg font-semibold sm:text-xl">
                {section.heading}
              </h2>
              {section.paragraphs?.map((paragraph, index) => (
                <p
                  key={`${section.heading}-paragraph-${index}`}
                  className="text-muted-foreground text-sm leading-relaxed sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
              {section.items?.length ? (
                <ul className="text-muted-foreground list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
                  {section.items.map((item, index) => (
                    <li key={`${section.heading}-item-${index}`}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </Container>
    </main>
  );
}
