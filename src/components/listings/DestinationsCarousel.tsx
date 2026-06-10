"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { cn } from "@/lib/utils/cn";

export type CarouselDestination = {
  city: string;
  country: string;
  imageUrl: string;
};

type DestinationsCarouselProps = {
  locale: string;
  destinations: CarouselDestination[];
};

export function DestinationsCarousel({ locale, destinations }: DestinationsCarouselProps) {
  const t = useTranslations("homeDestinations");
  const scrollerRef = useRef<HTMLUListElement | null>(null);
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
  }, [destinations.length]);

  function scrollByDx(dx: number) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dx, behavior: "smooth" });
  }

  return (
    <div className="relative mt-10" style={{ contain: "layout paint" }}>
      <div className="relative -mx-[15px] px-[15px]">
        <button
          type="button"
          onClick={() => scrollByDx(-320)}
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 z-10 grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:bg-zinc-900 dark:focus-visible:ring-white",
            canLeft ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
          aria-label={t("scrollLeft")}
          title={t("scrollLeft")}
        >
          <ChevronLeft className="h-5 w-5 text-zinc-700 dark:text-zinc-200" />
        </button>
        <button
          type="button"
          onClick={() => scrollByDx(320)}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 z-10 grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:bg-zinc-900 dark:focus-visible:ring-white",
            canRight ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
          aria-label={t("scrollRight")}
          title={t("scrollRight")}
        >
          <ChevronRight className="h-5 w-5 text-zinc-700 dark:text-zinc-200" />
        </button>

        <ul
          ref={scrollerRef}
          onPointerDown={(e) => {
            const el = scrollerRef.current;
            if (!el) return;
            if (e.pointerType !== "mouse") return;
            dragRef.current.active = true;
            dragRef.current.startX = e.clientX;
            dragRef.current.startScrollLeft = el.scrollLeft;
            (e.currentTarget as HTMLUListElement).setPointerCapture(e.pointerId);
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
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2 overscroll-x-contain select-none md:cursor-grab md:active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x mandatory", touchAction: "pan-x" }}
        >
          {destinations.map((d) => (
            <li
              key={d.city}
              className="min-w-[160px] sm:min-w-[200px]"
              style={{ scrollSnapAlign: "start" }}
            >
              <DestinationCard
                locale={locale}
                city={d.city}
                country={d.country}
                imageUrl={d.imageUrl}
                exploreLabel={t("exploreCity", { city: d.city })}
              />
            </li>
          ))}
        </ul>
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
