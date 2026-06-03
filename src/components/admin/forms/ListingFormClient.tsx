"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Badge } from "@/components/ui/Badge";

type Option = { id: string; name: string };
type LocationOption = { id: string; city: string; country?: string };

const selectClassName =
  "mt-2 h-11 w-full rounded-2xl border border-black/10 bg-white px-3 text-sm font-semibold text-black shadow-sm shadow-black/5 focus:outline-none focus:ring-4 focus:ring-black/5";

export function ListingFormClient({
  locale,
  categories,
  locations,
  services,
  redirectTo,
  initial,
  titleLabel,
}: {
  locale: string;
  categories: Option[];
  locations: LocationOption[];
  services: Array<Option & { active?: boolean }>;
  redirectTo: string; // chemin relatif à /[locale]
  titleLabel?: string;
  initial?: {
    id?: string;
    title?: string;
    location?: string;
    cityId?: string;
    categoryId?: string;
    pricePerNight?: number;
    currency?: string;
    rating?: number;
    reviewCount?: number;
    imageUrl?: string;
    shortDescription?: string;
    serviceIds?: string[];
  };
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const isEdit = Boolean(initial?.id);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [cityId, setCityId] = useState(initial?.cityId ?? (locations[0]?.id ?? ""));
  const [categoryId, setCategoryId] = useState(initial?.categoryId ?? (categories[0]?.id ?? ""));
  const [pricePerNight, setPricePerNight] = useState(String(initial?.pricePerNight ?? 55));
  const [currency, setCurrency] = useState(initial?.currency ?? "EUR");
  const [rating, setRating] = useState(String(initial?.rating ?? 4.9));
  const [reviewCount, setReviewCount] = useState(String(initial?.reviewCount ?? 120));
  const [imageUrl, setImageUrl] = useState(
    initial?.imageUrl ??
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
  );
  const [shortDescription, setShortDescription] = useState(
    initial?.shortDescription ??
      "Calme, lumineux, accueil chaleureux. Une adresse vérifiée, pensée pour le confort au quotidien.",
  );
  const [serviceIds, setServiceIds] = useState<string[]>(initial?.serviceIds ?? []);

  const cityLabel = useMemo(() => {
    const found = locations.find((l) => l.id === cityId);
    if (!found) return "";
    return `${found.city}${found.country ? `, ${found.country}` : ""}`;
  }, [locations, cityId]);

  const categoryLabel = useMemo(() => categories.find((c) => c.id === categoryId)?.name ?? "", [categories, categoryId]);

  const activeServices = useMemo(() => services.filter((s) => s.active !== false), [services]);

  function toggleService(id: string) {
    setServiceIds((curr) => (curr.includes(id) ? curr.filter((x) => x !== id) : [...curr, id]));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const normalizedLocation = location.trim() || cityLabel || undefined;

    const body = {
      title: title.trim(),
      location: normalizedLocation,
      cityId: cityId || undefined,
      categoryId: categoryId || undefined,
      pricePerNight: Number(pricePerNight) || 0,
      currency: currency.trim() || "EUR",
      rating: Number(rating) || undefined,
      reviewCount: Number(reviewCount) || undefined,
      imageUrl: imageUrl.trim() || undefined,
      shortDescription: shortDescription.trim() || undefined,
      serviceIds: serviceIds.length ? serviceIds : [],
    };

    if (isEdit && initial?.id) {
      await fetch(`/api/db/listings/${encodeURIComponent(initial.id)}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch(`/api/db/listings`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    startTransition(() => router.push(`/${locale}${redirectTo}`));
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <Card className="p-6 shadow-none">
        <p className="text-sm font-semibold text-black">
          {isEdit ? "Modifier un logement" : "Créer un logement"}
        </p>
        <p className="mt-2 text-sm text-zinc-600">
          Donnez l’essentiel: un titre clair, une photo premium, et une description courte orientée bénéfice.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
              {titleLabel ?? "Titre"}
            </span>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Villa avec piscine et rooftop"
              required
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Ville (référence)</span>
            <select value={cityId} onChange={(e) => setCityId(e.target.value)} className={selectClassName}>
              {locations.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.city}
                  {l.country ? `, ${l.country}` : ""}
                </option>
              ))}
            </select>
            <span className="text-xs text-zinc-500">Sélectionné: {cityLabel || "—"}</span>
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Catégorie</span>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={selectClassName}>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <span className="text-xs text-zinc-500">Choisie: {categoryLabel || "—"}</span>
          </label>

          <label className="grid gap-2 sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Localisation affichée</span>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Cotonou, Bénin"
            />
            <span className="text-xs text-zinc-500">
              Optionnel: si vide, on reprend la ville sélectionnée.
            </span>
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Prix / nuit</span>
            <Input type="number" value={pricePerNight} onChange={(e) => setPricePerNight(e.target.value)} min={0} step={1} />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Devise</span>
            <Input value={currency} onChange={(e) => setCurrency(e.target.value)} placeholder="EUR" />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Note</span>
            <Input type="number" value={rating} onChange={(e) => setRating(e.target.value)} min={0} max={5} step={0.01} />
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Avis</span>
            <Input type="number" value={reviewCount} onChange={(e) => setReviewCount(e.target.value)} min={0} step={1} />
          </label>

          <label className="grid gap-2 sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Image (URL)</span>
            <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://images.unsplash.com/..." />
            <span className="text-xs text-zinc-500">Idéal: une photo lumineuse, cadrage large, peu d’objets.</span>
          </label>

          <label className="grid gap-2 sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Pitch</span>
            <Textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} />
            <span className="text-xs text-zinc-500">1–2 phrases, confort + bénéfice (wifi, calme, proche centre…).</span>
          </label>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Services inclus</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {activeServices.length ? (
              activeServices.map((s) => {
                const checked = serviceIds.includes(s.id);
                return (
                  <label
                    key={s.id}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 hover:bg-zinc-50 transition"
                  >
                    <span className="text-sm font-semibold text-black">{s.name}</span>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleService(s.id)}
                      className="h-5 w-5 rounded border border-black/10 accent-black"
                      aria-label={s.name}
                    />
                  </label>
                );
              })
            ) : (
              <p className="text-sm text-zinc-600">Aucun service actif en base.</p>
            )}
          </div>

          {serviceIds.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {serviceIds.map((id) => (
                <Badge key={id}>{services.find((s) => s.id === id)?.name ?? id}</Badge>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-zinc-600">Aucun service sélectionné.</p>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-black px-6 text-sm font-semibold text-white transition disabled:opacity-50"
          >
            {isEdit ? "Enregistrer" : "Créer"}
          </button>
          <button
            type="button"
            onClick={() => router.push(`/${locale}${redirectTo}`)}
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-black/10 bg-white px-6 text-sm font-semibold text-black hover:bg-zinc-50 transition"
          >
            Annuler
          </button>
        </div>
      </Card>
    </form>
  );
}

