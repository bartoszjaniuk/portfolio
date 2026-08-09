import { Container } from "@/components/layout/Container";
import {
  SectionHeader,
  sectionHeadingClassName,
} from "@/components/ui/section-header";
import type { HomePageData } from "@/lib/sanity/fetchers/get-home-page";
import { cn } from "@/lib/utils";
import {
  ExperienceTable,
  type ExperienceColumnHeaders,
} from "./components/ExperienceTable";
import { HeadlineSegments } from "./components/HeadlineSegments";

const DEFAULT_COLUMN_HEADERS: ExperienceColumnHeaders = {
  company: "Company / Organization",
  role: "Role / Position",
  year: "Year",
  description: "Description",
  ariaLabel: "Professional experience",
};

export type ExperienceSectionProps = {
  experienceSection: NonNullable<HomePageData["experienceSection"]>;
};

export const ExperienceSection = ({
  experienceSection,
}: ExperienceSectionProps) => {
  const items = experienceSection.items ?? [];
  const headers = experienceSection.columnHeaders;

  const columnHeaders: ExperienceColumnHeaders = {
    company: headers?.company ?? DEFAULT_COLUMN_HEADERS.company,
    role: headers?.role ?? DEFAULT_COLUMN_HEADERS.role,
    year: headers?.year ?? DEFAULT_COLUMN_HEADERS.year,
    description: headers?.description ?? DEFAULT_COLUMN_HEADERS.description,
    ariaLabel: headers?.ariaLabel ?? DEFAULT_COLUMN_HEADERS.ariaLabel,
  };

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

      <ExperienceTable items={items} columnHeaders={columnHeaders} />
    </Container>
  );
};
