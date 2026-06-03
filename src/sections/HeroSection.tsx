import { SearchBar } from "@/components/SearchBar";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { getTranslations } from "next-intl/server";
import { africaListings } from "@/lib/mock/africa-listings";
import { getLocale } from "next-intl/server";
import { TopSearchCarousel } from "@/components/listings/TopSearchCarousel";
import Image from "next/image";

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
        {/* Main headline section */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="max-w-3xl">
              <Badge>{t("badge")}</Badge>
              <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-black sm:text-5xl lg:text-6xl">
                {t("title")}
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-zinc-600 sm:block sm:text-lg">
                {t("subtitle")}
              </p>
              <p className="mt-6 text-xs text-zinc-500">{t("note")}</p>
            </div>

            {/* Horizontal Search Bar */}
            <div className="mt-10">
              <SearchBar variant="auto" />
            </div>
          </div>

          {/* Visual à droite (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <HeroVisual />
          </div>
        </div>

        {/* Ligne 2 : carousel */}
        <div className="mt-10">
          {/* Section indépendante pour que le scroll horizontal ne perturbe pas le reste */}
          <div className="mt-6 overflow-hidden" style={{ contain: "layout paint" }}>
            <TopSearchCarousel locale={locale} items={africaListings.slice(0, 6)} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative">
      {/* “Mesh” arrière-plan */}
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_25%_25%,rgba(0,0,0,0.08),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(0,0,0,0.06),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(0,0,0,0.07),transparent_42%)]" />

      <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-sm shadow-black/10">
        <div className="relative aspect-[4/5]">
          <Image
            src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=2000&q=80"
            alt="Maison d’hôtes de luxe"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 0px, 40vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
        </div>

        {/* Cartes flottantes */}
        <div className="pointer-events-none absolute left-5 top-5 grid gap-3">
          <div className="inline-flex w-fit items-center gap-2 rounded-2xl bg-white/85 px-4 py-2 text-xs font-semibold text-black backdrop-blur">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            Séjours vérifiés
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-2xl bg-white/85 px-4 py-2 text-xs font-semibold text-black backdrop-blur">
            <Star className="h-4 w-4" />
            4,9 • 1 200+ avis
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-5 left-5 right-5 rounded-3xl border border-white/20 bg-black/35 p-5 text-white backdrop-blur">
          <p className="text-sm font-semibold">Guest house sélectionnée</p>
          <p className="mt-1 text-xs text-white/80">Design, propreté, accueil — standards premium</p>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">À partir de</p>
            <p className="text-lg font-semibold">55€ / nuit</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.7 1.2 6.6L12 17.9 6.1 20.8l1.2-6.6-4.8-4.7 6.6-.9L12 2.5Z" />
    </svg>
  );
}
