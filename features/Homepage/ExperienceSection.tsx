import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/section-header";
import { ExperienceTable } from "./components/ExperienceTable";
import { experienceCopy } from "./utils/experience-content";

export const ExperienceSection = () => (
  <Container
    id="experience"
    aria-labelledby="experience-heading"
    className="scroll-mt-24 sm:scroll-mt-28"
  >
    <SectionHeader eyebrow={experienceCopy.eyebrow}>
      <h2
        id="experience-heading"
        className="text-foreground max-w-4xl text-3xl font-bold tracking-tight uppercase sm:text-5xl lg:max-w-5xl lg:text-6xl"
      >
        {experienceCopy.headline.map((segment, index) => (
          <span
            key={`${segment.text}-${index}`}
            className={segment.accent ? "text-primary" : "text-foreground"}
          >
            {segment.text}
          </span>
        ))}
      </h2>
    </SectionHeader>

    <ExperienceTable />
  </Container>
);
