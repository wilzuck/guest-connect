"use client";

import { useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils/cn";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

type TestimonialsCarouselProps = {
  items: Testimonial[];
};

export function TestimonialsCarousel({ items }: TestimonialsCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const dragRef = useRef<{ active: boolean; startX: number; startScrollLeft: number }>({
    active: false,
    startX: 0,
    startScrollLeft: 0,
  });

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

    // repère l'élément le plus proche du bord gauche (snap)
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
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-zinc-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-zinc-50 to-transparent" />

      <div className="flex items-center justify-between gap-3">
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
              aria-label={`Aller à l’avis ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div
        ref={scrollerRef}
        onScroll={onScroll}
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
        className="mt-6 flex gap-4 overflow-x-auto scroll-smooth pb-2 overscroll-x-contain select-none md:cursor-grab md:active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory", touchAction: "pan-x" }}
      >
        {items.map((t) => (
          <Card
            key={`${t.name}-${t.role}-${t.quote.slice(0, 8)}`}
            className="min-w-[86%] p-6 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10 sm:min-w-[420px]"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white">
                <span className="text-sm font-semibold">{t.name.slice(0, 1)}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-black">{t.name}</p>
                <p className="text-xs text-zinc-500">{t.role}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-zinc-600">“{t.quote}”</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

