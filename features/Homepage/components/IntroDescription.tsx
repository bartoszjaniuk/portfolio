import { introCopy } from "../utils/intro-content";

export const IntroDescription = () => (
  <p className="text-muted-foreground animate-fade-in-up stagger-2 max-w-lg text-base leading-relaxed sm:text-lg">
    {introCopy.description.before}{" "}
    <span className="text-foreground font-medium">
      {introCopy.description.highlight}
    </span>
    . {introCopy.description.after}
  </p>
);
