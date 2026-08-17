"use client";

import { useIdleOrInteractionGate } from "@/hooks/useIdleOrInteractionGate";
import dynamic from "next/dynamic";
import { ShaderFallback } from "./ShaderFallback";

const ShaderCanvas = dynamic(
  () => import("./ShaderCanvas").then((m) => m.ShaderCanvas),
  { ssr: false },
);

type ShaderBackgroundProps = {
  variant?: "fixed" | "contained";
};

export const ShaderBackground = ({
  variant = "fixed",
}: ShaderBackgroundProps) => {
  const shouldLoadShader = useIdleOrInteractionGate();

  return (
    <>
      <ShaderFallback variant={variant} />
      {shouldLoadShader ? <ShaderCanvas variant={variant} /> : null}
    </>
  );
};
