import Link from "next/link";
import { SearchX } from "lucide-react";

export function CatalogEmptyState({
  title,
  description,
  resetHref,
  resetLabel = "Réinitialiser les filtres",
}: {
  title: string;
  description: string;
  resetHref: string;
  resetLabel?: string;
}) {
  return (
    <div className="mt-8 rounded-2xl border border-dashed border-black/15 bg-zinc-50 px-5 py-10 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-zinc-500 shadow-sm shadow-black/5">
        <SearchX className="h-5 w-5" aria-hidden="true" />
      </div>
      <h2 className="mt-4 text-lg font-semibold ">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-600">{description}</p>
      <Link
        href={resetHref}
        className="mt-5 inline-flex h-11 items-center rounded-full bg-black px-5 text-sm font-semibold text-white"
      >
        {resetLabel}
      </Link>
    </div>
  );
}
