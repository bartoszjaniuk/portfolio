import {
  generatePersonStructuredData,
  generateWebsiteStructuredData,
} from "@/lib/structured-data";
import Header from "@/components/layout/Header";
import { Introduction } from "@/features/Homepage/Introduction";
import { TechStackSection } from "@/features/Homepage/TechStackSection";
import { AboutMeSection } from "@/features/Homepage/AboutMeSection";
import { ListedProjectsSection } from "@/features/Homepage/ListedProjectsSection";
import { GotIdeaSection } from "@/features/Homepage/GotIdeaSection";
import { ExperienceSection } from "@/features/Homepage/ExperienceSection";

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
      <main className="scanlines relative min-h-screen">
        <div className="relative z-10">
          <Header />
          <Introduction />
          <AboutMeSection />
          <ListedProjectsSection />
          <ExperienceSection />
          <TechStackSection />
          <GotIdeaSection />
        </div>
      </main>
    </>
  );
}
