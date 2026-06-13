"use client";

import {
  Children,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";

type CarouselProps = {
  children: ReactNode;
  title?: ReactNode;
  action?: ReactNode;
  scrollStep?: number;
  className?: string;
  viewportClassName?: string;
  gapClassName?: string;
  itemsPerPage?: number;
  dotsPosition?: "start" | "center" | "end";
  showDots?: boolean;
  showArrows?: boolean;
  showHeader?: boolean;
};

export function SimpleCarousel({
  children,
  title,
  action,
  scrollStep = 300,
  className,
  viewportClassName,
  gapClassName = "gap-4",
  itemsPerPage = 3,
  dotsPosition = "center",
  showDots = false,
  showArrows = true,
  showHeader = true,
}: CarouselProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  
  const items = Children.toArray(children);

  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const pagesCount = Math.ceil(items.length / itemsPerPage);
  const [activePage, setActivePage] = useState(0);
    
  const drag = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });

function updateCarouselState() {
  const el = scrollerRef.current;
  if (!el) return;

  const maxScrollLeft = el.scrollWidth - el.clientWidth;
  const scrollLeft = el.scrollLeft;

  setCanLeft(scrollLeft > 4);
  setCanRight(scrollLeft < maxScrollLeft - 4);

  if (maxScrollLeft <= 0 || pagesCount <= 1) {
    setActivePage(0);
    return;
  }

  const startThreshold = 8;
  const endThreshold = 32;

  if (scrollLeft <= startThreshold) {
    setActivePage(0);
    return;
  }

  if (scrollLeft >= maxScrollLeft - endThreshold) {
    setActivePage(pagesCount - 1);
    return;
  }

  const pageWidth = maxScrollLeft / (pagesCount - 1);
  const nextPage = Math.round(scrollLeft / pageWidth);

  setActivePage(Math.min(Math.max(nextPage, 0), pagesCount - 1));
}

  useEffect(() => {
    updateCarouselState();

    const el = scrollerRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateCarouselState, { passive: true });
    window.addEventListener("resize", updateCarouselState);

    return () => {
      el.removeEventListener("scroll", updateCarouselState);
      window.removeEventListener("resize", updateCarouselState);
    };
  }, []);

  useEffect(() => {
    updateCarouselState();
  }, [items.length,pagesCount]);

  function scrollBy(dx: number) {
    scrollerRef.current?.scrollBy({ left: dx, behavior: "smooth" });
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;

    const el = scrollerRef.current;
    if (!el) return;

    drag.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft: el.scrollLeft,
      moved: false,
    };

    el.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current.active) return;

    const el = scrollerRef.current;
    if (!el) return;

    const dx = event.clientX - drag.current.startX;

    if (Math.abs(dx) > 4) {
      drag.current.moved = true;
    }

    el.scrollLeft = drag.current.startScrollLeft - dx;
  }

  function onPointerUp() {
    drag.current.active = false;
  }

  function onClickCapture(event: MouseEvent) {
    if (!drag.current.moved) return;

    event.stopPropagation();
    event.preventDefault();
    drag.current.moved = false;
  }
  

function scrollToPage(pageIndex: number) {
  const el = scrollerRef.current;
  if (!el) return;

  const maxScrollLeft = el.scrollWidth - el.clientWidth;

  const safePageIndex = Math.min(Math.max(pageIndex, 0), pagesCount - 1);

  const target =
    safePageIndex === pagesCount - 1
      ? maxScrollLeft
      : maxScrollLeft * (safePageIndex / Math.max(pagesCount - 1, 1));

  el.scrollTo({
    left: target,
    behavior: "smooth",
  });

  setActivePage(safePageIndex);
}
  return (
    <section className={cn("relative", className)}>
      {(title || action || canLeft || canRight) && (
        <div className="mb-4 flex items-center justify-between gap-4">
          {showHeader && <div className="min-w-0">{title}</div>}

          {showArrows && (
            <div className="flex shrink-0 items-center gap-2">
              {action}

              <CarouselArrow
                direction="left"
                disabled={!canLeft}
                onClick={() => scrollBy(-scrollStep)}
              />

              <CarouselArrow
                direction="right"
                disabled={!canRight}
                onClick={() => scrollBy(scrollStep)}
              />
            </div>
          )}
        </div>
      )}

      <div className="relative -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-0 lg:px-0">
        <div
          ref={scrollerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClickCapture={onClickCapture}
          className={cn(
            "flex overflow-x-auto scroll-smooth pb-3",
            "overscroll-x-contain",
            "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "select-none md:cursor-grab md:active:cursor-grabbing",
            gapClassName,
            viewportClassName,
          )}
          style={
            {
              scrollSnapType: "x mandatory",
              scrollPaddingLeft: "1rem",
              touchAction: "pan-x pinch-zoom",
              WebkitOverflowScrolling: "touch",
            } as CSSProperties
          }
        >
          {items}
        </div>
      </div>

      {showDots && pagesCount > 1 ? (
        <CarouselDots
          count={pagesCount}
          active={activePage}
          onSelect={scrollToPage}
          label="Page"
          position={dotsPosition}
          className="mt-1"
        />
      ) : null}
    </section>
  );
}

type CarouselItemProps = {
  children: ReactNode;
  className?: string;
};

export function CarouselItem({ children, className }: CarouselItemProps) {
  return (
    <div
      className={cn("w-62.5 flex-none sm:w-70 lg:w-65", className)}
      style={{ scrollSnapAlign: "start" }}
    >
      {children}
    </div>
  );
}

type CarouselArrowProps = {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
};

function CarouselArrow({ direction, disabled, onClick }: CarouselArrowProps) {
  const isLeft = direction === "left";

  return (
    <Button
      type="button"
      variant="secondary"
      size="icon"
      onClick={onClick}
      disabled={disabled}
      aria-label={isLeft ? "Défiler à gauche" : "Défiler à droite"}
      title={isLeft ? "Défiler à gauche" : "Défiler à droite"}
      className={cn(
        "hidden size-9 rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm shadow-black/5 transition hover:border-zinc-300 hover:bg-zinc-50 disabled:pointer-events-none disabled:opacity-40 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200 dark:shadow-none dark:hover:bg-white/[0.04] sm:grid",
      )}
    >
      {isLeft ? (
        <ChevronLeft className="size-4" />
      ) : (
        <ChevronRight className="size-4" />
      )}
    </Button>
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m15 18-6-6 6-6"
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
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m9 6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type CarouselDotsProps = {
  count: number;
  active: number;
  onSelect: (index: number) => void;
  label?: string;
  className?: string;
  position?: "start" | "center" | "end";
};

function CarouselDots({
  count,
  active,
  onSelect,
  label = "Page",
  className,
  position = "center",
}: CarouselDotsProps) {
  if (count <= 1) return null;

  return (
    <div
      className={cn(
        "flex items-center p-2",
        position === "start" && "justify-start",
        position === "center" && "justify-center",
        position === "end" && "justify-end",
        className,
      )}
    >
      <div className="flex items-center gap-1.5">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-200",
              index === active
                ? "w-5 bg-black dark:bg-white"
                : "w-2 bg-black/20 hover:bg-black/35 dark:bg-white/25 dark:hover:bg-white/40",
            )}
            aria-label={`${label} ${index + 1}`}
            aria-current={index === active ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
