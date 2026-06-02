import { SearchBar } from "@/components/SearchBar";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { africaListings } from "@/lib/mock/africa-listings";
import { getLocale } from "next-intl/server";
import { TopSearchCarousel } from "@/components/listings/TopSearchCarousel";

function HeroIllustration({
  title,
  subtitle,
  liveLabel,
  alt,
}: {
  title: string;
  subtitle: string;
  liveLabel: string;
  alt: string;
}) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-black/10 bg-zinc-100 shadow-sm shadow-black/5">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2000&q=80"
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" />
      </div>

      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-black/10 bg-white/80 p-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-black">{title}</p>
            <p className="text-xs text-zinc-600">{subtitle}</p>
          </div>
          <span className="inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
            {liveLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

export async function HeroSection() {
  const t = await getTranslations("hero");
  const locale = await getLocale();
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="pointer-events-none absolute left-1/2 top-[-120px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-black/[0.06] blur-3xl" />
        <div className="pointer-events-none absolute right-[-160px] top-[220px] h-[460px] w-[460px] rounded-full bg-black/[0.05] blur-3xl" />
      </div>

      <Container className="py-14 sm:py-20">
        {/* Ligne 1 : headline + illustration */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Badge>{t("badge")}</Badge>
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-black sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
              {t("subtitle")}
            </p>
            <p className="mt-6 text-xs text-zinc-500">
              {t("note")}
            </p>
          </div>

          <div className="lg:col-span-6">
            <HeroIllustration
              title={t("illustration.title")}
              subtitle={t("illustration.subtitle")}
              liveLabel={t("illustration.live")}
              alt={t("illustration.alt")}
            />
          </div>
        </div>

        {/* Ligne 2 : recherche full width (style marketplace) */}
        <div className="mt-10">
          <SearchBar />

          {/* Section indépendante pour que le scroll horizontal ne perturbe pas le reste */}
          <div className="mt-6 overflow-hidden" style={{ contain: "layout paint" }}>
            <TopSearchCarousel locale={locale} items={africaListings.slice(0, 6)} />
          </div>
        </div>
      </Container>
    </section>
  );
}
