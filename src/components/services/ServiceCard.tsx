import Image from "next/image";
import Link from "next/link";
import { Camera, Gamepad2, Gift, Leaf, Music, Scissors, Wrench } from "lucide-react";

export type ServiceItem = {
  id: string;
  title: string;
  category: string;
  location: string;
  priceFrom: number;
  currency: "EUR" | "USD" | "XOF";
  rating: number;
  reviewCount: number;
  imageUrl: string;
  description: string;
};

export const serviceCategoryMeta: Record<string, { label: string; icon: typeof Camera }> = {
  photography: { label: "Photographie", icon: Camera },
  tailoring: { label: "Couture", icon: Scissors },
  repair: { label: "Reparation", icon: Wrench },
  play: { label: "Lieux de jeux", icon: Gamepad2 },
  entertainment: { label: "Distraction", icon: Music },
  cleaning: { label: "Menage", icon: Gift },
  hospitality: { label: "Accueil", icon: Gift },
  garden: { label: "Exterieur", icon: Leaf },
};

export function ServiceCard({ locale, service }: { locale: string; service: ServiceItem }) {
  const meta = serviceCategoryMeta[service.category] ?? serviceCategoryMeta.hospitality;
  const Icon = meta.icon;

  return (
    <Link
      href={`/${locale}/services/${service.id}`}
      aria-label={`Voir le service ${service.title}`}
      className="group block overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm shadow-black/5 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/10 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/30 dark:hover:shadow-black/50"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        <Image
          src={service.imageUrl}
          alt={service.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-black shadow-sm shadow-black/10 dark:bg-zinc-950/90 dark:text-white">
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          {meta.label}
        </div>
      </div>

      <div className="p-4">
        <p className="truncate text-sm font-semibold text-black dark:text-white" title={service.title}>
          {service.title}
        </p>
        <p className="mt-1 truncate text-sm text-zinc-600 dark:text-zinc-400">{service.location}</p>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {service.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-black dark:text-white">
            Des {service.priceFrom} {service.currency}
          </p>
          <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
            {service.rating.toFixed(1)} ({service.reviewCount})
          </p>
        </div>
        <p className="mt-4 text-sm font-semibold text-black dark:text-white">Voir le service</p>
      </div>
    </Link>
  );
}
