"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const roles = [
  "building interfaces",
  "exploring systems",
  "breaking barriers",
  "forging ideas",
  "crafting code",
];

export const Introduction = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetText = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < targetText.length) {
            setDisplayText(targetText.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100,
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section className="relative px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:min-h-[70vh] lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Left column - Text */}
          <div className="space-y-8 sm:space-y-10">
            <div className="animate-fade-in-up space-y-3">
              <p className="text-primary font-mono text-xs tracking-[0.25em] uppercase sm:tracking-[0.35em]">
                Bartosz Janiuk — Idea forged into product
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl xl:text-6xl">
                Nowoczesne rozwiązania
                <br />
                <span className="from-primary/50 to-accent typing-cursor bg-linear-to-l bg-clip-text text-transparent">
                  {displayText}
                </span>
              </h1>
            </div>

            <p className="text-muted-foreground animate-fade-in-up stagger-2 max-w-lg text-base leading-relaxed sm:text-lg">
              Welcome to my digital workshop — a space for experiments,
              prototypes, and open-source artifacts. Currently building at{" "}
              <span className="text-foreground font-medium">...</span>. Here,
              ideas are forged, tested, and refined. Not a portfolio. A
              laboratory.
            </p>

            <div className="animate-fade-in-up stagger-3 flex flex-col gap-4 sm:flex-row">
              <a
                href="#projects"
                className="group border-primary bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-lg border px-7 py-4 font-mono text-sm transition-all duration-500 active:scale-[0.98] sm:py-3.5"
              >
                <span className="relative z-10">explore artifacts</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
                {/* Animated background */}
                <span className="bg-primary absolute inset-0 -translate-x-full transition-transform duration-500 group-hover:translate-x-0" />
              </a>
              <Link
                href="/introduction"
                className="group border-border text-muted-foreground hover:border-foreground hover:text-foreground hover:bg-secondary/50 inline-flex items-center justify-center gap-3 rounded-lg border px-7 py-4 font-mono text-sm transition-all duration-300 active:scale-[0.98] sm:py-3.5"
              >
                <span>introduction</span>
                <span className="-translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Right column - ASCII Art / Visual */}
          <div className="animate-scale-in stagger-4 relative">
            <div className="border-border bg-card/60 glass hover-lift relative rounded-xl border p-5 sm:p-8">
              {/* Terminal header dots */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="bg-destructive/60 hover:bg-destructive h-3 w-3 rounded-full transition-colors" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/60 transition-colors hover:bg-yellow-500" />
                <div className="bg-primary/60 hover:bg-primary h-3 w-3 rounded-full transition-colors" />
              </div>
              <div className="bg-background/50 text-muted-foreground absolute top-3.5 left-1/2 -translate-x-1/2 rounded-md px-3 py-1 font-mono text-xs">
                terminal://eincode
              </div>

              <pre className="text-primary/80 mt-6 overflow-hidden font-mono text-[10px] leading-relaxed sm:text-xs md:text-sm">
                <span className="sm:hidden">{`┌───────────────────────┐
│  ██████╗███████╗      │
│ ██╔════╝██╔════╝      │
│ ██║     █████╗        │
│ ██║     ██╔══╝        │
│ ╚██████╗██║           │
│  ╚═════╝╚═╝           │
│                       │
│  > experiments: 12    │
│  > status: forging    │
└───────────────────────┘`}</span>
                <span className="hidden sm:block">{`┌─────────────────────────────────────┐
│                                     │
│  ██████╗ ██████╗ ██████╗ ███████╗   │
│ ██╔════╝██╔═══██╗██╔══██╗██╔════╝   │
│ ██║     ██║   ██║██║  ██║█████╗     │
│ ██║     ██║   ██║██║  ██║██╔══╝     │
│ ╚██████╗╚██████╔╝██████╔╝███████╗   │
│  ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝   │
│           Ein                       │
│                                     │
│   > experiments loaded: 12          │
│   > status: forging                 │
│   > last spark: today               │
│                                     │
└─────────────────────────────────────┘`}</span>
              </pre>
            </div>

            <div className="border-primary/40 bg-primary/15 glass text-primary animate-float absolute -top-2 -right-2 rounded-lg border px-3 py-1.5 font-mono text-[11px] sm:-top-6 sm:-right-6 sm:px-4 sm:text-xs">
              <span className="flex items-center gap-2">
                <span className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full" />
                v0.1.0
              </span>
            </div>
            <div
              className="border-border bg-card glass text-muted-foreground animate-float absolute -bottom-3 -left-2 rounded-lg border px-3 py-1.5 font-mono text-[11px] sm:-bottom-6 sm:-left-6 sm:px-4 sm:text-xs"
              style={{ animationDelay: "1s" }}
            >
              Dec. 2025
            </div>

            <div className="bg-primary/5 absolute top-1/2 left-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
          </div>
        </div>
      </div>

      <div className="animate-fade-in stagger-6 absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="text-muted-foreground font-mono text-xs">scroll</span>
        <div className="from-primary/50 h-12 w-px animate-pulse bg-linear-to-b to-transparent" />
      </div>
    </section>
  );
};
