import {
  BecomeHostSection,
  CalendarToolsSection,
  FeaturesSection,
  HowItWorksSection,
  ListingsPreviewSection,
  SocialProofSection,
  TestimonialsSection,
} from "@/sections";
import { listingPreviewMock } from "@/lib/mock/landing";
import { getListings } from "@/lib/api/listings";
import type { Listing } from "@/types/listing";
import { Container } from "@/components/ui/Container";
import { SearchBar } from "@/components/SearchBar";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Home() {
  let listings: Listing[] = listingPreviewMock;
  const locale = await getLocale();
  const t = await getTranslations("explore");

  try {
    const data = await getListings();
    if (Array.isArray(data) && data.length > 0) listings = data.slice(0, 6);
  } catch {
    // fallback: mock data
  }

  return (
    <>
      {/* Home: zone de recherche (comme Stays) en premier */}
      <section className="border-b border-black/5 bg-white">
        <Container className="py-10 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{t("eyebrow")}</p>
              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-black sm:text-5xl">
                {t("title")}
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
                {t("description")}
              </p>
            </div>
            <div className="hidden lg:col-span-5 lg:block">
              <div className="rounded-3xl border border-black/10 bg-white p-4">
                <SearchBar variant="compact" />
              </div>
            </div>
          </div>
          <div className="mt-8 lg:hidden">
            <SearchBar variant="mobile" />
          </div>
        </Container>
      </section>

      <SocialProofSection />
      {/* Top logements recherchés */}
      <ListingsPreviewSection listings={listings} />
      <HowItWorksSection />
      <CalendarToolsSection />
      <FeaturesSection />
      <BecomeHostSection />
      <TestimonialsSection />
    </>
  );
}
