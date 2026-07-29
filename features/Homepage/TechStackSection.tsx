import { Container } from "@/components/layout/Container";
import {
  SectionHeader,
  sectionHeadingClassName,
} from "@/components/ui/section-header";
import type {
  HeadlineSegment,
  HomePageData,
} from "@/lib/sanity/fetchers/get-home-page";
import { cn } from "@/lib/utils";
import { HeadlineSegments } from "./components/HeadlineSegments";
import {
  TechStackItem,
  type TechStackItemView,
} from "./components/TechStackItem";
import { TechStackTrack } from "./components/TechStackTrack";
import { toTechStackItemView } from "./mappers/to-tech-item-view";

export type TechStackSectionProps = {
  techStackSection: NonNullable<HomePageData["techStackSection"]>;
};

export const TechStackSection = ({
  techStackSection,
}: TechStackSectionProps) => {
  const items = (techStackSection.items ?? [])
    .map(toTechStackItemView)
    .filter((item): item is TechStackItemView => item !== null);

  return (
    <Container id="tech-stack" aria-label="My tech stack" bleed>
      <div className="px-4 sm:px-6 md:hidden">
        <div className="mx-auto max-w-7xl">
          <TechStackHeading
            headingId="tech-stack-heading"
            eyebrow={techStackSection.eyebrow}
            headline={techStackSection.headline}
          />
          <div className="flex flex-col gap-6">
            {items.map((item) => (
              <TechStackItem key={item.key} item={item} />
            ))}
          </div>
        </div>
      </div>

      <TechStackTrack
        items={items}
        heading={
          <TechStackHeading
            headingId="tech-stack-heading-desktop"
            flush
            eyebrow={techStackSection.eyebrow}
            headline={techStackSection.headline}
          />
        }
      />
    </Container>
  );
};

function TechStackHeading({
  headingId,
  flush = false,
  eyebrow,
  headline,
}: {
  headingId?: string;
  flush?: boolean;
  eyebrow: string | null;
  headline: HeadlineSegment[] | null;
}) {
  return (
    <SectionHeader eyebrow={eyebrow ?? undefined} flush={flush}>
      <h2
        id={headingId}
        className={cn(
          sectionHeadingClassName,
          "text-foreground max-w-4xl lg:max-w-5xl",
        )}
      >
        <HeadlineSegments segments={headline} />
      </h2>
    </SectionHeader>
  );
}
