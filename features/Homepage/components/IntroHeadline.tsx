"use client";

import { Eyebrow } from "@/components/ui/eyebrow";
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
    <div className="animate-fade-in-up">
      <Eyebrow tone="primary">{introCopy.tagline}</Eyebrow>
      <h1 className="text-3xl tracking-tight text-balance uppercase sm:text-4xl lg:text-5xl xl:text-7xl">
        {introCopy.headline}

        <br />
        <TypewriterText
          text={displayText}
          placeholder={longestRole}
          className="bg-linear-to-l from-(--gradient-from) to-(--gradient-to) bg-clip-text text-transparent"
        />
      </h1>
    </div>
  );
};
