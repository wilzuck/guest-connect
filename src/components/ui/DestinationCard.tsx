import Image from "next/image";
import Link from "next/link";

type DestinationCardProps = {
  locale: string;
  city: string;
  country: string;
  imageUrl: string;
  exploreLabel: string;
};

export function DestinationCard({
  locale,
  city,
  country,
  imageUrl,
  exploreLabel,
}: DestinationCardProps) {
  return (
    <Link
      href={`/${locale}/stays?destination=${encodeURIComponent(city)}`}
      aria-label={exploreLabel}
      className="group block overflow-hidden transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 dark:focus-visible:ring-white dark:focus-visible:ring-offset-black"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
        <Image
          src={imageUrl}
          alt={`${city}, ${country}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
          className="object-cover transition duration-700 group-hover:scale-[1.05]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-3 text-white">
          <p className="truncate text-sm font-semibold tracking-tight" title={city}>
            {city}
          </p>

          <p className="mt-0.5 truncate text-xs text-white/80" title={country}>
            {country}
          </p>
        </div>
      </div>
    </Link>
  );
}