"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { Listing } from "@/types/listing";
import { cn } from "@/lib/utils/cn";

type ListingsCarouselProps = {
  title: string;
  description?: string;
  locale: string;
  items: Listing[];
  viewAllHref?: string;
};

export function ListingsCarousel({
  title,
  description,
  locale,
  items,
  viewAllHref,
}: ListingsCarouselProps) {
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
    <section>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h3 className="text-balance text-2xl font-semibold tracking-tight text-black">{title}</h3>
          {description ? <p className="mt-2 text-sm text-zinc-600">{description}</p> : null}
        </div>
        {viewAllHref ? (
          <Link href={viewAllHref} className="text-sm font-medium text-zinc-600 hover:text-black">
            Voir tout →
          </Link>
        ) : null}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="hidden sm:flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => scrollToIndex(Math.max(0, active - 1))}
            aria-label="Précédent"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => scrollToIndex(Math.min(pages - 1, active + 1))}
            aria-label="Suivant"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-1">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToIndex(idx)}
              className={cn(
                "h-2 w-2 rounded-full transition",
                idx === active ? "bg-black" : "bg-black/20 hover:bg-black/35",
              )}
              aria-label={`Aller à la carte ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="mt-5 flex gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {items.map((l) => (
          <Card
            key={l.id}
            className="group min-w-[86%] overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10 sm:min-w-[360px]"
            style={{ scrollSnapAlign: "start" }}
          >
            <Link href={`/${locale}/listings/${l.id}`} className="block">
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                <Image
                  src={l.imageUrl}
                  alt={l.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 360px"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-base font-semibold tracking-tight text-black">{l.title}</p>
                    <p className="mt-1 text-sm text-zinc-600">{l.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-black">
                      {l.pricePerNight} {l.currency}
                    </p>
                    <p className="text-xs text-zinc-500">/ nuit</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-zinc-700">
                  <Star className="h-4 w-4 text-black" />
                  <span className="font-medium text-black">{l.rating.toFixed(2)}</span>
                  <span className="text-zinc-500">({l.reviewCount})</span>
                </div>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}

function ArrowLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 18 9 12l6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m9 18 6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.7 1.2 6.6L12 17.9 6.1 20.8l1.2-6.6-4.8-4.7 6.6-.9L12 2.5Z" />
    </svg>
  );
}

