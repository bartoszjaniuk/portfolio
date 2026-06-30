import { terminalArt, terminalMeta } from "../utils/intro-content";

export const TerminalPreview = () => (
  <div className="animate-scale-in stagger-4 relative">
    <div className="border-border bg-card/60 glass hover-lift relative rounded-xl border p-5 sm:p-8">
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <div className="bg-destructive/60 hover:bg-destructive h-3 w-3 rounded-full transition-colors" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/60 transition-colors hover:bg-yellow-500" />
        <div className="bg-primary/60 hover:bg-primary h-3 w-3 rounded-full transition-colors" />
      </div>
      <div className="bg-background/50 text-muted-foreground absolute top-3.5 left-1/2 -translate-x-1/2 rounded-md px-3 py-1 font-mono text-xs">
        {terminalMeta.title}
      </div>

      <pre className="text-primary/80 mt-6 overflow-hidden font-mono text-[10px] leading-relaxed sm:text-xs md:text-sm">
        <span className="sm:hidden">{terminalArt.mobile}</span>
        <span className="hidden sm:block">{terminalArt.desktop}</span>
      </pre>
    </div>

    <div className="border-primary/40 bg-primary/15 glass text-primary animate-float absolute -top-2 -right-2 rounded-lg border px-3 py-1.5 font-mono text-[11px] sm:-top-6 sm:-right-6 sm:px-4 sm:text-xs">
      <span className="flex items-center gap-2">
        <span className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full" />
        {terminalMeta.version}
      </span>
    </div>
    <div
      className="border-border bg-card glass text-muted-foreground animate-float absolute -bottom-3 -left-2 rounded-lg border px-3 py-1.5 font-mono text-[11px] sm:-bottom-6 sm:-left-6 sm:px-4 sm:text-xs"
      style={{ animationDelay: "1s" }}
    >
      {terminalMeta.date}
    </div>

    <div className="bg-primary/5 absolute top-1/2 left-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
  </div>
);
