"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

export function ListingLightbox({
  title,
  images,
}: {
  title: string;
  images: string[];
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = useMemo(() => images.map((src) => ({ src, alt: title })), [images, title]);

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
          className="group relative aspect-[16/10] overflow-hidden rounded-3xl bg-zinc-100 lg:col-span-8"
          aria-label="Open photos"
        >
          <Image
            src={images[0]}
            alt={`${title} — main`}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 66vw"
            priority
          />
        </button>

        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
          {images.slice(1, 3).map((src, idx) => (
            <button
              key={src}
              type="button"
              onClick={() => openAt(idx + 1)}
              className="group relative aspect-[16/10] overflow-hidden rounded-3xl bg-zinc-100"
              aria-label={`Open photo ${idx + 2}`}
            >
              <Image
                src={src}
                alt={`${title} — photo ${idx + 2}`}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
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
        animation={{ fade: 180, swipe: 220 }}
        styles={{ container: { backgroundColor: "rgba(0,0,0,0.92)" } }}
      />
    </>
  );
}

