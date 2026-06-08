import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ListingCard } from "@/components/listings/ListingCard";
import { ListingGrid } from "@/components/listings/ListingGrid";
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
        <div className="text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{t("eyebrow")}</p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-black sm:text-4xl">
              {t("title")}
            </h2>
            <div className="flex justify-center sm:justify-end">
              <ButtonLink href={`/${locale}/stays`} variant="outline" size="md">
                {t("viewAll")}
              </ButtonLink>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
            {t("description")}
          </p>
        </div>

        <ListingGrid className="mt-10">
          {listings.map((l) => (
            <div key={l.id} className="min-w-0">
              <ListingCard locale={locale} listing={l} variant="plain" />
            </div>
          ))}
        </ListingGrid>
      </Container>
    </section>
  );
}
