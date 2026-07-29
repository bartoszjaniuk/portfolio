import type { HeadlineSegment } from "@/lib/sanity/fetchers/get-home-page";
import { cn } from "@/lib/utils";

export type HeadlineSegmentsTone = "default" | "onPrimary";

export type HeadlineSegmentsProps = {
  segments: HeadlineSegment[] | null | undefined;
  tone?: HeadlineSegmentsTone;
  className?: string;
};

const toneClasses: Record<
  HeadlineSegmentsTone,
  { base: string; accent: string }
> = {
  default: {
    base: "text-foreground",
    accent: "text-primary",
  },
  onPrimary: {
    base: "text-primary-foreground",
    accent: "text-primary-foreground/45",
  },
};

export function HeadlineSegments({
  segments,
  tone = "default",
  className,
}: HeadlineSegmentsProps) {
  const list = segments ?? [];
  const colors = toneClasses[tone];

  return (
    <>
      {list.map((segment, index) => (
        <span
          key={`${segment.text}-${index}`}
          className={cn(
            colors.base,
            segment.accent && colors.accent,
            segment.newLine && "block",
            className,
          )}
        >
          {segment.text}
        </span>
      ))}
    </>
  );
}
