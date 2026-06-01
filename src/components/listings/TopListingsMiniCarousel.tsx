"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import type { Listing } from "@/types/listing";
import { cn } from "@/lib/utils/cn";

type TopListingsMiniCarouselProps = {
  locale: string;
  items: Listing[];
  title: string;
};

export function TopListingsMiniCarousel({ locale, items, title }: TopListingsMiniCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const pages = useMemo(() => Math.max(1, items.length), [items.length]);

  function scrollToIndex(index: number) {
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.children.item(index) as HTMLElement | null;
    if (!child) return;
    child.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  function onScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    let bestIndex = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    for (let i = 0; i < el.children.length; i++) {
      const child = el.children.item(i) as HTMLElement | null;
      if (!child) continue;
      const dist = Math.abs(child.getBoundingClientRect().left - el.getBoundingClientRect().left);
      if (dist < bestDist) {
        bestDist = dist;
        bestIndex = i;
      }
    }
    setActive(bestIndex);
  }

  return (
    <div className="mt-6">
      <div className="flex items-end justify-between gap-4">
        <p className="text-sm font-semibold text-black dark:text-white">{title}</p>
        <div className="flex items-center gap-1">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              className={cn(
                "h-2 w-2 rounded-full transition",
                idx === active ? "bg-black dark:bg-white" : "bg-black/20 hover:bg-black/35 dark:bg-white/20 dark:hover:bg-white/35",
              )}
              aria-label={`Aller à la carte ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="mt-3 flex gap-3 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {items.map((l) => (
          <Card
            key={l.id}
            className="group min-w-[240px] overflow-hidden border border-black/10 bg-white shadow-sm shadow-black/5 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10 dark:border-white/10 dark:bg-zinc-950"
            style={{ scrollSnapAlign: "start" }}
          >
            <Link href={`/${locale}/listings/${l.id}`} className="block">
              <div className="relative h-28 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                <Image
                  src={l.imageUrl}
                  alt={l.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="240px"
                />
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-semibold text-black dark:text-white">{l.title}</p>
                <p className="mt-1 truncate text-xs text-zinc-600 dark:text-zinc-400">{l.location}</p>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

