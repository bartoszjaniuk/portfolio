import {
  generatePersonStructuredData,
  generateWebsiteStructuredData,
} from "@/lib/structured-data";
import { CursorGlow } from "@/components/features/CursorGlow";
import Header from "@/components/layout/Header";
import { Introduction } from "@/features/Homepage/Introduction";

export default function Home() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://bartoszjaniuk.pl";
  const websiteStructuredData = generateWebsiteStructuredData(baseUrl);
  const personStructuredData = generatePersonStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personStructuredData),
        }}
      />
      <main className="scanlines relative min-h-screen overflow-hidden">
        <CursorGlow />
        <div className="relative z-10">
          <Header />
          <Introduction />
          {/* <HeroSection />
					<ProjectsGrid />
					<LabNotes />
					<Workbench />
					<Footer /> */}
        </div>
      </main>
    </>
  );
}
