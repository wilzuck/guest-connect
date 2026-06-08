"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export function LocationFormClient({
  locale,
  initial,
}: {
  locale: string;
  initial?: { id?: string; city?: string; country?: string; countryCode?: string };
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const isEdit = Boolean(initial?.id);
  const [city, setCity] = useState(initial?.city ?? "");
  const [country, setCountry] = useState(initial?.country ?? "");
  const [countryCode, setCountryCode] = useState(initial?.countryCode ?? "");

  const hint = useMemo(() => {
    if (!city || !country) return "Ex: Cotonou (BJ), Dakar (SN)…";
    const cc = (countryCode || "").toUpperCase().slice(0, 2);
    return `Aperçu: ${city.trim()} — ${country.trim()}${cc ? ` (${cc})` : ""}`;
  }, [city, country, countryCode]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = {
      city: city.trim(),
      country: country.trim(),
      countryCode: countryCode.trim().toUpperCase().slice(0, 2) || undefined,
    };

    if (isEdit && initial?.id) {
      await fetch(`/api/db/locations/${encodeURIComponent(initial.id)}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch(`/api/db/locations`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    startTransition(() => router.push(`/${locale}/dashboard/service-management/locations`));
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <Card className="p-6 shadow-none">
        <p className="text-sm font-semibold text-black">{isEdit ? "Modifier un lieu" : "Créer un lieu"}</p>
        <p className="mt-2 text-sm text-zinc-600">
          Un “lieu” sert de référence commune aux logements et aux expériences.
        </p>

        <div className="mt-6 grid items-start gap-4 sm:grid-cols-3">
          <label className="grid gap-2 sm:col-span-1">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Ville</span>
            <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Cotonou" required />
          </label>

          <label className="grid gap-2 sm:col-span-1">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Pays</span>
            <Input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Bénin" required />
          </label>

          <label className="grid gap-2 sm:col-span-1">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Code pays</span>
            <Input
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              placeholder="BJ"
              maxLength={2}
            />
            <span className="text-xs text-zinc-500">ISO 2 lettres (optionnel).</span>
          </label>
        </div>

        <p className="mt-4 text-xs text-zinc-500">{hint}</p>

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
            onClick={() => router.push(`/${locale}/dashboard/service-management/locations`)}
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-black/10 bg-white px-6 text-sm font-semibold text-black hover:bg-zinc-50 transition"
          >
            Annuler
          </button>
        </div>
      </Card>
    </form>
  );
}

