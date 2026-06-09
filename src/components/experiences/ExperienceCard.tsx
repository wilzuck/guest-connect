"use client";

import Image from "next/image";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { useCurrency } from "@/components/currency/CurrencyProvider";
import type { Experience } from "@/lib/mock/experiences";

export function ExperienceCard({ experience }: { experience: Experience }) {
  const { formatFrom } = useCurrency();
  const [loaded, setLoaded] = useState(false);

  return (
    <Card className="overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        {!loaded ? <ImageLoader /> : null}
        <Image
          src={experience.imageUrl}
          alt={experience.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          onLoad={() => setLoaded(true)}
        />
      </div>
      <div className="p-3">
        <p className="truncate text-sm font-semibold  dark:text-white" title={experience.title}>
          {experience.title}
        </p>
        <div className="mt-1 flex items-start justify-between gap-3">
          <p className="min-w-0 truncate text-sm text-zinc-600 dark:text-zinc-400" title={experience.location}>
            {experience.location}
          </p>
          <p className="shrink-0 whitespace-nowrap text-[15px] font-semibold  dark:text-white">
            {formatFrom(experience.priceFrom, experience.currency)}
          </p>
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
          <span className="inline-flex items-center gap-1 font-semibold  dark:text-white">
            <StarIcon className="h-4 w-4" />
            {experience.rating.toFixed(1)}
          </span>
          <span className="text-zinc-300">•</span>
          <span>({experience.reviewCount})</span>
          <span className="ml-auto rounded-full bg-zinc-100 px-2 py-1 text-[11px] font-semibold text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            {experience.tag}
          </span>
        </div>
      </div>
    </Card>
  );
}

function ImageLoader() {
  return (
    <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,#f4f4f5,45%,#e4e4e7,55%,#f4f4f5)] bg-[length:200%_100%] dark:bg-[linear-gradient(110deg,#18181b,45%,#27272a,55%,#18181b)]" />
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.7 1.2 6.6L12 17.9 6.1 20.8l1.2-6.6-4.8-4.7 6.6-.9L12 2.5Z" />
    </svg>
  );
}
