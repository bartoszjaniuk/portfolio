/**
 * Thin root layout required by Next.js App Router.
 * `<html lang>` / fonts / ThemeProvider live in `app/[locale]/layout.tsx`
 * so `lang` tracks the active locale (see Next.js i18n guide).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
