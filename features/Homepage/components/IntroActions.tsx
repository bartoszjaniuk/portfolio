import Link from "next/link";
import { introLinks } from "../utils/intro-content";

export const IntroActions = () => (
  <div className="animate-fade-in-up stagger-3 flex flex-col gap-4 sm:flex-row">
    <a
      href={introLinks.projects.href}
      className="group border-primary bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-lg border px-7 py-4 font-mono text-sm transition-all duration-500 active:scale-[0.98] sm:py-3.5"
    >
      <span className="relative z-10">{introLinks.projects.label}</span>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
      <span className="bg-primary absolute inset-0 -translate-x-full transition-transform duration-500 group-hover:translate-x-0" />
    </a>
    <Link
      href={introLinks.introduction.href}
      className="group border-border text-muted-foreground hover:border-foreground hover:text-foreground hover:bg-secondary/50 inline-flex items-center justify-center gap-3 rounded-lg border px-7 py-4 font-mono text-sm transition-all duration-300 active:scale-[0.98] sm:py-3.5"
    >
      <span>{introLinks.introduction.label}</span>
      <span className="-translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        →
      </span>
    </Link>
  </div>
);
