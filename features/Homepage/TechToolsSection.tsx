"use client";
import { ParallaxImage } from "@/components/features/ParallaxImage";
import { CircularTextBadge } from "../Workbench/experiments/CircularTextBadge";

export const TechToolsSection = () => {
  return (
    <section className="bg-primary relative min-h-screen px-4 pt-18 pb-16 sm:px-6 sm:pb-24">
      <div className="relative mx-auto max-w-7xl">
        <div className="flex justify-between">
          <CircularTextBadge
            variant="default"
            text="DEVELOPMENT * WEB * MOBILE * PWA * SEO * UI/UX"
            size={220}
            radius={70}
            expandedRadius={75}
          />
          <h1 className="w-[650px] text-justify text-6xl font-bold tracking-tight whitespace-pre-wrap">
            Blending creativity and technology to craft interfaces, brands, and
            illustrations that resonate.{" "}
          </h1>
        </div>
        <div className="flex justify-between pt-16">
          <p className="w-[500px]">
            I’m Constantine Angel, a multidisciplinary designer passionate about
            crafting digital experiences that leave a lasting impression. My
            work spans across UI/UX design, web development, branding, and
            illustration, combining creativity and strategy to create meaningful
            solutions.
          </p>
          <ParallaxImage
            src="/mando.jpeg"
            alt="mando"
            containerClassName="h-[500px] w-[500px] mt-16"
          />
        </div>

        <div className="flex justify-between pt-16">
          <ParallaxImage
            src="/digital.svg"
            alt="mando"
            containerClassName="h-[500px] w-[500px] mt-16"
          />
          <p className="w-[500px]">
            I focus on designing digital products and visuals that are both
            functional and aesthetically engaging. Every interface, brand
            identity, or illustration I create is thoughtfully crafted to ensure
            intuitive interactions, clear visual clarity, and a cohesive,
            compelling story.
          </p>
        </div>

        {/* <p>
          Over the years, I’ve collaborated with a wide range of clients,
          delivering more than 50 successful projects globally. From innovative
          startups to established brands, I help transform ideas into tangible,
          engaging experiences that communicate effectively and resonate with
          audiences.
        </p> */}

        {/* <ParallaxSection
          src="/mando.jpeg"
          alt=""
          priority
          strength={100}
          className="min-h-[85svh]"
          overlayClassName="bg-black/45"
        >
          <div className="mx-auto flex min-h-[85svh] max-w-6xl items-center px-6">
            <div className="max-w-2xl text-white">
              <p className="mb-3 text-sm font-medium tracking-widest uppercase">
                Next.js
              </p>

              <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
                Sekcja z efektem parallax
              </h1>

              <p className="mt-6 max-w-xl text-lg text-white/80">
                Obraz jest optymalizowany przez Next.js i przesuwa się wolniej
                niż zawartość strony.
              </p>
            </div>
          </div>
        </ParallaxSection> */}
      </div>
    </section>
  );
};
