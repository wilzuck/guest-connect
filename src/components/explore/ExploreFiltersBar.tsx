"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { useTranslations } from "next-intl";

export type ExploreFilterChip = {
  href?: string;
  label?: string;
  active?: boolean;
  divider?: boolean;
  title?: string;
};

export function ExploreFiltersBar({
  chips,
  className,
  leading,
}: {
  chips: ExploreFilterChip[];
  className?: string;
  leading?: ReactNode;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const t = useTranslations("exploreFiltersBar");
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
    <nav
      className={cn("relative -mx-[15px] flex items-center gap-2 px-[15px]", className)}
      aria-label="Filtres rapides"
    >
      {leading ? <div className="relative z-20 shrink-0 pr-1">{leading}</div> : null}

      {/* Gradients 
      <div className="pointer-events-none scheme-dark:hidden absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none scheme-dark:hidden absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent" />
      */}
      {/* Desktop arrows */}
      <button
        type="button"
        onClick={() => scrollBy(-320)}
        className={cn(
          "hidden md:grid absolute top-1/2 -translate-y-1/2 z-10 h-10 w-10 place-items-center rounded-full bg-white shadow-sm shadow-black/10 transition",
          leading ? "left-30" : "left-2",
          canLeft ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        aria-label={t("scrollLeft")}
        title={t("scrollLeft")}
      >
        <ChevronLeft className="h-5 w-5 text-zinc-700" />
      </button>
      <button
        type="button"
        onClick={() => scrollBy(320)}
        className={cn(
          "hidden md:grid absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 place-items-center rounded-full bg-white shadow-sm shadow-black/10 transition",
          canRight ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        aria-label={t("scrollRight")}
        title={t("scrollRight")}
      >
        <ChevronRight className="h-5 w-5 text-zinc-700" />
      </button>

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
        className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto whitespace-nowrap py-1 overscroll-x-contain select-none md:cursor-grab md:active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ touchAction: "pan-x" }}
      >
        {chips.map((c, idx) => {
          if (c.divider) return <span key={`d-${idx}`} className="mx-1 h-5 w-px bg-black/10" />;
          return (
            <Link
              key={c.href ?? `c-${idx}`}
              href={c.href ?? "#"}
              title={c.title ?? c.label}
              aria-current={c.active ? "page" : undefined}
              className={
                c.active
                  ? "rounded-full bg-black px-4 py-2 text-sm font-semibold text-white"
                  : "rounded-full bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-200 hover:text-black"
              }
            >
              {c.label}
            </Link>
          );
        })}
      </div>
    </nav>
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
