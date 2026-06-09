"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Listing } from "@/types/listing";
import { useCurrency } from "@/components/currency/CurrencyProvider";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { Building2, CalendarDays, Car, Leaf } from "lucide-react";

export function ListingCard({
  locale,
  listing,
  variant = "plain",
  className,
  linkable = true,
  badge,
}: {
  locale?: string;
  listing: Listing;
  variant?: "plain" | "outlined";
  className?: string;
  linkable?: boolean;
  badge?: string;
}) {
  const { formatFrom } = useCurrency();
  const [imgLoaded, setImgLoaded] = useState(false);
  const normalizedLocale = locale ?? "fr";
  const content = (
    <Card
        className={cn(
          "group border-0 bg-white !shadow-none dark:bg-black",
          variant === "outlined"
            ? "rounded-2xl border border-black/10 !shadow-none dark:border-zinc-800"
            : "rounded-2xl hover:!shadow-none",
        )}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-zinc-100 dark:bg-zinc-900">
          {!imgLoaded ? <ImageLoader /> : null}
          <Image
            src={listing.imageUrl}
            alt={listing.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            quality={75}
            onLoadingComplete={() => setImgLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0 opacity-80" />

          {badge ? (
            <div className="absolute left-3 top-3 rounded-full bg-black/80 px-2 py-1 text-[11px] font-semibold text-white">
              {badge}
            </div>
          ) : null}

          {/* Favoris (sur chaque card) */}
          <div
            className="absolute right-3 top-3 z-10"
            onClick={(e) => {
              // Empêche la navigation du Link quand on clique sur le cœur
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <FavoriteButton listingId={listing.id} locale={normalizedLocale} className="h-10 w-10 rounded-2xl" />
          </div>
        </div>
        {listing.propertyType ? (
          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {listing.propertyType}
          </p>
        ) : null}
        {/* Info: sans padding (demandé), uniquement spacing vertical */}
        <div className="mt-3">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3
                className="truncate text-base font-semibold tracking-tight text-black dark:text-white"
                title={listing.title}
              >
                {listing.title}
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
              <StarIcon className="h-4 w-4 text-black dark:text-white" />
              <span className="font-semibold text-black dark:text-white">{listing.rating.toFixed(1)}</span>
              <span className="text-zinc-500 dark:text-zinc-400">({listing.reviewCount})</span>
            </div>
          </div>

          {/* Localisation + prix (style Airbnb) */}
          <div className="mt-1 flex items-start justify-between gap-3">
            <p className="min-w-0 truncate text-sm text-zinc-600 dark:text-zinc-400" title={listing.location}>
              {listing.location}
            </p>
            <p className="shrink-0 whitespace-nowrap text-[15px] font-semibold text-black dark:text-white">
              {formatFrom(listing.pricePerNight, listing.currency)}
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {getFeatureBadges(listing).map((feature) => {
              const Icon = feature.icon;
              return (
                <span
                  key={feature.label}
                  className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {feature.label}
                </span>
              );
            })}
          </div>
        </div>
      </Card>
  );

  if (!linkable) {
    return <div className={cn("block mb-6", className)}>{content}</div>;
  }

  return (
    <Link href={`/${normalizedLocale}/listings/${listing.id}`} className={cn("block mb-6", className)}>
      {content}
    </Link>
  );
}

function getFeatureBadges(listing: Listing) {
  const text = `${listing.title} ${listing.location} ${listing.propertyType ?? ""}`.toLowerCase();
  const type = listing.propertyType ?? (text.includes("villa") ? "Villa" : text.includes("studio") ? "Studio" : "Appartement");
  const hasGarden = /jardin|eco|lodge|bungalow|nature|villa/.test(text);
  const hasParking = listing.pricePerNight >= 55 || /villa|premium|design/.test(text);
  const openDays = listing.pricePerNight > 90 ? "7j/7" : "5j+";

  return [
    { label: type, icon: Building2 },
    ...(hasGarden ? [{ label: "Jardin", icon: Leaf }] : []),
    ...(hasParking ? [{ label: "Parking", icon: Car }] : []),
    { label: openDays, icon: CalendarDays },
  ].slice(0, 4);
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2.5l2.9 6.1 6.6.9-4.8 4.7 1.2 6.6L12 17.9 6.1 20.8l1.2-6.6-4.8-4.7 6.6-.9L12 2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ImageLoader() {
  return (
    <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,#f4f4f5,45%,#e4e4e7,55%,#f4f4f5)] bg-[length:200%_100%] dark:bg-[linear-gradient(110deg,#18181b,45%,#27272a,55%,#18181b)]" />
  );
}
