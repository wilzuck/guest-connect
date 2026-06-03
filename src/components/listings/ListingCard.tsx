"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Listing } from "@/types/listing";
import { useTranslations } from "next-intl";
import { useCurrency } from "@/components/currency/CurrencyProvider";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

export function ListingCard({
  locale,
  listing,
  variant = "plain",
  className,
}: {
  locale: string;
  listing: Listing;
  variant?: "plain" | "outlined";
  className?: string;
}) {
  const t = useTranslations("listingCard");
  const { formatFrom } = useCurrency();
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <Link href={`/${locale}/listings/${listing.id}`} className={cn("block mb-6", className)}>
      <Card
        className={cn(
          "group bg-white border-0 !shadow-none",
          variant === "outlined"
            ? "rounded-2xl border border-black/10 !shadow-none"
            : "rounded-2xl hover:!shadow-none",
        )}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-zinc-100">
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
        </div>
        {/* Info: sans padding (demandé), uniquement spacing vertical */}
        <div className="mt-3">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3
                className="truncate text-base font-semibold tracking-tight text-black"
                title={listing.title}
              >
                {listing.title}
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-zinc-700">
              <StarIcon className="h-4 w-4 text-black" />
              <span className="font-semibold text-black">{listing.rating.toFixed(1)}</span>
              <span className="text-zinc-500">({listing.reviewCount})</span>
            </div>
          </div>

          {/* Localisation + prix (style Airbnb) */}
          <div className="mt-1 flex items-start justify-between gap-3">
            <p className="min-w-0 truncate text-sm text-zinc-600" title={listing.location}>
              {listing.location}
            </p>
            <p className="shrink-0 whitespace-nowrap text-[15px] font-semibold text-black">
              {formatFrom(listing.pricePerNight, listing.currency)}
            </p>
          </div>

          {/* Badge annulation (sans distance, icône moderne) */}
          <div className="mt-3 flex items-center gap-2 text-sm text-zinc-700">
            <TicketIcon className="h-4 w-4 text-zinc-500" />
            <span className="truncate" title={t("meta.cancellation")}>
              {t("meta.cancellation")}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
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

function TicketIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.5v7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

function ImageLoader() {
  return (
    <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,#f4f4f5,45%,#e4e4e7,55%,#f4f4f5)] bg-[length:200%_100%]" />
  );
}
