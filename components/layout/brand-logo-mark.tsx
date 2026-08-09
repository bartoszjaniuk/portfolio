import {
  LOGO_CODE_BRACKETS_PATH,
  LOGO_COLORS,
  LOGO_CUTOUT,
  LOGO_LETTER_B_PATH,
  LOGO_VIEWBOX,
} from "@/components/layout/logo-paths";

type BrandLogoMarkProps = {
  width: number;
  height: number;
  maskId?: string;
};

/** SVG mark for ImageResponse generators (OG / Twitter / Apple). */
export function BrandLogoMark({
  width,
  height,
  maskId = "logo-cutout",
}: BrandLogoMarkProps) {
  return (
    <svg width={width} height={height} viewBox={LOGO_VIEWBOX} fill="none">
      <defs>
        <mask id={maskId}>
          <rect width="115" height="111" fill="white" />
          <rect
            x={LOGO_CUTOUT.x}
            y={LOGO_CUTOUT.y}
            width={LOGO_CUTOUT.width}
            height={LOGO_CUTOUT.height}
            fill="black"
          />
        </mask>
      </defs>
      <path
        d={LOGO_LETTER_B_PATH}
        fill={LOGO_COLORS.letterB}
        mask={`url(#${maskId})`}
      />
      <path
        d={LOGO_CODE_BRACKETS_PATH}
        fill={LOGO_COLORS.code}
        stroke={LOGO_COLORS.code}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
        paintOrder="stroke fill"
      />
    </svg>
  );
}
