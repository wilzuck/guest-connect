"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";

type CarouselProps = {
  children: ReactNode;
  title?: ReactNode;
  action?: ReactNode;
  scrollStep?: number;
  className?: string;
  gapClassName?: string;
};

export function SimpleCarousel({
  children,
  title,
  action,
  scrollStep = 320,
  className,
  gapClassName = "gap-4",
}: CarouselProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  // Drag state — on ref pour éviter les re-renders
  const drag = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false, // détecte si c'était un vrai drag (pour annuler les clicks)
  });

  // ── Arrow visibility ────────────────────────────────────────────────────

  function updateArrows() {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < max - 4);
  }

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  function scrollBy(dx: number) {
    scrollerRef.current?.scrollBy({ left: dx, behavior: "smooth" });
  }

  // ── Pointer handlers (souris uniquement — touch géré nativement) ────────

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    // On ne prend en charge que la souris ici
    // Le touch/stylet est géré nativement par overflow-x: scroll + touch-action
    if (e.pointerType !== "mouse") return;
    const el = scrollerRef.current;
    if (!el) return;

    drag.current = {
      active: true,
      startX: e.clientX,
      startScrollLeft: el.scrollLeft,
      moved: false,
    };

    // Capturer le pointer pour recevoir les events même hors de l'élément
    el.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current.active) return;
    const el = scrollerRef.current;
    if (!el) return;

    const dx = e.clientX - drag.current.startX;

    // Seuil de 4px avant de considérer que c'est un drag
    if (Math.abs(dx) > 4) {
      drag.current.moved = true;
    }

    el.scrollLeft = drag.current.startScrollLeft - dx;
  }

  function onPointerUp() {
    drag.current.active = false;
  }

  // Empêche le click sur les liens enfants après un drag
  function onClickCapture(e: React.MouseEvent) {
    if (drag.current.moved) {
      e.stopPropagation();
      e.preventDefault();
      drag.current.moved = false;
    }
  }

  return (
    <div
      className={cn("relative lg:pt-6 lg:pb-6 py-4", className)}
      style={{ contain: "layout paint" }}
    >
      <div className="relative -mx-[15px] px-[15px]">
        <CarouselArrow
          direction="left"
          visible={canLeft}
          onClick={() => scrollBy(-scrollStep)}
        />
        <CarouselArrow
          direction="right"
          visible={canRight}
          onClick={() => scrollBy(scrollStep)}
        />

        {(title || action) && (
          <div className="flex items-center justify-between mb-3">
            {title && <div>{title}</div>}
            {action && <div>{action}</div>}
          </div>
        )}

        <div
          ref={scrollerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClickCapture={onClickCapture}
          className={cn(
            // Scroll
            "flex overflow-x-auto scroll-smooth pb-2",
            // Overscroll — laisse le momentum natif sur iOS/Android
            "overscroll-x-contain",
            // Masque la scrollbar partout
            "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            // Curseur drag souris
            "md:cursor-grab md:active:cursor-grabbing",
            // Sélection de texte désactivée pendant le drag
            "select-none",
            gapClassName,
          )}
          style={{
            // Snap activé — "mandatory" pour un comportement pro (item entier visible)
            scrollSnapType: "x mandatory",
            // Critique sur mobile : laisse le navigateur gérer le scroll horizontal natif
            // sans interférence — c'est ça qui donne le momentum/inertie iOS
            touchAction: "pan-x pinch-zoom",
            // Momentum scroll sur iOS (Safari legacy)
            WebkitOverflowScrolling: "touch",
          } as React.CSSProperties}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── CarouselItem ─────────────────────────────────────────────────────────────

type CarouselItemProps = {
  children: ReactNode;
  className?: string;
};

export function CarouselItem({ children, className }: CarouselItemProps) {
  return (
    <div
      className={cn("flex-none", className)}
      style={{ scrollSnapAlign: "start" }}
    >
      {children}
    </div>
  );
}

// ─── Arrow ────────────────────────────────────────────────────────────────────

type CarouselArrowProps = {
  direction: "left" | "right";
  visible: boolean;
  onClick: () => void;
};



function CarouselArrow({ direction, visible, onClick }: CarouselArrowProps) {
  const isLeft = direction === "left";
  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      onClick={onClick}
      aria-label={isLeft ? "Défiler à gauche" : "Défiler à droite"}
      title={isLeft ? "Défiler à gauche" : "Défiler à droite"}
      className={cn(
        "absolute top-1/2 cursor-pointer -translate-y-1/2 z-10 grid h-10 w-10 place-items-center rounded-full shadow-sm transition",
        isLeft ? "left-4" : "right-4",
        visible ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      {isLeft ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
    </Button>
  );
}

// ─── SVG icons ────────────────────────────────────────────────────────────────

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m14 6-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m10 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
