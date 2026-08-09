import { ImageResponse } from "next/og";

import { BrandLogoMark } from "@/components/layout/brand-logo-mark";
import { LOGO_COLORS } from "@/components/layout/logo-paths";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  const logoWidth = 120;
  const logoHeight = Math.round((logoWidth * 111) / 115);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: LOGO_COLORS.background,
      }}
    >
      <BrandLogoMark width={logoWidth} height={logoHeight} />
    </div>,
    { ...size },
  );
}
