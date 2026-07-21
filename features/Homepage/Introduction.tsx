import { ShaderBackground } from "@/components/features/ShaderBackground";
import { Container } from "@/components/layout/Container";
import { IntroActions } from "./components/IntroActions";
import { IntroDescription } from "./components/IntroDescription";
import { IntroHeadline } from "./components/IntroHeadline";
import { ScrollHint } from "./components/ScrollHint";

export const Introduction = () => (
  <Container className="h-screen pt-20" contained={false}>
    <ShaderBackground variant="contained" />

    <div className="relative z-10 mx-auto max-w-7xl">
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
  </Container>
);
