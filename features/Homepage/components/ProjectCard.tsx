import Link from "next/link";

import { RevealImage } from "@/components/features/RevealImage";
import { cn } from "@/lib/utils";
import type { ListedProjectView } from "../mappers/to-project-view";

export type ProjectCardProps = {
  project: ListedProjectView;
  className?: string;
};

function isProjectsListingStub(href: string): boolean {
  return (
    href === "/projects" ||
    href.endsWith("/projects") ||
    /\/(en|pl)\/projects\/?$/.test(href)
  );
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const imageAlt = project.category
    ? `${project.title} — ${project.category}`
    : project.title;

  const media = (
    <>
      <div
        className={cn(
          "relative aspect-video w-full overflow-hidden",
          project.tint ?? "bg-muted",
        )}
      >
        <RevealImage
          src={project.image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, min(420px, 42vw)"
          className="absolute inset-0"
          imageClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03] "
        />
      </div>
      <p className="text-foreground mt-3 text-sm font-medium tracking-wide uppercase sm:text-base">
        {project.title}
        {project.category ? (
          <span className="text-muted-foreground"> – {project.category}</span>
        ) : null}
      </p>
    </>
  );

  const sharedClassName = cn(
    "group focus-visible:ring-ring focus-visible:ring-offset-background block focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
    className,
  );

  if (isProjectsListingStub(project.href)) {
    return <div className={sharedClassName}>{media}</div>;
  }

  return (
    <Link href={project.href} className={sharedClassName}>
      {media}
    </Link>
  );
}
