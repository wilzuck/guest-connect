"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Listing } from "@/types/listing";
import { SimpleCarousel } from "../ui/SimpleCarrousel";

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
        <h2 className="text-md font-semibold">{title}</h2>
    }>
      {items.map((l) => (
        <Card
          key={l.id}
          className="group min-w-50 overflow-hidden border-0 bg-white shadow-none! transition hover:-translate-y-0.5 hover:!shadow-none dark:border-white/10 dark:bg-zinc-950 sm:min-w-[240px]"
          style={{ scrollSnapAlign: "start" }}
        >
          <Link href={`/${locale}/listings/${l.id}`} className="block">
            <div className="relative h-25 rounded-xl w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
              <Image
                src={l.imageUrl}
                alt={l.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="240px"
              />
            </div>
            <div className="py-2">
              <p title={l.title} className="truncate text-ellipsis whitespace-nowrap text-sm font-semibold  dark:text-white">
                {l.title}
              </p>
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm text-zinc-600 dark:text-zinc-400">
                  {l.location}
                </p>
                <div className="flex items-center">
                  <span className="text-sm font-bold text-black dark:text-white">
                    {l.pricePerNight} {String(l.currency ?? "")}
                  </span>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    /nuit
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </Card>
      ))}
    </SimpleCarousel>
  );
}
