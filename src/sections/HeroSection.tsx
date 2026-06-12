import { SearchBar } from "@/components/SearchBar";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { getLocale, getTranslations } from "next-intl/server";
import { TopSearchCarousel } from "@/components/listings/TopSearchCarousel";
import { africaListings } from "@/lib/mock/africa-listings";
import { ShieldCheck, RefreshCcw, BadgeCheck, Star } from "lucide-react";
import Divider from "@/components/ui/Divider";

export async function HeroSection() {
  const t = await getTranslations("hero");
  const locale = await getLocale();

  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-60 lg:min-h-90">
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
            <Badge>
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
        <div className="flex justify-center">
          <SearchBar variant="auto" />
        </div>
      </Container>
      
      {/* Carousel */}
      <Container className=" relative">
        <div className="" style={{ contain: "layout paint" }}>
          <TopSearchCarousel
            locale={locale}
            items={africaListings.slice(0, 6)}
          />
        </div>
      </Container>
      <div className="border-y border-black/5 dark:border-white/10">
        <Container className="py-6 lg:py-8">
          {/* Trust indicators */}
          <div className="grid grid-cols-2 gap-4 rounded-2xl lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
            <div className="lg:justify-self-center">
              <TrustItem
                icon={<ShieldCheck className="size-6" />}
                title={t("trust.securePaymentTitle")}
                subtitle={t("trust.securePaymentSubtitle")}
              />
            </div>

            <Divider className="hidden lg:block" vertical />

            <div className="lg:justify-self-center">
              <TrustItem
                icon={<RefreshCcw className="size-6" />}
                title={t("trust.flexibleTitle")}
                subtitle={t("trust.flexibleSubtitle")}
              />
            </div>

            <Divider className="hidden lg:block" vertical />

            <div className="lg:justify-self-center">
              <TrustItem
                icon={<BadgeCheck className="size-6" />}
                title={t("trust.verifiedTitle")}
                subtitle={t("trust.verifiedSubtitle")}
              />
            </div>

            <Divider className="hidden lg:block" vertical />

            <div className="lg:justify-self-center">
              <TrustItem
                icon={<Star className="size-6" />}
                title={t("trust.ratingTitle")}
                subtitle={t("trust.ratingSubtitle")}
              />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
import { cn } from "@/lib/utils/cn";

type TrustItemProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  className?: string;
};

export function TrustItem({
  icon,
  title,
  subtitle,
  className,
}: TrustItemProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 items-start gap-3 rounded-2xl px-1 py-2 transition-colors",
        className,
      )}
    >
      <div className="mt-0.5 shrink-0 text-zinc-700 dark:text-zinc-300">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">
          {title}
        </p>

        <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
