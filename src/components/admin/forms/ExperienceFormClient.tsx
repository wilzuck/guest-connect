"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type LocationOption = { id: string; city: string; country?: string };

const selectClassName =
  "mt-2 h-11 w-full rounded-2xl border border-black/10 bg-white px-3 text-sm font-semibold text-black shadow-sm shadow-black/5 focus:outline-none focus:ring-4 focus:ring-black/5";

export function ExperienceFormClient({
  locale,
  locations,
  initial,
}: {
  locale: string;
  locations: LocationOption[];
  initial?: {
    id?: string;
    title?: string;
    cityId?: string;
    tag?: string;
    priceFrom?: number;
    currency?: string;
    rating?: number;
    reviewCount?: number;
    imageUrl?: string;
    excerpt?: string;
  };
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const isEdit = Boolean(initial?.id);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [cityId, setCityId] = useState(initial?.cityId ?? (locations[0]?.id ?? ""));
  const [tag, setTag] = useState(initial?.tag ?? "Culture");
  const [priceFrom, setPriceFrom] = useState(String(initial?.priceFrom ?? 25));
  const [currency, setCurrency] = useState(initial?.currency ?? "EUR");
  const [rating, setRating] = useState(String(initial?.rating ?? 4.8));
  const [reviewCount, setReviewCount] = useState(String(initial?.reviewCount ?? 120));
  const [imageUrl, setImageUrl] = useState(
    initial?.imageUrl ??
      "https://images.unsplash.com/photo-1520975958225-517c6f7b45f0?auto=format&fit=crop&w=1600&q=80",
  );
  const [excerpt, setExcerpt] = useState(
    initial?.excerpt ??
      "Une immersion guidée, en petit groupe, pour découvrir les adresses locales et repartir avec des souvenirs concrets.",
  );

  const locationLabel = useMemo(() => {
    const found = locations.find((l) => l.id === cityId);
    if (!found) return "";
    return `${found.city}${found.country ? `, ${found.country}` : ""}`;
  }, [locations, cityId]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = {
      title: title.trim(),
      cityId: cityId || undefined,
      tag: tag.trim() || undefined,
      priceFrom: Number(priceFrom) || 0,
      currency: currency.trim() || "EUR",
      rating: Number(rating) || undefined,
      reviewCount: Number(reviewCount) || undefined,
      imageUrl: imageUrl.trim() || undefined,
      excerpt: excerpt.trim() || undefined,
    };

    if (isEdit && initial?.id) {
      await fetch(`/api/db/experiences/${encodeURIComponent(initial.id)}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch(`/api/db/experiences`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    startTransition(() => router.push(`/${locale}/dashboard/admin/experiences`));
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <Card className="p-6 shadow-none">
        <p className="text-sm font-semibold text-black">
          {isEdit ? "Modifier une expérience" : "Créer une expérience"}
        </p>
        <p className="mt-2 text-sm text-zinc-600">
          Les expériences enrichissent le séjour et améliorent la conversion (notamment sur mobile).
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Titre</span>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Dakar — street food + coucher de soleil" required />
            <span className="text-xs text-zinc-500">Astuce: commencez par la ville, puis la promesse (atelier, visite, etc.).</span>
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Lieu</span>
            <select value={cityId} onChange={(e) => setCityId(e.target.value)} className={selectClassName} required>
              {locations.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.city}
                  {l.country ? `, ${l.country}` : ""}
                </option>
              ))}
            </select>
            <span className="text-xs text-zinc-500">Sélectionné: {locationLabel || "—"}</span>
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Tag</span>
            <Input value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Culture" />
            <span className="text-xs text-zinc-500">Ex: Culture, Nature, Gastronomie…</span>
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Prix à partir de</span>
            <Input type="number" value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)} min={0} step={1} />
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
            <span className="text-xs text-zinc-500">Conseil: Unsplash avec auto=format&fit=crop&w=1600&q=80.</span>
          </label>

          <label className="grid gap-2 sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Description courte</span>
            <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
            <span className="text-xs text-zinc-500">
              1–2 phrases, orientées bénéfice. Exemple: “petit groupe”, “adresses locales”, “accès coupe-file”.
            </span>
          </label>
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
            onClick={() => router.push(`/${locale}/dashboard/admin/experiences`)}
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-black/10 bg-white px-6 text-sm font-semibold text-black hover:bg-zinc-50 transition"
          >
            Annuler
          </button>
        </div>
      </Card>
    </form>
  );
}

