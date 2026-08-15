import { ShaderBackground } from "@/components/features/ShaderBackground";
import { Container } from "@/components/layout/Container";
import type { Locale } from "@/lib/i18n/config";
import type { HomePageData } from "@/lib/sanity/fetchers/get-home-page";
import { IntroActions } from "./components/IntroActions";
import { IntroDescription } from "./components/IntroDescription";
import { IntroHeadline } from "./components/IntroHeadline";
import { ScrollHint } from "./components/ScrollHint";

export type IntroductionProps = {
  locale: Locale;
  intro: NonNullable<HomePageData["intro"]>;
};

export const Introduction = ({ locale, intro }: IntroductionProps) => (
  <Container id="intro" className="min-h-[100dvh] pt-20" contained={false}>
    <ShaderBackground variant="contained" />

    <div className="relative z-10 mx-auto max-w-7xl">
      <div className="flex min-h-[calc(100dvh-5rem)] flex-col justify-center gap-12 lg:grid lg:min-h-[70vh] lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="space-y-8 sm:space-y-10">
          <IntroHeadline
            tagline={intro.tagline}
            headline={intro.headline}
            roles={intro.roles}
          />
          <IntroDescription descriptionBefore={intro.descriptionBefore} />
          <IntroActions locale={locale} primaryCta={intro.primaryCta} />
        </div>
      </div>
    </div>

    {intro.scrollHint ? <ScrollHint label={intro.scrollHint} /> : null}
  </Container>
);
