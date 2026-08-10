import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";

import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { NotFoundView } from "@/features/NotFound/NotFoundView";
import { defaultLocale } from "@/lib/i18n/config";
import { getNotFoundMetadata } from "@/lib/sanity/fetchers/get-not-found-metadata";
import { getNotFoundPage } from "@/lib/sanity/fetchers/get-not-found-page";

import "./globals.css";

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

export async function generateMetadata(): Promise<Metadata> {
  return getNotFoundMetadata(defaultLocale);
}

/**
 * Root fallback when `[locale]/layout` cannot wrap (e.g. invalid locale → notFound()).
 * Self-contained html/body because the root layout is a passthrough.
 */
export default async function RootNotFound() {
  const locale = defaultLocale;
  const data = await getNotFoundPage(locale);

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
          <NotFoundView locale={locale} data={data} />
        </ThemeProvider>
      </body>
    </html>
  );
}
