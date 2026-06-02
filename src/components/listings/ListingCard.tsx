"use client";

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { Listing } from "@/types/listing";
import { useTranslations } from "next-intl";

function formatPrice(price: number, currency: string) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `${price} ${currency}`;
  }
}

export function ListingCard({ locale, listing }: { locale: string; listing: Listing }) {
  const t = useTranslations("listingCard");
  return (
    <Link href={`/${locale}/listings/${listing.id}`} className="block">
      <Card className="group overflow-hidden transition">
        <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
          <Image
            src={listing.imageUrl}
            alt={listing.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold tracking-tight text-black">
                {listing.title}
              </h3>
              <p className="mt-1 truncate text-sm text-zinc-600">{listing.location}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-black">
                {formatPrice(listing.pricePerNight, listing.currency)}
              </p>
              <p className="text-xs text-zinc-500">{t("perNight")}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-zinc-700">
            <StarIcon className="h-4 w-4 text-black" />
            <span className="font-medium text-black">{listing.rating.toFixed(2)}</span>
            <span className="text-zinc-500">({listing.reviewCount})</span>
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
