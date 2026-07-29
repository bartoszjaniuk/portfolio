import { Container } from "@/components/layout/Container";
import {
  SectionHeader,
  sectionHeadingClassName,
} from "@/components/ui/section-header";
import type { HomePageData } from "@/lib/sanity/fetchers/get-home-page";
import { cn } from "@/lib/utils";
import { ExperienceTable } from "./components/ExperienceTable";
import { HeadlineSegments } from "./components/HeadlineSegments";

export type ExperienceSectionProps = {
  experienceSection: NonNullable<HomePageData["experienceSection"]>;
};

export const ExperienceSection = ({
  experienceSection,
}: ExperienceSectionProps) => {
  const items = experienceSection.items ?? [];

  return (
    <Container
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-24 sm:scroll-mt-28"
    >
      <SectionHeader eyebrow={experienceSection.eyebrow ?? undefined}>
        <h2
          id="experience-heading"
          className={cn(
            sectionHeadingClassName,
            "text-foreground max-w-4xl lg:max-w-5xl",
          )}
        >
          <HeadlineSegments segments={experienceSection.headline} />
        </h2>
      </SectionHeader>

      <ExperienceTable items={items} />
    </Container>
  );
};
