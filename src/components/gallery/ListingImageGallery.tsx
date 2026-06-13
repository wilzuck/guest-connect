"use client";

import { useState } from "react";
import Image from "next/image";
import { Images } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";
import { ListingPhotoViewer } from "@/components/gallery/ListingPhotoViewer";
import { Button } from "../ui/Button";

type ListingImageGalleryProps = {
  title: string;
  images: string[];
};

export function ListingImageGallery({ title, images }: ListingImageGalleryProps) {
  const t = useTranslations("listingGallery");
  const [viewerOpen, setViewerOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  if (images.length === 0) return null;

  function openAt(index: number) {
    setStartIndex(index);
    setViewerOpen(true);
  }

  const visibleImages = images.slice(0, 5);
  const count = visibleImages.length;

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl">
        <div
          className={cn(
            "grid gap-2 bg-zinc-100 dark:bg-zinc-900",
            count === 1 && "grid-cols-1",
            count === 2 && "lg:grid-cols-2",
            count === 3 && "lg:grid-cols-[1.4fr_1fr]",
            count === 4 && "lg:grid-cols-[1.2fr_1fr]",
            count >= 5 && "lg:grid-cols-2",
          )}
        >
          {count === 1 ? (
            <GalleryTile
              src={visibleImages[0]}
              alt={`${title} — ${t("photo")} 1`}
              priority
              className="aspect-[16/9] min-h-[20rem] lg:min-h-[30rem]"
              sizes="100vw"
              onClick={() => openAt(0)}
              label={t("openPhoto", { index: 1 })}
            />
          ) : null}

          {count === 2 ? (
            <>
              {visibleImages.map((src, index) => (
                <GalleryTile
                  key={`${src}-${index}`}
                  src={src}
                  alt={`${title} — ${t("photo")} ${index + 1}`}
                  priority={index === 0}
                  className="aspect-[4/3] min-h-[22rem] lg:min-h-[30rem]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onClick={() => openAt(index)}
                  label={t("openPhoto", { index: index + 1 })}
                />
              ))}
            </>
          ) : null}

          {count === 3 ? (
            <>
              <GalleryTile
                src={visibleImages[0]}
                alt={`${title} — ${t("photo")} 1`}
                priority
                className="aspect-[4/3] lg:min-h-[30rem]"
                sizes="(max-width: 1024px) 100vw, 58vw"
                onClick={() => openAt(0)}
                label={t("openPhoto", { index: 1 })}
              />

              <div className="hidden gap-2 lg:grid">
                {visibleImages.slice(1, 3).map((src, index) => (
                  <GalleryTile
                    key={`${src}-${index}`}
                    src={src}
                    alt={`${title} — ${t("photo")} ${index + 2}`}
                    className="min-h-[14.75rem]"
                    sizes="42vw"
                    onClick={() => openAt(index + 1)}
                    label={t("openPhoto", { index: index + 2 })}
                  />
                ))}
              </div>
            </>
          ) : null}

          {count === 4 ? (
            <>
              <GalleryTile
                src={visibleImages[0]}
                alt={`${title} — ${t("photo")} 1`}
                priority
                className="aspect-[4/3] lg:min-h-[30rem]"
                sizes="(max-width: 1024px) 100vw, 55vw"
                onClick={() => openAt(0)}
                label={t("openPhoto", { index: 1 })}
              />

              <div className="hidden grid-cols-2 gap-2 lg:grid">
                <GalleryTile
                  src={visibleImages[1]}
                  alt={`${title} — ${t("photo")} 2`}
                  className="min-h-[14.75rem]"
                  sizes="22vw"
                  onClick={() => openAt(1)}
                  label={t("openPhoto", { index: 2 })}
                />

                <GalleryTile
                  src={visibleImages[2]}
                  alt={`${title} — ${t("photo")} 3`}
                  className="min-h-[14.75rem]"
                  sizes="22vw"
                  onClick={() => openAt(2)}
                  label={t("openPhoto", { index: 3 })}
                />

                <GalleryTile
                  src={visibleImages[3]}
                  alt={`${title} — ${t("photo")} 4`}
                  className="col-span-2 min-h-[14.75rem]"
                  sizes="44vw"
                  onClick={() => openAt(3)}
                  label={t("openPhoto", { index: 4 })}
                />
              </div>
            </>
          ) : null}

          {count >= 5 ? (
            <>
              <GalleryTile
                src={visibleImages[0]}
                alt={`${title} — ${t("photo")} 1`}
                priority
                className="aspect-[4/3] lg:min-h-[30rem]"
                sizes="(max-width: 1024px) 100vw, 50vw"
                onClick={() => openAt(0)}
                label={t("openPhoto", { index: 1 })}
              />

              <div className="hidden grid-cols-2 gap-2 lg:grid">
                {visibleImages.slice(1, 5).map((src, index) => (
                  <GalleryTile
                    key={`${src}-${index}`}
                    src={src}
                    alt={`${title} — ${t("photo")} ${index + 2}`}
                    className="min-h-[14.75rem]"
                    sizes="25vw"
                    onClick={() => openAt(index + 1)}
                    label={t("openPhoto", { index: index + 2 })}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>

        <Button
          type="button"
          onClick={() => openAt(0)}
          variant="primary"
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-4 py-3 text-xs font-semibold tracking-[0.12em] text-white shadow-sm backdrop-blur-md transition hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        >
          <Images className="size-4" aria-hidden="true" />
          {t("showAllPhotos", { count: images.length })}
        </Button>
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
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "group relative cursor-pointer w-full overflow-hidden bg-zinc-100 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 dark:bg-zinc-900 dark:focus-visible:ring-white/30",
        className,
      )}
    >
      {!loaded ? (
        <div className="absolute inset-0 animate-pulse bg-linear-to-r from-zinc-100 via-zinc-200 to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900" />
      ) : null}

      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={cn(
          "object-cover transition cursor-pointer duration-500 group-hover:scale-[1.02]",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />

      <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
    </button>
  );
}