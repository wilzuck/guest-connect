"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { useTranslations } from "next-intl";
import { Building2, CalendarDays, Car, Leaf } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { Listing } from "@/types/listing";
import { useCurrency } from "@/components/currency/CurrencyProvider";
import { cn } from "@/lib/utils/cn";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";

type ListingCardProps = {
  locale?: string;
  listing: Listing;
  variant?: "plain" | "outlined";
  className?: string;
  linkable?: boolean;
  badge?: ReactNode;
  showCharacteristics?: boolean;
  imageClassName?: string;
};

export function ListingCard({
  locale,
  listing,
  variant = "plain",
  className,
  linkable = true,
  badge,
  showCharacteristics = true,
  imageClassName,
}: ListingCardProps) {
  const t = useTranslations("bookingCard");
  const { formatFrom } = useCurrency();
  const [imgLoaded, setImgLoaded] = useState(false);

  const normalizedLocale = locale ?? "fr";

  const content = (
    <Card
      className={cn(
        "group h-full border-0 bg-transparent shadow-none! dark:bg-transparent dark:text-white",
        variant === "outlined"
          ? "rounded-2xl border border-black/10 dark:border-white/10"
          : "rounded-2xl",
      )}
    >
      <div
        className={cn(
          "relative aspect-16/10 w-full overflow-hidden rounded-[18px] bg-zinc-100 dark:bg-zinc-900",
          imageClassName,
        )}
      >
        {!imgLoaded ? <ImageLoader /> : null}

        <Image
          src={listing.imageUrl}
          alt={listing.title}
          fill
          className={cn(
            "object-cover transition duration-700 group-hover:scale-[1.04]",
            imgLoaded ? "opacity-100" : "opacity-0",
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          quality={75}
          onLoad={() => setImgLoaded(true)}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-black/0 to-black/0 opacity-80" />

        {badge ? (
          <div className="absolute  left-3 top-3 z-10">
            {badge}
          </div>
        ) : null}

        <div
          className="absolute right-3 top-3 z-10"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <FavoriteButton
            listingId={listing.id}
            locale={normalizedLocale}
            className="aspect-square text-white p-0 h-8 w-8"
          />
        </div>
      </div>

      {listing.propertyType ? (
        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-white/70">
          {listing.propertyType}
        </p>
      ) : null}

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

          <div className="inline-flex shrink-0 items-center gap-1.5 text-sm text-zinc-700 dark:text-white">
            <StarIcon className="h-4 w-4 text-emerald-700 dark:text-emerald-300" />

            <span className="font-semibold text-black dark:text-white">
              {listing.rating.toFixed(1)}
            </span>

            <span className="text-zinc-500 dark:text-white/70">
              ({listing.reviewCount})
            </span>
          </div>
        </div>

        <div className="mt-1 flex items-start justify-between gap-3">
          <p
            className="min-w-0 truncate text-sm text-zinc-600 dark:text-white/75"
            title={listing.location}
          >
            {listing.location}
          </p>

          <p className="shrink-0 whitespace-nowrap text-[15px] font-semibold text-black dark:text-white">
            {formatFrom(listing.pricePerNight, listing.currency)}
            <span className="text-sm font-medium text-zinc-500 dark:text-white/60">
              /{t("night")}
            </span>
          </p>
        </div>

        {showCharacteristics ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {getFeatureBadges(listing).map((feature) => {
              const Icon = feature.icon;

              return (
                <span
                  key={feature.label}
                  className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-700 dark:bg-white/10 dark:text-white"
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {feature.label}
                </span>
              );
            })}
          </div>
        ) : null}
      </div>
    </Card>
  );

  if (!linkable) {
    return <div className={cn("block h-full", className)}>{content}</div>;
  }

  return (
    <Link
      href={`/${normalizedLocale}/listings/${listing.id}`}
      className={cn("block h-full", className)}
    >
      {content}
    </Link>
  );
}

function getFeatureBadges(listing: Listing) {
  const text = `${listing.title} ${listing.location} ${
    listing.propertyType ?? ""
  }`.toLowerCase();

  const type =
    listing.propertyType ??
    (text.includes("villa")
      ? "Villa"
      : text.includes("studio")
        ? "Studio"
        : "Appartement");

  const hasGarden = /jardin|eco|lodge|bungalow|nature|villa/.test(text);
  const hasParking =
    listing.pricePerNight >= 55 || /villa|premium|design/.test(text);

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
  return <div className="gc-skeleton absolute inset-0 bg-zinc-100 dark:bg-zinc-900" />;
}