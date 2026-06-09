import { SearchBar } from "@/components/SearchBar";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { getTranslations } from "next-intl/server";
import { africaListings } from "@/lib/mock/africa-listings";
import { getLocale } from "next-intl/server";
import { TopSearchCarousel } from "@/components/listings/TopSearchCarousel";

export async function HeroSection() {
  const t = await getTranslations("hero");
  const locale = await getLocale();
  return (
    <section id="top" className="relative overflow-hidden">
      {/*
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute left-1/2 top-[-160px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-fuchsia-500/20 via-pink-500/10 to-transparent blur-3xl animate-blob" />
      </div>
      */}

      <Container className="py-14 sm:py-20">
        {/* Main headline section */}
        <div className="grid gap-8">
          <div className="w-full">
            <Badge>{t("badge")}</Badge>
            <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-5 w-full text-pretty text-base leading-7 text-zinc-600 sm:block sm:text-lg">
              {t("subtitle")}
            </p>
            <p className="mt-6 text-xs text-zinc-500">{t("note")}</p>
          </div>

          {/* Search Bar pleine largeur */}
          <div className="mt-2 w-full">
            <SearchBar variant="auto" />
          </div>
        </div>

        {/* Ligne 2 : carousel */}
        <div className="mt-10">
          {/* Section indépendante pour que le scroll horizontal ne perturbe pas le reste */}
          <div className="mt-6 overflow-hidden" style={{ contain: "layout paint" }}>
            <TopSearchCarousel locale={locale} items={africaListings.slice(0, 4)} />
          </div>
        </div>
      </Container>
    </section>
  );
}

