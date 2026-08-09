import { Container } from "@/components/layout/Container";
import {
  SectionHeader,
  sectionHeadingClassName,
} from "@/components/ui/section-header";
import type { HomePageData } from "@/lib/sanity/fetchers/get-home-page";
import { cn } from "@/lib/utils";
import { HeadlineSegments } from "../components/HeadlineSegments";
import { FaqAccordion } from "./FaqAccordion";

export type FaqSectionProps = {
  faqSection: NonNullable<HomePageData["faqSection"]>;
};

export const FaqSection = ({ faqSection }: FaqSectionProps) => {
  const items = (faqSection.items ?? [])
    .filter((item): item is { question: string; answer: string } =>
      Boolean(item?.question && item?.answer),
    )
    .map((item) => ({
      question: item.question,
      answer: item.answer,
    }));

  return (
    <Container
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-24 sm:scroll-mt-28"
      innerClassName="flex flex-col"
    >
      <SectionHeader eyebrow={faqSection.eyebrow ?? undefined}>
        <h2
          id="faq-heading"
          className={cn(
            sectionHeadingClassName,
            "text-foreground max-w-4xl lg:max-w-5xl",
          )}
        >
          <HeadlineSegments segments={faqSection.headline} />
        </h2>
      </SectionHeader>

      <FaqAccordion items={items} />
    </Container>
  );
};
