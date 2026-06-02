import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ListingCard } from "@/components/listings/ListingCard";
import type { Listing } from "@/types/listing";

type ListingsPreviewSectionProps = {
  listings: Listing[];
};

export async function ListingsPreviewSection({ listings }: ListingsPreviewSectionProps) {
  const locale = await getLocale();
  const t = await getTranslations("homeListings");
  return (
    <section id="listings" className="bg-white">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
          <ButtonLink href={`/${locale}/explore`} variant="outline" size="md" className="w-fit">
            {t("viewAll")}
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => (
            <ListingCard key={l.id} locale={locale} listing={l} />
          ))}
        </div>
      </Container>
    </section>
  );
}
