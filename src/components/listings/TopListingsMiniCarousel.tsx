"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import type { Listing } from "@/types/listing";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/Button";

type TopListingsMiniCarouselProps = {
  locale: string;
  items: Listing[];
  title: string;
};

export function TopListingsMiniCarousel({ locale, items, title }: TopListingsMiniCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const dragRef = useRef<{ active: boolean; startX: number; startScrollLeft: number }>({
    active: false,
    startX: 0,
    startScrollLeft: 0,
  });

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
    <div className="relative lg:pt-6 lg:pb-6 py-4" style={{ contain: "layout paint" }}>
      
      {/* Container indépendant (évite les reflows sur le hero) */}
      <div className="relative  -mx-[15px] px-[15px]">
        
        {/* Arrows (comme la barre de filtres Explore) */}
        <Button
          type="button"
          onClick={() => scrollBy(-320)}
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 z-10 grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm transition",
            canLeft ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
          aria-label="Défiler à gauche"
          title="Défiler à gauche"
        >
          <ChevronLeft className="h-5 w-5 text-zinc-700 shadow-xl" />
        </Button>
        <Button
          type="button"
          onClick={() => scrollBy(320)}
          className={cn(
            ` absolute right-2 top-1/2 -translate-y-1/2 z-10 grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm transition
            `,
            canRight ? "opacity-100" : "opacity-0 pointer-events-none",
          )}

          aria-label="Défiler à droite"
          title="Défiler à droite"
        >
          <ChevronRight className="h-5 w-5 text-zinc-700 shadow-xl" />
        </Button>

        <div className="flex items-center justify-between">
        <h2 className="text-md font-semibold">{title}</h2>

        <ButtonLink
          href={`/${locale}/stays`}
          variant="outline"
          className="flex items-center gap-2 text-sm font-medium text-zinc-700 transition hover:text-black"
        >
          Voir tout
          <ChevronRight className="h-4 w-4" />
        </ButtonLink>
      </div>

        <div
          ref={scrollerRef}
          onPointerDown={(e) => {
            const el = scrollerRef.current;
            if (!el) return;
            if (e.pointerType !== "mouse") return;
            dragRef.current.active = true;
            dragRef.current.startX = e.clientX;
            dragRef.current.startScrollLeft = el.scrollLeft;
            (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            const el = scrollerRef.current;
            if (!el) return;
            if (!dragRef.current.active) return;
            const dx = e.clientX - dragRef.current.startX;
            el.scrollLeft = dragRef.current.startScrollLeft - dx;
          }}
          onPointerUp={() => {
            dragRef.current.active = false;
          }}
          onPointerCancel={() => {
            dragRef.current.active = false;
          }}
          className="mt-3 flex gap-4 overflow-x-auto scroll-smooth pb-2 overscroll-x-contain select-none md:cursor-grab md:active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory", touchAction: "pan-x" }}
        >
          {items.map((l) => (
            <Card
              key={l.id}
              className="group min-w-[200px] overflow-hidden border-0 bg-white !shadow-none transition hover:-translate-y-0.5 hover:!shadow-none dark:border-white/10 dark:bg-zinc-950 sm:min-w-[240px]"
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
                  <p className="truncate text-sm font-semibold  dark:text-white">{l.title}</p>
                 <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm text-zinc-600 dark:text-zinc-400">{l.location}</p>
                  <div className="flex items-center">
                    <span className="text-sm font-bold text-black dark:text-white">{l.pricePerNight} {String(l.currency ?? "€")}</span>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">/nuit</span>
                  </div>
                 </div>
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
