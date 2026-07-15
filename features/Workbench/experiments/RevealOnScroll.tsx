"use client";

import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import * as React from "react";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type RevealTileConfig = {
  id: string;
  label: string;
  caption: string;
  className: string;
  visual: "orbital" | "panel" | "bars" | "code" | "hero";
};

const revealTiles: RevealTileConfig[] = [
  {
    id: "artifact-map",
    label: "Artifact map",
    caption: "Masked reveal from the lower edge.",
    className: "left-[7%] top-[620px] h-44 w-64 sm:h-56 sm:w-80",
    visual: "orbital",
  },
  {
    id: "product-slice",
    label: "Product slice",
    caption: "Fixed placement, no transform drift.",
    className: "right-[12%] top-[620px] h-36 w-60 sm:h-56 sm:w-72",
    visual: "hero",
  },
  {
    id: "signal-card",
    label: "Signal card",
    caption: "The image is clipped in, not moved.",
    className: "left-[24%] top-[900px] h-40 w-64 sm:h-48 sm:w-76",
    visual: "bars",
  },
  {
    id: "logic-panel",
    label: "Logic panel",
    caption: "Opacity completes the masked entrance.",
    className: "right-[8%] top-[1140px] h-36 w-60 sm:h-44 sm:w-72",
    visual: "code",
  },
  {
    id: "landing-panel",
    label: "Landing panel",
    caption: "A final reveal from bottom to top.",
    className: "left-[10%] top-[1390px] h-44 w-64 sm:h-64 sm:w-84",
    visual: "panel",
  },
];

const rangeBars = Array.from({ length: 9 }, (_, index) => index);
const codeRows = Array.from({ length: 7 }, (_, index) => index);

export const RevealOnScroll = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [progress, setProgress] = React.useState(0);

  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const promptOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const trackScale = useTransform(scrollYProgress, [0, 1], [0.08, 1]);
  const showPrompt = progress < 24;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(Math.round(latest * 100));
  });

  return (
    <div
      ref={containerRef}
      className="bg-background/95 relative h-[620px] w-full overflow-y-auto overscroll-contain rounded-md"
      aria-label="01 reveal on scroll animation"
    >
      <div className="relative h-[1780px] overflow-hidden">
        <div className="pointer-events-none sticky top-0 z-20 h-0">
          <div className="absolute inset-x-6 top-6 flex items-center justify-between gap-4 text-xs font-semibold tracking-[0.2em] uppercase sm:inset-x-10">
            <span className="border-primary/40 bg-background/80 text-primary flex h-9 w-9 items-center justify-center rounded-md border backdrop-blur-md">
              01
            </span>
            <span className="text-primary tabular-nums">{progress}%</span>
          </div>

          <motion.div
            className="bg-primary absolute top-20 right-6 left-6 h-px origin-left sm:right-10 sm:left-10"
            style={{ scaleX: prefersReducedMotion ? 1 : trackScale }}
          />
        </div>

        <div className="sticky top-0 h-[620px] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,var(--primary)_0,transparent_28%),radial-gradient(circle_at_76%_72%,var(--primary)_0,transparent_24%)] opacity-[0.08]" />
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center"
            style={{
              opacity: prefersReducedMotion || !showPrompt ? 0 : promptOpacity,
            }}
          >
            <span className="text-muted-foreground text-xs tracking-[0.28em] uppercase">
              Scroll to reveal
            </span>
          </motion.div>
          <div className="from-background pointer-events-none absolute right-0 bottom-0 left-0 h-28 bg-linear-to-t to-transparent" />
        </div>

        {revealTiles.map((tile) => (
          <RevealTile
            key={tile.id}
            config={tile}
            scrollRoot={containerRef}
            reducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </div>
  );
};

const RevealTile = ({
  config,
  scrollRoot,
  reducedMotion,
}: {
  config: RevealTileConfig;
  scrollRoot: React.RefObject<HTMLDivElement | null>;
  reducedMotion: boolean;
}) => {
  const tileRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(tileRef, {
    amount: 0.28,
    margin: "0px 0px -12% 0px",
    once: false,
    root: scrollRoot,
  });
  const isRevealed = reducedMotion || isInView;

  return (
    <article
      ref={tileRef}
      className={cn(
        "border-border/70 bg-card/85 absolute overflow-hidden rounded-md border shadow-2xl shadow-black/25 backdrop-blur-xl",
        config.className,
      )}
    >
      <motion.div
        className="h-full"
        initial={false}
        animate={{
          clipPath: isRevealed ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
          opacity: isRevealed ? 1 : 0,
        }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <TileVisual visual={config.visual} />
        <div className="from-background/95 via-background/72 absolute right-0 bottom-0 left-0 bg-linear-to-t to-transparent p-4">
          <p className="text-foreground text-sm font-black">{config.label}</p>
          <p className="text-muted-foreground mt-1 text-[10px] tracking-[0.16em] uppercase">
            {config.caption}
          </p>
        </div>
      </motion.div>
    </article>
  );
};

const TileVisual = ({ visual }: { visual: RevealTileConfig["visual"] }) => {
  if (visual === "orbital") {
    return (
      <div className="relative h-full bg-[radial-gradient(circle_at_38%_42%,var(--primary)_0,transparent_30%),linear-gradient(135deg,var(--secondary),transparent)]">
        <div className="border-primary/50 absolute top-1/2 left-1/2 h-30 w-30 -translate-x-1/2 -translate-y-1/2 rounded-full border" />
        <div className="bg-primary absolute top-[32%] left-[56%] h-8 w-8 rounded-full" />
        <div className="bg-foreground/75 absolute right-[18%] bottom-[24%] h-3 w-18 rounded-full" />
      </div>
    );
  }

  if (visual === "hero") {
    return (
      <div className="relative h-full bg-[linear-gradient(120deg,var(--primary),transparent_58%),linear-gradient(45deg,var(--secondary),var(--background))]">
        <div className="bg-background/70 absolute top-5 right-5 h-16 w-30 rounded-md" />
        <div className="bg-primary/80 absolute bottom-10 left-7 h-6 w-36 rounded-full" />
        <div className="bg-foreground/70 absolute bottom-20 left-7 h-3 w-20 rounded-full" />
      </div>
    );
  }

  if (visual === "bars") {
    return (
      <div className="bg-secondary/30 flex h-full items-center justify-center gap-2 px-8">
        {rangeBars.map((bar) => (
          <span
            key={bar}
            className="bg-primary/80 w-full rounded-full"
            style={{ height: `${28 + ((bar * 17) % 82)}px` }}
          />
        ))}
      </div>
    );
  }

  if (visual === "code") {
    return (
      <div className="bg-background/85 flex h-full flex-col justify-center gap-3 p-6">
        {codeRows.map((row) => (
          <span
            key={row}
            className="bg-foreground/20 h-2 rounded-full"
            style={{ width: `${34 + ((row * 19) % 58)}%` }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative h-full bg-[linear-gradient(135deg,var(--secondary),transparent),radial-gradient(circle_at_70%_35%,var(--primary)_0,transparent_32%)]">
      <div className="border-border/80 bg-background/80 absolute top-7 left-7 h-24 w-40 rounded-md border" />
      <div className="bg-primary/70 absolute right-8 bottom-16 h-20 w-20 rounded-md" />
      <div className="bg-foreground/80 absolute bottom-8 left-8 h-3 w-44 rounded-full" />
    </div>
  );
};
