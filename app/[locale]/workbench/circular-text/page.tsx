import { CircularTextBadge } from "@/features/Workbench/experiments/CircularTextBadge";

const badgeProps = {
  text: "ILLUSTRATION  •  DEVELOPMENT  •  BRANDING  •  ILLUSTRATION  •  DEVELOPMENT  •  BRANDING  •",
  "aria-label": "Illustration, development, branding",
  size: 220,
  radius: 86,
  expandedRadius: 104,
  center: <span className="text-xs font-medium tracking-wide">WORK</span>,
} as const;

export default function CircularTextPage() {
  return (
    <section className="px-4 pb-16 sm:px-6 sm:pt-24 sm:pb-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">Workbench experiment</p>
          <h1 className="mt-2 text-2xl font-semibold text-balance sm:text-3xl">
            Circular text badge
          </h1>
          <p className="text-muted-foreground mt-3 text-sm text-pretty sm:text-base">
            Hover or focus the badge to expand the ring.
          </p>
        </div>

        <div className="grid w-full gap-8 sm:grid-cols-2">
          <div className="bg-background border-border/70 flex flex-col items-center gap-4 rounded-md border p-10">
            <p className="text-muted-foreground text-sm font-medium">
              Primary variant
            </p>
            <CircularTextBadge variant="primary" {...badgeProps} />
          </div>

          <div className="bg-primary-surface flex flex-col items-center gap-4 rounded-md p-10">
            <p className="text-primary-foreground/80 text-sm font-medium">
              Default variant
            </p>
            <CircularTextBadge variant="default" {...badgeProps} />
          </div>
        </div>
      </div>
    </section>
  );
}
