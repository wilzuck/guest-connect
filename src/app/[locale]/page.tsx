import {
  BecomeHostSection,
  CalendarToolsSection,
  DestinationsSection,
  FeaturesSection,
  HeroSection,
  HomeListingsExplorer,
  HowItWorksSection,
  SocialProofSection,
  TestimonialsSection,
} from "@/sections";
import { africaListings } from "@/lib/mock/africa-listings";
import { getListings } from "@/lib/api/listings";
import type { HomeListing } from "@/sections/HomeListingsExplorer";

export default async function Home() {
  // Données enrichies (interests, city) pour le filtrage par catégorie côté client.
  let listings: HomeListing[] = africaListings;

  try {
    const data = await getListings();
    if (Array.isArray(data) && data.length > 0) {
      // L'API peut ne pas fournir "interests" : on conserve africaListings comme base
      // si les données distantes n'ont pas la métadonnée nécessaire au filtrage.
      const hasInterests = data.some((l) => Array.isArray((l as HomeListing).interests));
      if (hasInterests) listings = data as HomeListing[];
    }
  } catch {
    // fallback: données mock enrichies
  }

  return (
    <>
      <HeroSection />
      <SocialProofSection />
      {/* Logements filtrables par catégorie */}
      <HomeListingsExplorer listings={listings} />
      <DestinationsSection />
      <HowItWorksSection />
      <CalendarToolsSection />
      <FeaturesSection />
      <BecomeHostSection />
      <TestimonialsSection />
    </>
  );
}
