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
      <Card className="group overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10">
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
          <Image
            src={listing.imageUrl}
            alt={listing.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0 opacity-80" />

          <div className="absolute right-3 top-3 inline-flex items-center rounded-full bg-emerald-500 px-3 py-1 text-[12px] font-semibold text-white">
            {formatPrice(listing.pricePerNight, listing.currency)}
            <span className="ml-1 font-medium text-white/85">{t("perNightShort")}</span>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold tracking-tight text-black">
                {listing.title}
              </h3>
              <p className="mt-1 truncate text-sm text-zinc-600">{listing.location}</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
              <StarIcon className="h-4 w-4 text-black" />
              <span className="font-semibold text-black">{listing.rating.toFixed(1)}</span>
              <span className="text-zinc-500">({listing.reviewCount})</span>
            </div>
          </div>

          <div className="mt-4 grid gap-2 text-sm text-zinc-700">
            <div className="flex items-center gap-2">
              <DotIcon className="h-4 w-4 text-zinc-500" />
              <span className="truncate">{t("meta.distance")}</span>
            </div>
            <div className="flex items-center gap-2">
              <DotIcon className="h-4 w-4 text-zinc-500" />
              <span className="truncate">{t("meta.cancellation")}</span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-black">{t("ctaHint")}</p>
            <span className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white transition group-hover:opacity-95">
              {t("view")}
              <ArrowIcon className="h-4 w-4" />
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

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M10 7h7v7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DotIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22s7-6.2 7-12A7 7 0 1 0 5 10c0 5.8 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}
