import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CursorGlow } from "@/components/features/CursorGlow";
import { ShaderBackground } from "@/components/features/ShaderBackground";
import { Header } from "@/components/layout/Header/Header";
import { resolveLocaleParam } from "@/lib/i18n/config";
import { getSiteSettings } from "@/lib/sanity/fetchers/get-site-settings";

export const metadata: Metadata = {
  title: "Workbench | Bartosz Janiuk",
  description: "Animation workbench for landing page experiments.",
};

/**
 * Fetches siteSettings for Header props using the active locale.
 * Missing siteSettings → notFound() (same policy as homepage).
 */
export default async function WorkbenchLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const locale = await resolveLocaleParam(params);
  if (!locale) {
    notFound();
  }

  const siteSettings = await getSiteSettings(locale);

  if (!siteSettings) {
    notFound();
  }

  return (
    <main className="scanlines bg-background relative min-h-screen">
      <ShaderBackground />
      <CursorGlow />
      <div className="relative z-10">
        <Header
          locale={locale}
          brandName={siteSettings.brandName}
          navItems={siteSettings.navItems}
          socialLinks={siteSettings.socialLinks}
          statusLabel={siteSettings.statusLabel}
        />
        {children}
      </div>
    </main>
  );
}
