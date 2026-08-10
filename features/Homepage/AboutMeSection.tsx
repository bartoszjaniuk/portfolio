import { ParallaxImage } from "@/components/features/ParallaxImage";
import { Container } from "@/components/layout/Container";
import {
  SectionHeader,
  sectionHeadingClassName,
} from "@/components/ui/section-header";
import type { HomePageData } from "@/lib/sanity/fetchers/get-home-page";
import { cn } from "@/lib/utils";
import { CircularTextBadge } from "../Workbench/experiments/CircularTextBadge";
import { HeadlineSegments } from "./components/HeadlineSegments";
import { cmsImageUrl } from "./utils/cms-media";

export type AboutMeSectionProps = {
  about: NonNullable<HomePageData["about"]>;
  personName?: string | null;
};

export const AboutMeSection = ({ about, personName }: AboutMeSectionProps) => {
  const paragraphs = about.paragraphs ?? [];
  const portraitSrc = cmsImageUrl(about.portraitImage, { width: 400 });
  const wideSrc = cmsImageUrl(about.wideImage, { width: 1400 });
  const [firstParagraph, ...restParagraphs] = paragraphs;
  const portraitAlt = personName?.trim() || "Bartosz Janiuk";
  const wideAlt = `${portraitAlt} — portrait`;

  return (
    <Container
      id="about"
      className="bg-primary-surface text-primary-foreground min-h-screen overflow-x-clip"
      innerClassName="relative flex flex-col gap-10 sm:gap-14"
    >
      <SectionHeader
        eyebrow={about.eyebrow ?? undefined}
        eyebrowTone="onPrimary"
        flush
        actions={
          about.badgeText ? (
            <CircularTextBadge
              className="hidden shrink-0 md:inline-flex"
              variant="default"
              text={about.badgeText}
              size={220}
              radius={70}
              expandedRadius={75}
            />
          ) : undefined
        }
      >
        <h2
          id="about-me-heading"
          className={cn(sectionHeadingClassName, "max-w-4xl lg:max-w-5xl")}
        >
          <HeadlineSegments segments={about.headline} tone="onPrimary" />
        </h2>
      </SectionHeader>

      <div className="flex flex-col gap-10 lg:flex-row lg:gap-16 xl:gap-24">
        {firstParagraph ? (
          <p className="w-full max-w-md text-sm leading-relaxed sm:text-base lg:w-87.5 lg:shrink-0">
            {firstParagraph}
          </p>
        ) : null}
        <div className="flex flex-col gap-10 md:gap-16">
          {portraitSrc ? (
            <ParallaxImage
              src={portraitSrc}
              alt={portraitAlt}
              containerClassName="mx-auto h-[200px] w-[200px] lg:mx-0"
            />
          ) : null}

          {restParagraphs.length > 0 ? (
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
              {restParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="w-full max-w-md text-sm leading-relaxed sm:text-base lg:w-[350px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {wideSrc ? (
        <div className="flex items-center justify-center">
          <ParallaxImage
            src={wideSrc}
            alt={wideAlt}
            containerClassName="aspect-square h-auto w-full max-w-[700px]"
          />
        </div>
      ) : null}
    </Container>
  );
};
