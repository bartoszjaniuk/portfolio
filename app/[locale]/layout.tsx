import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";

import { Footer } from "@/components/layout/Footer/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { locales, resolveLocaleParam } from "@/lib/i18n/config";
import { siteBaseUrl } from "@/lib/site-url";

import "../globals.css";

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

const siteDescription =
  "Digital workshop where idea meets product. Mobile and web applications for your business.";

export const metadata: Metadata = {
  metadataBase: new URL(siteBaseUrl()),
  title: {
    default: "Bartosz Janiuk",
    template: "%s | Bartosz Janiuk",
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Bartosz Janiuk",
    title: "Bartosz Janiuk",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Bartosz Janiuk",
    description: siteDescription,
  },
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
          {children}
          <Footer locale={locale} />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
