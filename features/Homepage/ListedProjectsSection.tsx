"use client";

import Link from "next/link";
import * as React from "react";

import { RevealImage } from "@/components/features/RevealImage";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

import { ExperienceHeadlineSegment } from "./utils/experience-content";

export const listedProjectsCopy = {
  eyebrow: "↳ SELECTED WORK",
  headline: [
    { text: "SELECTED " },
    { text: "WORKS", accent: true },
    { text: " EXPLORING STRUCTURE, INTERACTION, AND VISUAL CLARITY ACROSS " },
    { text: "DIGITAL", accent: true },
    { text: " PLATFORMS." },
  ] satisfies ExperienceHeadlineSegment[],
  description:
    "A curated selection of product interfaces and platforms — from fitness and culinary tools to clinic experiences — focused on structure, interaction, and clarity.",
  seeAllLabel: "SEE ALL WORK",
  seeAllHref: "/projects",
} as const;

type ListedProject = {
  id: string;
  title: string;
  category: string;
  image: string;
  href: string;
  /** Solid tint behind Image when asset is slow/missing */
  tint?: string;
  /**
   * Desktop absolute placement (workbench-style staggered gallery).
   * Mobile ignores this and stacks vertically.
   */
  placement: string;
};

export const listedProjects: ListedProject[] = [
  {
    id: "fitap",
    title: "Fitap",
    category: "Fitness App",
    image: "/projects/fitap.webp",
    href: "/projects",
    tint: "bg-secondary",
    placement: "md:top-0 md:left-[4%] lg:left-[0%]",
  },
  {
    id: "umami",
    title: "Umami",
    category: "Culinary Platform",
    image: "/projects/umami.webp",
    href: "/projects",
    tint: "bg-muted",
    placement: "md:top-[420px] md:right-[4%] lg:right-[0%]",
  },
  {
    id: "cookscale",
    title: "Cookscale",
    category: "Kitchen Tools",
    image: "/projects/cookscale.webp",
    href: "/projects",
    tint: "bg-secondary",
    placement: "md:top-[780px] md:left-[10%] lg:left-[0%]",
  },
  {
    id: "physio",
    title: "Physio",
    category: "Clinic Platform",
    image: "/projects/physioterapy.webp",
    href: "/projects",
    tint: "bg-muted",
    placement: "md:top-[1180px] md:right-[6%] lg:right-[0%]",
  },
  {
    id: "dental",
    title: "Dental",
    category: "Clinic Website",
    image: "/projects/stomatology.webp",
    href: "/projects",
    tint: "bg-secondary",
    placement: "md:top-[1560px] md:left-[6%] lg:left-0",
  },
];

export const ListedProjectsSection = () => {
  return (
    <Container id="projects" aria-label="Selected works">
      <Heading headingId="selected-works-heading" />

      {/* Mobile: simple vertical stack with reveal */}
      <ul className="flex flex-col gap-10 md:hidden">
        {listedProjects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>

      {/* Desktop: workbench-style staggered absolute gallery + reveal-on-scroll */}
      <div className="relative hidden min-h-[2100px] md:block">
        {listedProjects.map((project) => (
          <ProjectCard
            key={project.id}
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
const Heading = ({
  headingId,
  flush = false,
}: {
  headingId?: string;
  flush?: boolean;
}) => {
  return (
    <header className={cn(!flush && "mb-10 sm:mb-14")}>
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10 lg:gap-16">
        <Eyebrow className="mb-0 shrink-0 md:pt-1">
          {listedProjectsCopy.eyebrow}
        </Eyebrow>

        <div className="flex w-full flex-col gap-6 md:max-w-[min(100%,36rem)] lg:max-w-xl lg:gap-8 xl:max-w-2xl">
          <h2
            id={headingId}
            className="text-foreground text-3xl font-bold tracking-tight uppercase sm:text-5xl lg:text-6xl"
          >
            {listedProjectsCopy.headline.map((segment, index) => (
              <span
                key={`${segment.text}-${index}`}
                className={segment.accent ? "text-primary" : "text-foreground"}
              >
                {segment.text}
              </span>
            ))}
          </h2>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed sm:text-base">
              {listedProjectsCopy.description}
            </p>
            <Link
              href={listedProjectsCopy.seeAllHref}
              className="text-foreground focus-visible:ring-ring/50 hover:text-primary w-fit shrink-0 self-start text-sm font-medium tracking-wide uppercase underline underline-offset-4 transition-colors focus-visible:rounded-sm focus-visible:ring-2 focus-visible:outline-none sm:self-auto sm:text-base"
            >
              {listedProjectsCopy.seeAllLabel}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

const ProjectCard = ({
  project,
  className,
}: {
  project: ListedProject;
  className?: string;
}) => {
  return (
    <Link
      href={project.href}
      className={cn(
        "group focus-visible:ring-ring focus-visible:ring-offset-background block focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        className,
      )}
    >
      <div
        className={cn(
          "relative aspect-16/9 w-full overflow-hidden",
          project.tint ?? "bg-muted",
        )}
      >
        <RevealImage
          src={project.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, min(420px, 42vw)"
          className="absolute inset-0"
          imageClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <p className="text-foreground mt-3 text-sm font-medium tracking-wide uppercase sm:text-base">
        {project.title}
        <span className="text-muted-foreground"> – {project.category}</span>
      </p>
    </Link>
  );
};
