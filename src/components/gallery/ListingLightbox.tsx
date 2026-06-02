"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { useTranslations } from "next-intl";

export function ListingLightbox({
  title,
  images,
}: {
  title: string;
  images: string[];
}) {
  const t = useTranslations("listingGallery");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  const slides = useMemo(() => images.map((src) => ({ src, alt: title })), [images, title]);
  const remaining = Math.max(0, images.length - 3); // 3 images affichées (1 + 2)

  function openAt(i: number) {
    setIndex(i);
    setOpen(true);
  }

  return (
    <>
      <div className="grid gap-3 lg:grid-cols-12">
        <button
          type="button"
          onClick={() => openAt(0)}
          className="group relative aspect-[16/10] overflow-hidden rounded-3xl bg-zinc-100 lg:col-span-8 cursor-pointer"
          aria-label={t("openPhotos")}
          title={t("openPhotos")}
        >
          {!loaded[images[0]] ? <ImageLoader /> : null}
          <Image
            src={images[0]}
            alt={`${title} — main`}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 66vw"
            priority
            onLoadingComplete={() => setLoaded((p) => ({ ...p, [images[0]]: true }))}
          />
        </button>

        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
          {images.slice(1, 3).map((src, idx) => (
            <button
              key={src}
              type="button"
              onClick={() => openAt(idx + 1)}
              className="group relative aspect-[16/10] overflow-hidden rounded-3xl bg-zinc-100 cursor-pointer"
              aria-label={t("openPhoto", { index: idx + 2 })}
              title={t("openPhoto", { index: idx + 2 })}
            >
              {!loaded[src] ? <ImageLoader /> : null}
              <Image
                src={src}
                alt={`${title} — photo ${idx + 2}`}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 50vw, 33vw"
                onLoadingComplete={() => setLoaded((p) => ({ ...p, [src]: true }))}
              />
              {/* Sur la 3e photo (index 1 de la colonne), affiche +N si on a plus d'images */}
              {idx === 1 && remaining > 0 ? (
                <div className="absolute inset-0 grid place-items-center">
                  <div className="absolute inset-0 bg-black/25" />
                  <div className="relative inline-flex items-center gap-2 rounded-full bg-black/10 px-4 py-2 text-white backdrop-blur-[2px]">
                    <span className="text-lg font-semibold">+{remaining}</span>
                    <ImageIcon className="h-6 w-6" />
                  </div>
                </div>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
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

function ImageLoader() {
  return (
    <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,#f4f4f5,45%,#e4e4e7,55%,#f4f4f5)] bg-[length:200%_100%]" />
  );
}

function ImageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-11Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M9 10.2a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z"
        fill="currentColor"
      />
      <path
        d="M20 15.5l-4.8-4.8a1.2 1.2 0 0 0-1.7 0L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
