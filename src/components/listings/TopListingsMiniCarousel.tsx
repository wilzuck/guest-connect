"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  function update() {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < max - 4);
  }

  useEffect(() => {
    update();
    const el = scrollerRef.current;
    if (!el) return;
    const on = () => update();
    el.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      el.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  function scrollBy(dx: number) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dx, behavior: "smooth" });
  }

  return (
    <div className="relative mt-6" style={{ contain: "layout paint" }}>
      {/* Container indépendant (évite les reflows sur le hero) */}
      <div className="relative -mx-[15px] px-[15px]">
        {/* Gradients */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent dark:from-zinc-950" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent dark:from-zinc-950" />

        {/* Arrows (comme la barre de filtres Explore) */}
        <button
          type="button"
          onClick={() => scrollBy(-320)}
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 z-10 grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm shadow-black/10 transition",
            canLeft ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
          aria-label="Défiler à gauche"
          title="Défiler à gauche"
        >
          <ChevronLeft className="h-5 w-5 text-zinc-700" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(320)}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 z-10 grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm shadow-black/10 transition",
            canRight ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
          aria-label="Défiler à droite"
          title="Défiler à droite"
        >
          <ChevronRight className="h-5 w-5 text-zinc-700" />
        </button>

        <div className="flex items-end justify-between gap-4">
          <p className="text-sm font-semibold text-black dark:text-white">{title}</p>
        </div>

        <div
          ref={scrollerRef}
          className="mt-3 flex gap-3 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory", touchAction: "pan-x" }}
        >
          {items.map((l) => (
            <Card
              key={l.id}
              className="group min-w-[200px] overflow-hidden border border-black/10 bg-white shadow-none transition hover:-translate-y-0.5 hover:shadow-none dark:border-white/10 dark:bg-zinc-950 sm:min-w-[240px]"
              style={{ scrollSnapAlign: "start" }}
            >
              <Link href={`/${locale}/listings/${l.id}`} className="block">
                <div className="relative h-20 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                  <Image
                    src={l.imageUrl}
                    alt={l.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="240px"
                  />
                </div>
                <div className="p-2">
                  <p className="truncate text-sm font-semibold text-black dark:text-white">{l.title}</p>
                  <p className="mt-1 truncate text-xs text-zinc-600 dark:text-zinc-400">{l.location}</p>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m14 6-6 6 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m10 18 6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
