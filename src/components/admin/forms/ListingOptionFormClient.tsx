"use client";

import { useMemo, useState, useTransition, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

type OptionKind = "propertyTypes" | "countries" | "amenities" | "currencies";

type InitialOption = Record<string, unknown>;

const labels: Record<OptionKind, { singular: string; listPath: string }> = {
  propertyTypes: { singular: "type de propriété", listPath: "property-types" },
  countries: { singular: "pays", listPath: "countries" },
  amenities: { singular: "équipement", listPath: "amenities" },
  currencies: { singular: "devise", listPath: "currencies" },
};

export function ListingOptionFormClient({
  locale,
  kind,
  initial,
}: {
  locale: string;
  kind: OptionKind;
  initial?: InitialOption;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const initialId = asString(initial?.id);
  const isEdit = Boolean(initialId);
  const meta = labels[kind];

  const [name, setName] = useState(asString(initial?.name));
  const [slug, setSlug] = useState(asString(initial?.slug));
  const [icon, setIcon] = useState(asString(initial?.icon));
  const [description, setDescription] = useState(asString(initial?.description));
  const [code, setCode] = useState(asString(initial?.code));
  const [currency, setCurrency] = useState(asString(initial?.currency));
  const [symbol, setSymbol] = useState(asString(initial?.symbol));
  const [minDiscount, setMinDiscount] = useState(String(asNumber(initial?.minDiscount, 0)));
  const [maxDiscount, setMaxDiscount] = useState(String(asNumber(initial?.maxDiscount, 35)));
  const [active, setActive] = useState(asBoolean(initial?.active, true));

  const listHref = `/${locale}/dashboard/service-management/${meta.listPath}`;
  const slugHint = useMemo(() => {
    if (!name) return "Le slug est utilisé pour les filtres et URLs.";
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }, [name]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body: Record<string, unknown> = {
      name: name.trim(),
      active,
    };

    if (kind !== "countries" && kind !== "currencies") {
      body.slug = slug.trim() || slugHint;
      body.icon = icon.trim() || undefined;
      body.description = description.trim() || undefined;
    }

    if (kind === "countries") {
      body.code = code.trim().toUpperCase().slice(0, 2);
      body.currency = currency.trim().toUpperCase().slice(0, 3) || undefined;
    }

    if (kind === "currencies") {
      body.code = code.trim().toUpperCase().slice(0, 3);
      body.symbol = symbol.trim() || undefined;
      body.minDiscount = clampDiscount(Number(minDiscount), 0, 35);
      body.maxDiscount = clampDiscount(Number(maxDiscount), 0, 35);
      if (Number(body.maxDiscount) < Number(body.minDiscount)) {
        body.maxDiscount = body.minDiscount;
      }
    }

    const url = isEdit
      ? `/api/db/${kind}/${encodeURIComponent(initialId)}`
      : `/api/db/${kind}`;
    await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    startTransition(() => router.push(listHref));
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <Card className="p-6 shadow-none">
        <p className="text-sm font-semibold ">
          {isEdit ? "Modifier" : "Créer"} un {meta.singular}
        </p>
        <p className="mt-2 text-sm text-zinc-600">
          Ces valeurs alimentent le formulaire d’ajout de logement et les filtres publics.
        </p>

        <div className="mt-6 grid items-start gap-4 sm:grid-cols-2">
          <Field label="Nom">
            <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Appartement" required />
          </Field>

          {(kind === "countries" || kind === "currencies") ? (
            <Field label={kind === "countries" ? "Code pays" : "Code devise"} hint={kind === "countries" ? "ISO 2 lettres." : "ISO 3 lettres."}>
              <Input
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder={kind === "countries" ? "BJ" : "XOF"}
                maxLength={kind === "countries" ? 2 : 3}
                required
              />
            </Field>
          ) : (
            <Field label="Slug" hint={slugHint}>
              <Input value={slug} onChange={(event) => setSlug(event.target.value)} placeholder="appartement" />
            </Field>
          )}

          {(kind === "propertyTypes" || kind === "amenities") && (
            <>
              <Field label="Icône" hint="Nom lucide-react, ex: Home, Car, Wifi.">
                <Input value={icon} onChange={(event) => setIcon(event.target.value)} placeholder="Home" />
              </Field>
              <Field label="Description">
                <Input value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Description courte" />
              </Field>
            </>
          )}

          {kind === "countries" && (
            <Field label="Devise par défaut" hint="Code devise ISO.">
              <Input value={currency} onChange={(event) => setCurrency(event.target.value)} placeholder="XOF" maxLength={3} />
            </Field>
          )}

          {kind === "currencies" && (
            <>
              <Field label="Symbole">
                <Input value={symbol} onChange={(event) => setSymbol(event.target.value)} placeholder="FCFA" />
              </Field>
              <Field label="Remise minimum (%)" hint="Borne admin. Exemple: 0.">
                <Input type="number" min="0" max="35" value={minDiscount} onChange={(event) => setMinDiscount(event.target.value)} />
              </Field>
              <Field label="Remise maximum (%)" hint="Borne admin. Exemple: 35.">
                <Input type="number" min="0" max="35" value={maxDiscount} onChange={(event) => setMaxDiscount(event.target.value)} />
              </Field>
            </>
          )}
        </div>

        <label className="mt-5 flex items-center gap-3">
          <input
            type="checkbox"
            checked={active}
            onChange={(event) => setActive(event.target.checked)}
            className="h-5 w-5 rounded border border-black/10 accent-black"
          />
          <span className="text-sm font-semibold ">Actif</span>
        </label>

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
            onClick={() => router.push(listHref)}
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-black/10 bg-white px-6 text-sm font-semibold  transition hover:bg-zinc-50"
          >
            Annuler
          </button>
        </div>
      </Card>
    </form>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">{label}</span>
      {children}
      {hint ? <span className="text-xs text-zinc-500 dark:text-zinc-400">{hint}</span> : null}
    </label>
  );
}

function clampDiscount(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function asNumber(value: unknown, fallback: number) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function asBoolean(value: unknown, fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}
