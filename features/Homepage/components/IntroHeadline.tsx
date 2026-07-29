"use client";

import { Eyebrow } from "@/components/ui/eyebrow";
import {
  getLongestText,
  useTypewriter,
} from "@/features/Homepage/hooks/useTypewriter";
import { TypewriterText } from "./TypewriterText";

export type IntroHeadlineProps = {
  tagline: string | null;
  headline: string | null;
  roles: string[] | null;
};

export const IntroHeadline = ({
  tagline,
  headline,
  roles,
}: IntroHeadlineProps) => {
  const roleList = roles ?? [];
  const displayText = useTypewriter(roleList);
  const longestRole = getLongestText(roleList);

  return (
    <div className="animate-fade-in-up">
      {tagline ? <Eyebrow tone="primary">{tagline}</Eyebrow> : null}
      <h1 className="text-3xl tracking-tight text-balance uppercase sm:text-4xl lg:text-5xl xl:text-7xl">
        {headline}

        {roleList.length > 0 ? (
          <>
            <br />
            <TypewriterText
              text={displayText}
              placeholder={longestRole}
              className="bg-linear-to-l from-(--gradient-from) to-(--gradient-to) bg-clip-text text-transparent"
            />
          </>
        ) : null}
      </h1>
    </div>
  );
};
