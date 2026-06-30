export const ScrollHint = () => (
  <div className="animate-fade-in stagger-6 absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
    <span className="text-muted-foreground font-mono text-xs">scroll</span>
    <div className="from-primary/50 h-12 w-px animate-pulse bg-linear-to-b to-transparent" />
  </div>
);
