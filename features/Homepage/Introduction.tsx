import { IntroActions } from "./components/IntroActions";
import { IntroDescription } from "./components/IntroDescription";
import { IntroHeadline } from "./components/IntroHeadline";
import { ScrollHint } from "./components/ScrollHint";

export const Introduction = () => (
  <section className="relative h-screen px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-12 lg:min-h-[70vh] lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="space-y-8 sm:space-y-10">
          <IntroHeadline />
          <IntroDescription />
          <IntroActions />
        </div>
      </div>
    </div>

    {/* <h1 className="text-primary t absolute right-8 -bottom-1 text-[150px] font-bold">
      IDEA FORGED INTO PRODUCT
    </h1> */}

    <ScrollHint />
  </section>
);
