"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { ChevronLeft, ChevronRight, Copy, Heart, ImageIcon, LayoutTemplate, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

type GalleryMode = "photos" | "plans";

type ListingLightboxProps = {
  title: string;
  images: string[];
  floorPlanImages?: string[];
};

export function ListingLightbox({ title, images, floorPlanImages = [] }: ListingLightboxProps) {
  const t = useTranslations("listingGallery");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<GalleryMode>("photos");
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  const activeImages = mode === "plans" && floorPlanImages.length > 0 ? floorPlanImages : images;
  const slides = useMemo(() => activeImages.map((src) => ({ src, alt: title })), [activeImages, title]);
  const currentImage = activeImages[index] ?? activeImages[0];
  const safeIndex = activeImages.length > 0 ? Math.min(index, activeImages.length - 1) : 0;

  function setGalleryMode(nextMode: GalleryMode) {
    setMode(nextMode);
    setIndex(0);
  }

  function openAt(nextIndex: number) {
    setIndex(nextIndex);
    setOpen(true);
  }

  function go(offset: number) {
    setIndex((current) => {
      if (activeImages.length <= 1) return 0;
      return (current + offset + activeImages.length) % activeImages.length;
    });
  }

  if (!currentImage) return null;

  return (
    <>
      <section className="overflow-hidden border border-black/10 bg-white dark:bg-black dark:text-white">
        <div className="flex items-center justify-between gap-3 border-b border-black/10 px-4 py-3 dark:border-black/10 lg:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100 dark:text-white dark:hover:bg-white/10 sm:inline-flex"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              {t("backToListing")}
            </button>
            <SegmentButton active={mode === "photos"} onClick={() => setGalleryMode("photos")}>
              <ImageIcon className="h-4 w-4" aria-hidden="true" />
              {t("photos")}
            </SegmentButton>
            {floorPlanImages.length > 0 ? (
              <SegmentButton active={mode === "plans"} onClick={() => setGalleryMode("plans")}>
                <LayoutTemplate className="h-4 w-4" aria-hidden="true" />
                {t("floorPlans")}
              </SegmentButton>
            ) : null}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-black/10 px-4 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-50 dark:text-white dark:hover:bg-white/10"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {t("showNumber")}
            </button>
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              {t("contactHost")}
            </button>
            <IconAction label={t("copyLink")}>
              <Copy className="h-5 w-5" aria-hidden="true" />
            </IconAction>
            <IconAction label={t("save")}>
              <Heart className="h-5 w-5" aria-hidden="true" />
            </IconAction>
          </div>
        </div>

        <div className="grid gap-4 px-4 py-6 dark:bg-black sm:py-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8 lg:px-8 xl:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="order-2 lg:order-1 lg:flex lg:flex-col lg:justify-center">
            <p className="text-sm font-medium text-zinc-900 dark:text-white">
              {safeIndex + 1} / {activeImages.length}
            </p>
            <div className="mt-4 grid grid-flow-col auto-cols-[72px] gap-3 overflow-x-auto pb-2 lg:grid-flow-row lg:grid-cols-3 lg:overflow-visible lg:pb-0">
              {activeImages.map((src, thumbIndex) => (
                <button
                  key={`${src}-${thumbIndex}`}
                  type="button"
                  onClick={() => setIndex(thumbIndex)}
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-lg border bg-zinc-100 transition dark:bg-zinc-900",
                    thumbIndex === safeIndex
                      ? "border-black ring-2 ring-black/20 dark:border-white dark:ring-white/20"
                      : "border-transparent opacity-80 hover:opacity-100",
                  )}
                  aria-label={t(mode === "plans" ? "openFloorPlan" : "openPhoto", { index: thumbIndex + 1 })}
                >
                  <Image
                    src={src}
                    alt={`${title} - ${mode === "plans" ? t("floorPlan") : t("photo")} ${thumbIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="84px"
                  />
                </button>
              ))}
            </div>
          </aside>

          <div className="order-1 lg:order-2">
            <div className="relative mx-auto aspect-[16/9] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 lg:rounded-3xl">
              {!loaded[currentImage] ? <ImageLoader /> : null}
              <Image
                src={currentImage}
                alt={`${title} - ${mode === "plans" ? t("floorPlan") : t("photo")} ${safeIndex + 1}`}
                fill
                className={cn("object-cover", mode === "plans" ? "bg-white object-contain" : "")}
                sizes="(max-width: 1024px) 100vw, 72vw"
                priority
                onLoad={() => setLoaded((current) => ({ ...current, [currentImage]: true }))}
                onClick={() => openAt(safeIndex)}
              />

              {activeImages.length > 1 ? (
                <>
                  <GalleryArrow label={t("previous")} side="left" onClick={() => go(-1)} />
                  <GalleryArrow label={t("next")} side="right" onClick={() => go(1)} />
                </>
              ) : null}

              {mode === "plans" ? (
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white">
                  <LayoutTemplate className="h-4 w-4" aria-hidden="true" />
                  {t("floorPlans")}
                </div>
              ) : null}

              <div className="absolute bottom-4 right-4 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white">
                {safeIndex + 1} / {activeImages.length}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={safeIndex}
        slides={slides}
        plugins={[Thumbnails, Zoom]}
        carousel={{ finite: false }}
        controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
        animation={{ fade: 260, swipe: 240 }}
        styles={{ container: { backgroundColor: "rgba(0,0,0,0.92)" } }}
      />
    </>
  );
}

function SegmentButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold transition",
        active
          ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
          : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/15",
      )}
    >
      {children}
    </button>
  );
}

function IconAction({ label, children }: { label: string; children: ReactNode }) {
  return (
    <button
      type="button"
      className="grid h-10 w-10 place-items-center rounded-full text-zinc-900 transition hover:bg-zinc-100 dark:text-white dark:hover:bg-white/10"
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

function GalleryArrow({
  label,
  side,
  onClick,
}: {
  label: string;
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "absolute top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-lg shadow-black/10 transition hover:scale-105 dark:bg-zinc-950 dark:text-white dark:shadow-black/40",
        side === "left" ? "left-4" : "right-4",
      )}
      aria-label={label}
      title={label}
    >
      {side === "left" ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
    </button>
  );
}

function ImageLoader() {
  return (
    <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,#f4f4f5,45%,#e4e4e7,55%,#f4f4f5)] bg-[length:200%_100%] dark:bg-[linear-gradient(110deg,#18181b,45%,#27272a,55%,#18181b)]" />
  );
}
