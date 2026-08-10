import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { sectionHeadingClassName } from "@/components/ui/section-header";
import type { Locale } from "@/lib/i18n/config";
import type {
  HeadlineSegment,
  HomePageData,
} from "@/lib/sanity/fetchers/get-home-page";
import { cn } from "@/lib/utils";
import { HeadlineSegments } from "./components/HeadlineSegments";
import { ProjectCard } from "./components/ProjectCard";
import {
  toProjectView,
  type ListedProjectView,
} from "./mappers/to-project-view";

export type ListedProjectsSectionProps = {
  locale: Locale;
  projectsSection: NonNullable<HomePageData["projectsSection"]>;
};

export const ListedProjectsSection = ({
  locale,
  projectsSection,
}: ListedProjectsSectionProps) => {
  const projects = (projectsSection.items ?? [])
    .map((project) => toProjectView(locale, project))
    .filter((project): project is ListedProjectView => project !== null);

  return (
    <Container id="projects" aria-label="Selected works">
      <ProjectsHeading
        headingId="selected-works-heading"
        eyebrow={projectsSection.eyebrow}
        headline={projectsSection.headline}
        description={projectsSection.description}
      />

      <ul className="flex flex-col gap-10 md:hidden">
        {projects.map((project) => (
          <li key={project.key}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>

      <div className="relative hidden min-h-[2100px] md:block">
        {projects.map((project) => (
          <ProjectCard
            key={project.key}
            project={project}
            className={cn("absolute w-[min(620px,62vw)]", project.placement)}
          />
        ))}
      </div>
    </Container>
  );
};

function ProjectsHeading({
  headingId,
  flush = false,
  eyebrow,
  headline,
  description,
}: {
  headingId?: string;
  flush?: boolean;
  eyebrow: string | null;
  headline: HeadlineSegment[] | null;
  description: string | null;
}) {
  return (
    <header className={cn(!flush && "mb-10 sm:mb-14")}>
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10 lg:gap-16">
        {eyebrow ? (
          <Eyebrow className="mb-0 shrink-0 md:pt-1">{eyebrow}</Eyebrow>
        ) : null}

        <div className="flex w-full flex-col gap-6 md:max-w-[min(100%,36rem)] lg:max-w-xl lg:gap-8 xl:max-w-2xl">
          <h2
            id={headingId}
            className={cn(sectionHeadingClassName, "text-foreground")}
          >
            <HeadlineSegments segments={headline} />
          </h2>

          {description ? (
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed sm:text-base">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
