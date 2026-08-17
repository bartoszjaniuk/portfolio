"use client";

import { useIdleOrInteractionGate } from "@/hooks/useIdleOrInteractionGate";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import dynamic from "next/dynamic";
import { ShaderFallback } from "./ShaderFallback";

const ShaderCanvas = dynamic(
  () => import("./ShaderCanvas").then((m) => m.ShaderCanvas),
  { ssr: false },
);

const MOBILE_SHADER_QUERY = "(max-width: 767px), (pointer: coarse)";

type ShaderBackgroundProps = {
  variant?: "fixed" | "contained";
};

export const ShaderBackground = ({
  variant = "fixed",
}: ShaderBackgroundProps) => {
  const isCoarseOrNarrow = useMediaQuery(MOBILE_SHADER_QUERY);
  const shouldLoadShader = useIdleOrInteractionGate();

  return (
    <>
      <ShaderFallback variant={variant} />
      {shouldLoadShader && !isCoarseOrNarrow ? (
        <ShaderCanvas variant={variant} />
      ) : null}
    </>
  );
};
