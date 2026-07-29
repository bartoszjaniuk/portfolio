import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { notFound } from "next/navigation";

import { LocaleBanner } from "@/components/i18n/LocaleBanner";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { locales, resolveLocaleParam } from "@/lib/i18n/config";

import "../globals.css";
import { Footer } from "@/components/layout/Footer/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Bartosz Janiuk",
  description:
    "Digital workshop where idea meets product. Mobile and web applications for your business.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
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

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${bebasNeue.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          storageKey="theme-mode"
        >
          <LocaleBanner locale={locale} />
          {children}
          <Footer locale={locale} />
        </ThemeProvider>
      </body>
    </html>
  );
}
