"use client";

import {
  getLongestText,
  useTypewriter,
} from "@/features/Homepage/hooks/useTypewriter";
import { introCopy, roles } from "../utils/intro-content";
import { TypewriterText } from "./TypewriterText";

const longestRole = getLongestText(roles);

export const IntroHeadline = () => {
  const displayText = useTypewriter(roles);

  return (
    <div className="animate-fade-in-up space-y-3">
      <p className="text-primary text-xs font-semibold tracking-widest uppercase sm:tracking-[0.35em]">
        {introCopy.tagline}
      </p>
      <h1 className="text-4xl tracking-tight text-balance uppercase sm:text-4xl lg:text-5xl xl:text-7xl">
        {introCopy.headline}

        <br />
        <TypewriterText
          text={displayText}
          placeholder={longestRole}
          className="from-primary/50 to-accent bg-linear-to-l bg-clip-text text-transparent"
        />
      </h1>
    </div>
  );
};
