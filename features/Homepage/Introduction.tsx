import { IntroActions } from "./components/IntroActions";
import { IntroDescription } from "./components/IntroDescription";
import { IntroHeadline } from "./components/IntroHeadline";
import { ScrollHint } from "./components/ScrollHint";
import { TerminalPreview } from "./components/TerminalPreview";

export const Introduction = () => (
  <section className="relative px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-12 lg:min-h-[70vh] lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="space-y-8 sm:space-y-10">
          <IntroHeadline />
          <IntroDescription />
          <IntroActions />
        </div>
        <TerminalPreview />
      </div>
    </div>
    <ScrollHint />
  </section>
);
