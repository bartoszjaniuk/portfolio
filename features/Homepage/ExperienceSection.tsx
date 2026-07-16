import { ExperienceTable } from "./components/ExperienceTable";
import { experienceCopy } from "./utils/experience-content";

export const ExperienceSection = () => (
  <section
    id="experience"
    aria-labelledby="experience-heading"
    className="relative scroll-mt-24 px-4 pt-28 pb-16 sm:scroll-mt-28 sm:px-6 sm:pt-36 sm:pb-24"
  >
    <div className="mx-auto max-w-7xl">
      <header className="mb-10 sm:mb-14">
        <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase sm:tracking-[0.35em]">
          {experienceCopy.eyebrow}
        </p>
        <h2
          id="experience-heading"
          className="text-foreground mt-4 max-w-4xl text-3xl font-bold tracking-tight uppercase sm:mt-6 sm:text-5xl lg:max-w-5xl lg:text-6xl"
        >
          {experienceCopy.headline.map((segment, index) => (
            <span
              key={`${segment.text}-${index}`}
              className={
                segment.accent ? "text-muted-foreground" : "text-foreground"
              }
            >
              {segment.text}
            </span>
          ))}
        </h2>
      </header>

      <ExperienceTable />
    </div>
  </section>
);
