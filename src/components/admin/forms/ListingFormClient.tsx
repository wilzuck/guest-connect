"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

type Option = { id: string; name: string };
type LocationOption = { id: string; city: string; country?: string };

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
  const [rating] = useState(String(initial?.rating ?? 4.9));
  const [reviewCount] = useState(String(initial?.reviewCount ?? 120));
  const [imageUrl, setImageUrl] = useState(
    initial?.imageUrl ??
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
  );
  const [shortDescription, setShortDescription] = useState(
    initial?.shortDescription ??
      "Calme, lumineux, accueil chaleureux. Une adresse vérifiée, pensée pour le confort au quotidien.",
  );
  const [serviceIds, setServiceIds] = useState<string[]>(initial?.serviceIds ?? []);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

  const cityLabel = useMemo(() => {
    const found = locations.find((l) => l.id === cityId);
    if (!found) return "";
    return `${found.city}${found.country ? `, ${found.country}` : ""}`;
  }, [locations, cityId]);

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
  <div >
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 gap-8 lg:grid-cols-3"
    >
      {/* LEFT - MAIN CONTENT */}
      <div className="lg:col-span-2 space-y-6">
        {/* HEADER */}
        <div>

          <h1 className="mt-2 text-xl font-semibold text-black">
            {title || titleLabel || "Décrivez votre logement"}
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Un titre clair et une bonne description augmentent les réservations.
          </p>
        </div>

        {/* TITLE + DESCRIPTION */}

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-zinc-400">
              Titre
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2"
              placeholder="Belle villa avec vue sur l'océan"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-zinc-400">
              Description
            </label>

            <Textarea
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="mt-2 min-h-[220px] rounded-2xl border-black/10 text-sm leading-relaxed"
              placeholder="Racontez l'histoire de votre logement..."
            />

            <p className="mt-2 text-xs text-zinc-400">
              Écrivez comme une page d&apos;accueil, pas comme une fiche technique.
            </p>
          </div>


        {/* IMAGE */}
          <label className="text-xs uppercase tracking-[0.2em] text-zinc-400">
            Image URL
          </label>

          <Input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-2"
            placeholder="https://images.unsplash.com/..."
          />

          <p className="mt-2 text-xs text-zinc-400">
            Utilisez une image lumineuse, grand angle et de haute qualité.
          </p>

      </div>

      {/* RIGHT - CONTROL PANEL */}
      <div className="space-y-4">

        {/* ACTIONS */}
        <Card className="p-4 rounded-3xl border border-black/5 sticky top-6 space-y-2">
          <button
            type="submit"
            disabled={pending}
            className="w-full h-11 rounded-2xl bg-black text-white font-semibold"
          >
            {isEdit ? "Enregistrer les modifications" : "Publier l’annonce"}
          </button>

          <button
            type="button"
            onClick={() => router.push(`/${locale}${redirectTo}`)}
            className="w-full h-11 rounded-2xl border border-black/10"
          >
            Annuler
          </button>
        </Card>

        {/* LOCATION */}
        <Card className="p-4 rounded-3xl border border-black/5 space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
            Localisation
          </p>

          <Select
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
            className="mt-2 rounded-2xl font-semibold"
            options={locations.map((l) => ({ value: l.id, label: l.city }))}
          />

          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Quartier"
          />

          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Adresse complète"
          />
        </Card>

        {/* AVAILABILITY (DATES) */}
        <Card className="p-4 rounded-3xl border border-black/5 space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
            Disponibilité
          </p>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-zinc-400">Début</p>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <p className="text-xs text-zinc-400">Fin</p>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <p className="text-xs text-zinc-400">
            Définissez les périodes de disponibilité de votre logement.
          </p>
        </Card>

        {/* PROPERTY TYPE + PRICE */}
        <Card className="p-4 rounded-3xl border border-black/5 space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
            Type de propriété & Tarif
          </p>

          <Select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="rounded-2xl font-semibold"
            options={categories.map((c) => ({ value: c.id, label: c.name }))}
          />

          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              value={pricePerNight}
              onChange={(e) => setPricePerNight(e.target.value)}
              placeholder="Tarif"
            />

            <Input
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              placeholder="Devise"
            />
          </div>
        </Card>

        {/* SERVICES */}
        <Card className="p-4 rounded-3xl border border-black/5">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
            Équipements
          </p>

          <div className="mt-3 space-y-2">
            {activeServices.map((s) => (
              <label
                key={s.id}
                className="flex items-center justify-between rounded-2xl border border-black/5 px-4 py-3 hover:bg-zinc-50"
              >
                <span className="text-sm">{s.name}</span>
                <input
                  type="checkbox"
                  checked={serviceIds.includes(s.id)}
                  onChange={() => toggleService(s.id)}
                />
              </label>
            ))}
          </div>
        </Card>

      </div>
    </form>
  </div>
);
}

