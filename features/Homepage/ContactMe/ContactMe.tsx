import { ParallaxImage } from "@/components/features/ParallaxImage";
import { Container } from "@/components/layout/Container";
import {
  SectionHeader,
  sectionHeadingClassName,
} from "@/components/ui/section-header";
import type { Locale } from "@/lib/i18n/config";
import type { HomePageData } from "@/lib/sanity/fetchers/get-home-page";
import { cn } from "@/lib/utils";
import { HeadlineSegments } from "../components/HeadlineSegments";
import { cmsImageUrl } from "../utils/cms-media";
import { ContactForm } from "./ContactForm";

export type ContactMeSectionProps = {
  locale: Locale;
  gotIdea: NonNullable<HomePageData["gotIdea"]>;
};

export const ContactMeSection = ({
  locale,
  gotIdea,
}: ContactMeSectionProps) => {
  const imageSrc = cmsImageUrl(gotIdea.image, { width: 600 });
  const imageAlt =
    locale === "pl"
      ? "Kontakt — zdjęcie przestrzeni roboczej"
      : "Contact — workspace photo";

  return (
    <Container
      id="contact"
      className="bg-primary-surface text-primary-foreground"
    >
      <SectionHeader
        eyebrow={gotIdea.eyebrow ?? undefined}
        eyebrowTone="onPrimary"
        flush
        actions={
          gotIdea.form ? (
            <ContactForm locale={locale} form={gotIdea.form} />
          ) : undefined
        }
      >
        <div className="flex flex-col gap-10 md:gap-16">
          <div className="min-w-0">
            <h2
              id="got-idea-heading"
              className={cn(sectionHeadingClassName, "max-w-4xl lg:max-w-5xl")}
            >
              <HeadlineSegments segments={gotIdea.headline} tone="onPrimary" />
            </h2>
          </div>
          {imageSrc ? (
            <ParallaxImage
              src={imageSrc}
              alt={imageAlt}
              containerClassName="mx-auto h-[300px] w-[300px] grayscale hover:grayscale-0 transition-all duration-300 lg:mx-0"
            />
          ) : null}
        </div>
      </SectionHeader>
    </Container>
  );
};
