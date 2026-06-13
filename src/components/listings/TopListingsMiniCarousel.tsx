"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Listing } from "@/types/listing";
import { CarouselItem, SimpleCarousel } from "../ui/SimpleCarrousel";
import { Flame, Star } from "lucide-react";
import { ListingCard } from "./ListingCard";
import { Button } from "../ui";

type TopListingsMiniCarouselProps = {
  locale: string;
  items: Listing[];
  title: string;
};

export function TopListingsMiniCarousel({
  locale,
  items,
  title,
}: TopListingsMiniCarouselProps) {
  return (
    <SimpleCarousel
      title={
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
            <Flame className="size-4" />
          </span>

          <h2 className="text-base font-semibold tracking-tight text-zinc-950 dark:text-white">
            {title}
          </h2>
        </div>
      }
      className=" my-4"
    >
      {items.map((l) => (
       <CarouselItem key={l.id} className="w-60 sm:w-75 lg:w-45 ">
          <ListingCard
            locale={locale}
            listing={l}
            variant="plain"
            className="bg-transparent!"
            showCharacteristics={false}
            badge = {
              <div 
              className="bg-white/80 dark:bg-zinc-900/80 text-xs backdrop-blur flex gap-1 items-center justify-center  py-2 px-2.5 shadow-sm w-auto rounded-2xl">
                <Star className="size-4" /> Maison spécial
              </div>
            }
          />
        </CarouselItem>
      ))}
    </SimpleCarousel>
  );
}
