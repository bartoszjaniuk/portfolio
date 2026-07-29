import { Container } from "@/components/layout/Container";
import {
  SectionHeader,
  sectionHeadingClassName,
} from "@/components/ui/section-header";
import type { Locale } from "@/lib/i18n/config";
import type { HomePageData } from "@/lib/sanity/fetchers/get-home-page";
import { cn } from "@/lib/utils";
import { HeadlineSegments } from "../components/HeadlineSegments";
import { ContactMeLink } from "./ContactMeLink";

export type ContactMeSectionProps = {
  locale: Locale;
  gotIdea: NonNullable<HomePageData["gotIdea"]>;
};

export const ContactMeSection = ({
  locale,
  gotIdea,
}: ContactMeSectionProps) => {
  return (
    <Container className="bg-primary">
      <SectionHeader eyebrow={"↳ Contact me"} eyebrowTone="onPrimary" flush>
        <h2
          id="got-idea-heading"
          className={cn(sectionHeadingClassName, "max-w-4xl lg:max-w-5xl")}
        >
          <HeadlineSegments
            segments={[
              {
                text: "Have a",
                accent: false,
              },
              {
                text: " project",
                accent: true,
              },
              {
                text: "in mind?",
                accent: false,
              },
              {
                text: "Let’s ",
                accent: false,
                newLine: false,
              },
              {
                text: "turn your ideas into something",
                accent: false,
                newLine: false,
              },
              {
                text: " meaningful.",
                accent: true,
              },
            ]}
            tone="onPrimary"
          />
        </h2>
        {gotIdea.line1 ? <ContactMeLink locale={locale} /> : null}
      </SectionHeader>
    </Container>
  );
};
