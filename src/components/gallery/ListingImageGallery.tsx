"use client";

import { useState } from "react";
import Image from "next/image";
import { Grid2x2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";
import { ListingPhotoViewer } from "@/components/gallery/ListingPhotoViewer";

type ListingImageGalleryProps = {
  title: string;
  images: string[];
};

/**
 * Airbnb-style gallery: one large hero + an elegant side composition on desktop,
 * a clean single hero on mobile. No thumbnails on the page — a discrete
 * "see all photos" button opens the fullscreen viewer.
 */
export function ListingImageGallery({ title, images }: ListingImageGalleryProps) {
  const t = useTranslations("listingGallery");
  const [viewerOpen, setViewerOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  if (images.length === 0) return null;

  function openAt(index: number) {
    setStartIndex(index);
    setViewerOpen(true);
  }

  const hero = images[0];
  const side = images.slice(1, 5);
  const hasComposition = side.length > 0;

  return (
    <>
      <div className="relative">
        <div
          className={cn(
            "grid gap-2 overflow-hidden rounded-3xl",
            hasComposition && "lg:grid-cols-2",
          )}
        >
          <GalleryTile
            src={hero}
            alt={`${title} — ${t("photo")} 1`}
            priority
            className={cn("aspect-[4/3] lg:aspect-auto lg:min-h-[26rem]")}
            sizes="(max-width: 1024px) 100vw, 50vw"
            onClick={() => openAt(0)}
            label={t("openPhoto", { index: 1 })}
          />

          {hasComposition ? (
            <div className="hidden grid-cols-2 gap-2 lg:grid">
              {side.map((src, i) => (
                <GalleryTile
                  key={`${src}-${i}`}
                  src={src}
                  alt={`${title} — ${t("photo")} ${i + 2}`}
                  className="min-h-[12.6rem]"
                  sizes="25vw"
                  onClick={() => openAt(i + 1)}
                  label={t("openPhoto", { index: i + 2 })}
                />
              ))}
            </div>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => openAt(0)}
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/95 px-4 py-2 text-sm font-semibold text-black shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:border-white/15 dark:bg-zinc-900/90 dark:text-white dark:hover:bg-zinc-900 dark:focus-visible:ring-white/25"
        >
          <Grid2x2 className="size-4" aria-hidden="true" />
          {t("showAllPhotos", { count: images.length })}
        </button>
      </div>

      <ListingPhotoViewer
        title={title}
        images={images}
        open={viewerOpen}
        startIndex={startIndex}
        onClose={() => setViewerOpen(false)}
      />
    </>
  );
}

function GalleryTile({
  src,
  alt,
  className,
  sizes,
  priority,
  onClick,
  label,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "group relative w-full overflow-hidden bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 dark:bg-zinc-900 dark:focus-visible:ring-white/30",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition duration-300 group-hover:scale-[1.02]"
      />
    </button>
  );
}
