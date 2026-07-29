import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { sectionHeadingClassName } from "@/components/ui/section-header";
import { localizeHref, type Locale } from "@/lib/i18n/config";
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
        locale={locale}
        headingId="selected-works-heading"
        eyebrow={projectsSection.eyebrow}
        headline={projectsSection.headline}
        description={projectsSection.description}
        seeAll={projectsSection.seeAll}
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

/**
 * Constantine-style header: eyebrow left, headline + body + text link right.
 */
function ProjectsHeading({
  locale,
  headingId,
  flush = false,
  eyebrow,
  headline,
  description,
  seeAll,
}: {
  locale: Locale;
  headingId?: string;
  flush?: boolean;
  eyebrow: string | null;
  headline: HeadlineSegment[] | null;
  description: string | null;
  seeAll: NonNullable<HomePageData["projectsSection"]>["seeAll"];
}) {
  const seeAllHref =
    seeAll?.href && seeAll.label ? localizeHref(locale, seeAll.href) : null;

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

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            {description ? (
              <p className="text-muted-foreground max-w-md text-sm leading-relaxed sm:text-base">
                {description}
              </p>
            ) : null}
            {seeAllHref && seeAll?.label ? (
              <Link
                href={seeAllHref}
                className="text-foreground focus-visible:ring-ring/50 hover:text-primary w-fit shrink-0 self-start text-sm font-medium tracking-wide uppercase underline underline-offset-4 transition-colors focus-visible:rounded-sm focus-visible:ring-2 focus-visible:outline-none sm:self-auto sm:text-base"
              >
                {seeAll.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
