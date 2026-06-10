import { SearchBar } from "@/components/SearchBar";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { getLocale, getTranslations } from "next-intl/server";
import { TopSearchCarousel } from "@/components/listings/TopSearchCarousel";
import { africaListings } from "@/lib/mock/africa-listings";
import {
  ShieldCheck,
  RefreshCcw,
  BadgeCheck,
  Star,
} from "lucide-react";
import Divider from "@/components/ui/Divider";

export async function HeroSection() {
  const t = await getTranslations("hero");
  const locale = await getLocale();

  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-80 lg:min-h-[350px]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://plus.unsplash.com/premium_photo-1733259774864-ee718f86b9b2?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y290b25vdXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Guest house"
            fill
            priority
            sizes="100vw"
            className="h-full w-full object-cover bg-center"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />
        </div>

        <Container className="relative z-10 pt-10 pb-12 lg:pt-16">
          <div className="max-w-3xl">
            <Badge className="truncate">
              <ShieldCheck className="size-4 mr-0.5" /> {t("badge")}
            </Badge>

            <h1 className="mt-6 text-balance text-4xl font-semibold leading-none text-white sm:text-4xl lg:text-5xl">
              {t("title")}
            </h1>

            <p className="my-6 max-w-2xl text-lg leading-8 text-white/85">
              {t("subtitle")}
            </p>
          </div>
        </Container>
      </div>
      <Container className="-mt-10 relative z-20">
        {/* Search */}
        <div className="rounded-xl bg-white  shadow-lg">
          <SearchBar variant="auto" />
        </div>
      </Container>
      <Container className="mt-8">
        {/* Trust indicators */}
        {/* Trust indicators */}
<div className="grid grid-cols-2 gap-4 rounded-2xl p-5 backdrop-blur-md lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
  <TrustItem
    icon={<ShieldCheck className="size-6" />}
    title="Paiement sécurisé"
    subtitle="Transactions protégées"
  />

  <Divider className="hidden lg:block" />

  <TrustItem
    icon={<RefreshCcw className="size-6" />}
    title="Annulation flexible"
    subtitle="Conditions claires"
  />

  <Divider className="hidden lg:block" />

  <TrustItem
    icon={<BadgeCheck className="size-6" />}
    title="Hôtes vérifiés"
    subtitle="Profils contrôlés"
  />

  <Divider className="hidden lg:block" />

  <TrustItem
    icon={<Star className="size-6" />}
    title="Avis 5 étoiles"
    subtitle="+1200 voyageurs"
  />
</div>
      </Container>
      {/* Carousel */}
      <Container className=" pb-10 relative z-20">
        <div className="" style={{ contain: "layout paint" }}>
          <TopSearchCarousel
            locale={locale}
            items={africaListings.slice(0, 4)}
          />
        </div>
      </Container>
    </section>
  );
}

function TrustItem({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex min-w-0 my-2 md:mt-0 items-start lg:justify-center justify-start gap-3">
      <div className="mt-1 shrink-0">{icon}</div>

      <div className="min-w-0">
        <p className="text-sm font-medium leading-tight">{title}</p>
        <p className="mt-1 text-xs leading-tight text-black/70">{subtitle}</p>
      </div>
    </div>
  );
}
