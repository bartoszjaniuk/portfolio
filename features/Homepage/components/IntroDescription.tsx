import { introCopy } from "../utils/intro-content";

export const IntroDescription = () => (
  <p className="text-muted-foreground animate-fade-in-up stagger-2 max-w-md text-base leading-relaxed sm:text-lg">
    {introCopy.description.before}{" "}
    <span className="text-foreground font-medium"></span>.{" "}
    {/* {introCopy.description.after}{" "}
    <a
      href={introCopy.link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline"
    >
      {introCopy.link.label}
    </a> */}
  </p>
);
