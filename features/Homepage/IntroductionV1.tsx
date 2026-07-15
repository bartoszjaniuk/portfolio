import { CircularTextBadge } from "../Workbench/experiments/CircularTextBadge";
import { IntroActions } from "./components/IntroActions";
import { IntroDescription } from "./components/IntroDescription";
import { IntroHeadline } from "./components/IntroHeadline";
import { ScrollHint } from "./components/ScrollHint";

export const IntroductionV1 = () => (
  <section className="relative h-screen px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24">
    <div className="mx-auto max-w-7xl">
      {/* <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-20">
        <div className="order-1 lg:col-start-1 lg:row-start-1">
          <IntroHeadline />
          <IntroDescription />
        </div>
        <div className="order-2 lg:col-start-2 lg:row-start-1 lg:flex lg:justify-end">
          <CircularTextBadge
            text="DEVELOPMENT * WEB * MOBILE * PWA * SEO * UI/UX"
            size={220}
            radius={70}
            expandedRadius={75}
          />
        </div>
        <div className="order-3 lg:col-start-1 lg:row-start-2">
          <IntroActions />
        </div>
      </div> */}

      <div className="grid gap-12 lg:min-h-[70vh] lg:grid-cols-2 lg:items-center lg:gap-20">
        {/* Left column - Text */}
        <div className="space-y-8 sm:space-y-10">
          <IntroHeadline />

          <IntroDescription />

          <IntroActions />
        </div>

        {/* Right column - ASCII Art / Visual */}
        <div className="flex justify-end">
          <CircularTextBadge
            text="DEVELOPMENT * WEB * MOBILE * PWA * SEO * UI/UX"
            size={220}
            radius={70}
            expandedRadius={75}
          />
        </div>
      </div>
    </div>

    {/* <h1 className="text-primary t absolute right-8 -bottom-1 text-[150px] font-bold">
      IDEA FORGED INTO PRODUCT
    </h1> */}

    {/* <ScrollHint /> */}
  </section>
);
