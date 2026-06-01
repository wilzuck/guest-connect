import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ListingsCarousel } from "@/components/listings/ListingsCarousel";
import { interestSections, listingsByInterest } from "@/lib/mock/africa-listings";
import { SearchBar } from "@/components/SearchBar";

export const metadata: Metadata = {
  title: "Explorer — GuestConnect",
  description: "Explorez des hébergements par centres d’intérêt.",
};

export default async function Page() {
  const locale = await getLocale();

  return (
    <div className="bg-white">
      <section className="border-b border-black/5 bg-white">
        <Container className="py-10 sm:py-14">
          <SectionHeading
            eyebrow={locale === "en" ? "Explore" : "Explorer"}
            title={
              locale === "en"
                ? "Stays by points of interest"
                : "Hébergements par centres d’intérêt"
            }
            description={
              locale === "en"
                ? "Inspired by Booking/Airbnb: editorial sections, carousels and premium cards."
                : "Inspiré de Booking/Airbnb : sections éditoriales, carrousels, et cartes premium."
            }
          />
          <div className="mt-8">
            <SearchBar />
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-14">
          <div className="grid gap-12">
            {interestSections.map((s) => (
              <ListingsCarousel
                key={s.title}
                title={s.title}
                description={s.description}
                locale={locale}
                items={listingsByInterest(s.interest)}
                viewAllHref={`/${locale}/search`}
              />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
