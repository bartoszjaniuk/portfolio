"use client";
import { ParallaxImage } from "@/components/features/ParallaxImage";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/section-header";
import { CircularTextBadge } from "../Workbench/experiments/CircularTextBadge";
import { ExperienceHeadlineSegment } from "./utils/experience-content";
import { cn } from "@/lib/utils";

export const aboutMeCopy = {
  title: "About Me",
  eyebrow: "↳ ABOUT ME",
  headline: [
    { text: "BLENDING " },
    { text: "CREATIVITY", accent: true },
    { text: "AND TECHNOLOGY TO FORGE ", newLine: true },
    { text: "MOBILE & WEB" },
    { text: " APPS", accent: true },
    { text: " THAT " },
    { text: "RESONATE", accent: true },
    { text: "." },
  ] satisfies ExperienceHeadlineSegment[],
} as const;

export const AboutMeSection = () => {
  return (
    <Container
      className="bg-primary-surface text-primary-foreground min-h-screen overflow-x-clip"
      innerClassName="relative flex flex-col gap-10 sm:gap-14"
    >
      <SectionHeader
        eyebrow={aboutMeCopy.eyebrow}
        eyebrowTone="onPrimary"
        flush
        actions={
          <CircularTextBadge
            className="hidden shrink-0 md:inline-flex"
            variant="default"
            text="DEVELOPMENT * WEB * MOBILE * PWA * SEO * UI/UX"
            size={220}
            radius={70}
            expandedRadius={75}
          />
        }
      >
        <h2
          id="about-me-heading"
          className="max-w-4xl text-3xl font-bold tracking-tight uppercase sm:text-5xl lg:max-w-5xl lg:text-6xl"
        >
          {aboutMeCopy.headline.map((segment, index) => (
            <span
              key={`${segment.text}-${index}`}
              className={cn(
                "text-primary-foreground",
                segment.accent && "text-primary-foreground/45",
                segment.newLine && "block",
              )}
            >
              {segment.text}
            </span>
          ))}
        </h2>
      </SectionHeader>

      <div className="flex flex-col gap-10 lg:flex-row lg:gap-16 xl:gap-24">
        <p className="w-full max-w-md text-sm leading-relaxed sm:text-base lg:w-[350px] lg:shrink-0">
          I’m Bartosz Janiuk, a battle tested passionate about forging digital
          experiences that leave a lasting impression. My work spans across web
          & mobile development, combining creativity and strategy to create
          meaningful products.
        </p>
        <div className="flex flex-col gap-10 md:gap-16">
          <ParallaxImage
            src="/developer.webp"
            alt="developer"
            containerClassName="mx-auto h-[200px] w-[200px] lg:mx-0"
          />

          <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
            <p className="w-full max-w-md text-sm leading-relaxed sm:text-base lg:w-[350px]">
              I focus on designing digital products and visuals that are both
              functional and aesthetically engaging. Every interface, brand
              identity, or illustration I create is thoughtfully crafted to
              ensure intuitive interactions, clear visual clarity, and a
              cohesive, compelling story.
            </p>

            <p className="w-full max-w-md text-sm leading-relaxed sm:text-base lg:w-[350px]">
              Over the years, I’ve collaborated with a wide range of clients,
              delivering more than 50 successful projects globally. From
              innovative startups to established brands, I help transform ideas
              into tangible, engaging experiences that communicate effectively
              and resonate with audiences.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <ParallaxImage
          src="/developer.webp"
          alt="digital"
          containerClassName="aspect-square h-auto w-full max-w-[700px]"
        />
      </div>
    </Container>
  );
};
