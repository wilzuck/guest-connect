import {
  BecomeHostSection,
  FeaturesSection,
  HeroSection,
  HowItWorksSection,
  ListingsPreviewSection,
  PricingSection,
  SocialProofSection,
  TestimonialsSection,
} from "@/sections";
import { listingPreviewMock } from "@/lib/mock/landing";
import { getListings } from "@/lib/api/listings";
import type { Listing } from "@/types/listing";

export default async function Home() {
  let listings: Listing[] = listingPreviewMock;

  try {
    const data = await getListings();
    if (Array.isArray(data) && data.length > 0) listings = data.slice(0, 6);
  } catch {
    // fallback: mock data
  }

  return (
    <>
      <HeroSection />
      <SocialProofSection />
      <FeaturesSection />
      <ListingsPreviewSection listings={listings} />
      <HowItWorksSection />
      <BecomeHostSection />
      <TestimonialsSection />
      <PricingSection />
    </>
  );
}

