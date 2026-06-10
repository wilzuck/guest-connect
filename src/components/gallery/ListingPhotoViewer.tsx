"use client";

import { useCallback, useEffect, useState } from "react";
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

/**
 * Fullscreen photo viewer. White background in light mode, black in dark mode.
 * Keyboard navigation (←/→/Esc), clean close button, no thumbnails.
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

  useEffect(() => {
    if (open) setIndex(startIndex);
  }, [open, startIndex]);

  const go = useCallback(
    (offset: number) => {
      setIndex((current) => (current + offset + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
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
  }, [open, go, onClose]);

  if (!open || images.length === 0) return null;

  const hasMany = images.length > 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("viewerTitle")}
      className="fixed inset-0 z-[60] flex flex-col bg-white dark:bg-black"
    >
      <header className="flex items-center justify-between px-4 py-3 sm:px-6">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {index + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          className="grid size-10 place-items-center rounded-full text-zinc-700 transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:text-zinc-300 dark:hover:bg-white/10 dark:focus-visible:ring-white/25"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </header>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-12">
        <div className="relative h-full w-full max-w-6xl">
          <Image
            key={images[index]}
            src={images[index]}
            alt={`${title} — ${t("photo")} ${index + 1}`}
            fill
            className="object-contain"
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
