import { ImageResponse } from "next/og";

import { BrandLogoMark } from "@/components/layout/brand-logo-mark";
import { LOGO_COLORS } from "@/components/layout/logo-paths";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getServiceBySlug } from "@/lib/sanity/fetchers/get-services";

export const alt = "Bartosz Janiuk — Service";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const FALLBACK_TITLE: Record<Locale, string> = {
  en: "Services",
  pl: "Usługi",
};

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug: rawSlug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const slug = rawSlug?.trim() ?? "";

  const service = slug ? await getServiceBySlug(locale, slug) : null;
  const title =
    service?.seoTitle?.trim() ||
    service?.title?.trim() ||
    FALLBACK_TITLE[locale];

  const logoWidth = 96;
  const logoHeight = Math.round((logoWidth * 111) / 115);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: LOGO_COLORS.background,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <BrandLogoMark
          width={logoWidth}
          height={logoHeight}
          maskId="service-og-cutout"
        />
        <div
          style={{
            display: "flex",
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: LOGO_COLORS.letterB,
          }}
        >
          Bartosz Janiuk
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          maxWidth: 1000,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: title.length > 48 ? 56 : 68,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            color: LOGO_COLORS.code,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 500,
            color: LOGO_COLORS.letterB,
          }}
        >
          {locale === "pl" ? "Freelancer · Polska" : "Freelance · Poland"}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
