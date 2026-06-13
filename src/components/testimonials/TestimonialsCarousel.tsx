"use client";

import { useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils/cn";
import { SimpleCarousel } from "../ui/SimpleCarrousel";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

type TestimonialsCarouselProps = {
  items: Testimonial[];
  showDots?: boolean;
  dotsPosition?: "start" | "center" | "end";
};

export function TestimonialsCarousel({ items, showDots = true, dotsPosition = "center" }: TestimonialsCarouselProps) {
  return (
    <div className="relative">
      <SimpleCarousel
      showDots={showDots}
      dotsPosition={dotsPosition}
      showArrows={false}
      showHeader={false}
      >
        {items.map((t) => (
          <Card
            key={`${t.name}-${t.role}-${t.quote.slice(0, 8)}`}
            className="min-w-md p-6 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10 sm:min-w-[420px]"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white">
                <span className="text-sm font-semibold">{t.name.slice(0, 1)}</span>
              </div>
              <div>
                <p className="text-sm font-semibold ">{t.name}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{t.role}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-zinc-600">“{t.quote}”</p>
          </Card>
        ))}
      </SimpleCarousel>
    </div>
  );
}

