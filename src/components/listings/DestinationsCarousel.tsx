"use client";

import { useTranslations } from "next-intl";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { Carousel } from "@/components/ui/Carousel";
import { CarouselItem, SimpleCarousel } from "@/components/ui/SimpleCarrousel";
import { ReactNode } from "react";

export type CarouselDestination = {
  city: string;
  country: string;
  imageUrl: string;
};

type DestinationsCarouselProps = {
  locale: string;
  destinations: CarouselDestination[];
  header?: ReactNode;
};

export function DestinationsCarousel({ locale, destinations, header }: DestinationsCarouselProps) {
  const t = useTranslations("homeDestinations");

  return (
    <SimpleCarousel 
    title={header}
    className="mt-10">
      {destinations.map((d) => (
        <CarouselItem key={d.city} className="min-w-70 sm:min-w-62.5">
          <DestinationCard
            locale={locale}
            city={d.city}
            country={d.country}
            imageUrl={d.imageUrl}
            exploreLabel={t("exploreCity", { city: d.city })}
          />
        </CarouselItem>
      ))}
    </SimpleCarousel>
  );
}