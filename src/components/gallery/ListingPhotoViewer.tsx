"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";

type ListingPhotoViewerProps = {
  title: string;
  images: string[];
  open: boolean;
  startIndex?: number;
  onClose: () => void;
};

const FADE_MS = 200;

/**
 * Fullscreen photo viewer. White background in light mode, black in dark mode.
 * Keyboard navigation (←/→/Esc), smooth fade in/out on open & close,
 * and a thumbnail strip showing the active photo.
 */
export function ListingPhotoViewer({
  title,
  images,
  open,
  startIndex = 0,
  onClose,
}: ListingPhotoViewerProps) {
  const t = useTranslations("listingGallery");
  const [index, setIndex] = useState(startIndex);
  // `mounted` keeps the node in the DOM during the fade-out animation.
  const [mounted, setMounted] = useState(open);
  // `visible` drives the opacity transition (off on the first paint → fades in).
  const [visible, setVisible] = useState(false);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const go = useCallback(
    (offset: number) => {
      setIndex((current) => (current + offset + images.length) % images.length);
    },
    [images.length],
  );

  const handleClose = useCallback(() => {
    // Trigger fade-out, then unmount after the transition.
    setVisible(false);
    const id = window.setTimeout(onClose, FADE_MS);
    return () => window.clearTimeout(id);
  }, [onClose]);

  // Mount / unmount lifecycle synced with the fade transition.
  useEffect(() => {
    if (open) {
      setMounted(true);
      setIndex(startIndex);
      // Next frame so the opacity transition has a starting point to animate from.
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
    const id = window.setTimeout(() => setMounted(false), FADE_MS);
    return () => window.clearTimeout(id);
  }, [open, startIndex]);

  // Keyboard nav + scroll lock while open.
  useEffect(() => {
    if (!mounted) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [mounted, go, handleClose]);

  // Keep the active thumbnail in view.
  useEffect(() => {
    if (!mounted) return;
    thumbRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [index, mounted]);

  if (!mounted || images.length === 0) return null;

  const hasMany = images.length > 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("viewerTitle")}
      className={cn(
        "fixed inset-0 z-[60] flex flex-col bg-white transition-opacity duration-200 ease-out dark:bg-black",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <header className="flex items-center justify-between px-4 py-3 sm:px-6">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {index + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={handleClose}
          aria-label={t("close")}
          className="grid size-10 place-items-center rounded-full text-zinc-700 transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:text-zinc-300 dark:hover:bg-white/10 dark:focus-visible:ring-white/25"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </header>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-12">
        <div className="relative h-full w-full max-w-6xl">
          <Image
            key={images[index]}
            src={images[index]}
            alt={`${title} — ${t("photo")} ${index + 1}`}
            fill
            className="object-contain gc-anim-fade-in"
            sizes="100vw"
            priority
          />
        </div>

        {hasMany ? (
          <>
            <ViewerArrow side="left" label={t("previous")} onClick={() => go(-1)} />
            <ViewerArrow side="right" label={t("next")} onClick={() => go(1)} />
          </>
        ) : null}
      </div>

      {hasMany ? (
        <div className="shrink-0 px-4 pb-5 pt-1 sm:px-12">
          <div className="mx-auto flex max-w-4xl gap-2 overflow-x-auto py-2">
            {images.map((src, i) => (
              <button
                key={`${src}-${i}`}
                ref={(el) => {
                  thumbRefs.current[i] = el;
                }}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={t("openPhoto", { index: i + 1 })}
                aria-current={i === index ? "true" : undefined}
                className={cn(
                  "relative h-16 w-20 shrink-0 overflow-hidden rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 dark:focus-visible:ring-white/30",
                  i === index
                    ? "ring-2 ring-zinc-900 ring-offset-2 ring-offset-white dark:ring-white dark:ring-offset-black"
                    : "opacity-60 hover:opacity-100",
                )}
              >
                <Image
                  src={src}
                  alt={`${title} — ${t("photo")} ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ViewerArrow({
  side,
  label,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-white text-black shadow-sm transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:border-white/15 dark:bg-zinc-900 dark:text-white dark:focus-visible:ring-white/25",
        side === "left" ? "left-3 sm:left-5" : "right-3 sm:right-5",
      )}
    >
      {side === "left" ? (
        <ChevronLeft className="size-5" aria-hidden="true" />
      ) : (
        <ChevronRight className="size-5" aria-hidden="true" />
      )}
    </button>
  );
}
