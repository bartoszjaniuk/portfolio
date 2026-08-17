type ShaderFallbackProps = {
  variant?: "fixed" | "contained";
};

export const ShaderFallback = ({
  variant = "fixed",
}: ShaderFallbackProps) => {
  const positionClass =
    variant === "contained" ? "absolute inset-0" : "fixed inset-0";

  return (
    <div
      className={`shader-fallback pointer-events-none z-0 ${positionClass}`}
      style={{ contain: "strict" }}
      aria-hidden
    />
  );
};
