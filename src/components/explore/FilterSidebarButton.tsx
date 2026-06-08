"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent } from "react";
import { Funnel, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Select } from "@/components/ui/Select";
import type { FilterControl } from "@/types/filters";

export type FilterSidebarSection = {
  title: string;
  options: Array<{
    href: string;
    label: string;
    active?: boolean;
    description?: string;
  }>;
};

export function FilterSidebarButton({
  sections,
  controls,
  label = "Filtre",
  resetHref,
  actionHref,
}: {
  sections: FilterSidebarSection[];
  controls?: FilterControl[];
  label?: string;
  resetHref?: string;
  actionHref?: string;
}) {
  const router = useRouter();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const query = new URLSearchParams();

    for (const [key, rawValue] of form.entries()) {
      const value = String(rawValue).trim();
      if (!value || value === "all") continue;
      const current = query.get(key);
      query.set(key, current ? `${current},${value}` : value);
    }

    router.push(`${actionHref ?? resetHref ?? ""}${query.toString() ? `?${query}` : ""}`);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-haspopup="dialog"
          aria-label="Ouvrir les filtres"
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-black/10 bg-white px-4 text-sm font-semibold text-black shadow-sm shadow-black/5 transition hover:bg-zinc-50"
        >
          <Funnel className="h-4 w-4" aria-hidden="true" />
          {label}
        </button>
      </DialogTrigger>

      <DialogContent className="flex h-[min(780px,calc(100dvh-24px))] w-[calc(100vw-24px)] max-w-lg flex-col overflow-hidden bg-white p-0">
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <div>
            <p className="text-base font-semibold text-black">{label}</p>
            <p className="mt-1 text-xs text-zinc-500">Prix, capacité, équipements et disponibilités</p>
          </div>
          <DialogClose asChild>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-black shadow-sm shadow-black/5"
              aria-label="Fermer les filtres"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </DialogClose>
        </div>

        <div className="grid flex-1 content-start gap-4 overflow-y-auto bg-zinc-50 px-4 py-4">
          {controls?.length ? (
            <form id="catalog-filter-form" onSubmit={onSubmit} className="grid gap-4">
              {controls.map((control) => (
                <FilterControlField key={`${control.type}-${control.label}`} control={control} />
              ))}
            </form>
          ) : null}

          <div className="grid gap-4">
            {sections.map((section) => (
              <section key={section.title} className="rounded-2xl border border-black/10 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  {section.title}
                </p>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {section.options.map((option) => (
                    <DialogClose asChild key={option.href}>
                      <Link
                        href={option.href}
                        aria-current={option.active ? "page" : undefined}
                        className={
                          option.active
                            ? "rounded-xl border border-black bg-black px-4 py-3 text-white"
                            : "rounded-xl border border-black/10 bg-white px-4 py-3 text-black transition hover:bg-zinc-50"
                        }
                      >
                        <span className="block text-sm font-semibold">{option.label}</span>
                        {option.description ? (
                          <span className={option.active ? "mt-1 block text-xs text-white/65" : "mt-1 block text-xs text-zinc-500"}>
                            {option.description}
                          </span>
                        ) : null}
                      </Link>
                    </DialogClose>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-black/10 bg-white px-5 py-4">
          {resetHref ? (
            <DialogClose asChild>
              <Link href={resetHref} className="text-sm font-semibold text-zinc-600 hover:text-black">
                Réinitialiser
              </Link>
            </DialogClose>
          ) : (
            <span />
          )}
          <DialogClose asChild>
            <button
              type={controls?.length ? "submit" : "button"}
              form={controls?.length ? "catalog-filter-form" : undefined}
              className="rounded-2xl bg-black px-5 py-3 text-sm font-semibold text-white"
            >
              Voir les résultats
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FilterControlField({ control }: { control: FilterControl }) {
  if (control.type === "select") {
    return (
      <section className="rounded-2xl border border-black/10 bg-white p-4">
        <label className="grid gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{control.label}</span>
          <Select
            name={control.name}
            defaultValue={control.value}
            options={[{ value: "all", label: "Tous" }, ...control.options]}
          />
        </label>
      </section>
    );
  }

  if (control.type === "range") {
    const minValue = Number(control.minValue ?? control.min);
    const maxValue = Number(control.maxValue ?? control.max);

    return (
      <section className="rounded-2xl border border-black/10 bg-white p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{control.label}</p>
        <div className="mt-4 grid gap-4">
          <label className="grid gap-2">
            <span className="flex justify-between text-xs font-medium text-zinc-600">
              Min <strong className="text-black">{minValue}{control.suffix}</strong>
            </span>
            <input
              type="range"
              name={control.minName}
              min={control.min}
              max={control.max}
              step={control.step ?? 1}
              defaultValue={minValue}
              className="accent-black"
            />
          </label>
          {control.maxName !== control.minName ? (
            <label className="grid gap-2">
              <span className="flex justify-between text-xs font-medium text-zinc-600">
                Max <strong className="text-black">{maxValue}{control.suffix}</strong>
              </span>
              <input
                type="range"
                name={control.maxName}
                min={control.min}
                max={control.max}
                step={control.step ?? 1}
                defaultValue={maxValue}
                className="accent-black"
              />
            </label>
          ) : null}
        </div>
      </section>
    );
  }

  const selected = new Set((control.value ?? "").split(",").filter(Boolean));

  return (
    <section className="rounded-2xl border border-black/10 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{control.label}</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {control.options.map((option) => (
          <label
            key={option.value}
            className="flex min-h-11 items-center gap-3 rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-black"
          >
            <input
              type="checkbox"
              name={control.name}
              value={option.value}
              defaultChecked={selected.has(option.value)}
              className="h-4 w-4 rounded border-black/20 accent-black"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
