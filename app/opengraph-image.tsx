import { ImageResponse } from "next/og";

import { BrandLogoMark } from "@/components/layout/brand-logo-mark";
import { LOGO_COLORS } from "@/components/layout/logo-paths";

export const alt = "Bartosz Janiuk";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  const logoWidth = 280;
  const logoHeight = Math.round((logoWidth * 111) / 115);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 36,
        background: LOGO_COLORS.background,
      }}
    >
      <BrandLogoMark width={logoWidth} height={logoHeight} />
      <div
        style={{
          display: "flex",
          fontSize: 48,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: LOGO_COLORS.letterB,
        }}
      >
        Bartosz Janiuk
      </div>
    </div>,
    { ...size },
  );
}
