import type { Metadata } from "next";

import { CursorGlow } from "@/components/features/CursorGlow";
import { ShaderBackground } from "@/components/features/ShaderBackground";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Workbench | Bartosz Janiuk",
  description: "Animation workbench for landing page experiments.",
};

export default function WorkbenchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="scanlines bg-background relative min-h-screen">
      <ShaderBackground />
      <CursorGlow />
      <div className="relative z-10">
        <Header />
        {children}
      </div>
    </main>
  );
}
