"use client";

import { useRouter } from "next/navigation";

import { introLinks } from "../utils/intro-content";
import { MagneticButton } from "@/components/ui/magnetic-button";

export const IntroActions = () => {
  const router = useRouter();

  const handleNavigate = (href: string) => {
    if (!href.startsWith("#")) {
      router.push(href);
      return;
    }

    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", href);
  };

  return (
    <div className="animate-fade-in-up stagger-3 flex flex-col gap-4 sm:flex-row">
      <MagneticButton
        variant="primary"
        size="lg"
        className="w-full sm:w-auto"
        onClick={() => handleNavigate(introLinks.projects.href)}
      >
        <span className="relative z-10">{introLinks.projects.label}</span>
        <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
        <span className="bg-primary-surface absolute inset-0 z-0 -translate-x-full transition-transform duration-500 group-hover:translate-x-0" />
      </MagneticButton>
    </div>
  );
};
