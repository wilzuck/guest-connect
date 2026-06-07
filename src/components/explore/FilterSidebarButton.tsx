"use client";

import Link from "next/link";
import { Funnel, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/Dialog";

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
  label = "Filtre",
}: {
  sections: FilterSidebarSection[];
  label?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-black/10 bg-white px-4 text-sm font-semibold text-black shadow-sm shadow-black/5 transition hover:bg-zinc-50"
        >
          <Funnel className="h-4 w-4" aria-hidden="true" />
          {label}
        </button>
      </DialogTrigger>

      <DialogContent className="flex w-[calc(100vw-24px)] max-w-md flex-col overflow-hidden bg-white p-0">
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
          <div>
            <p className="text-base font-semibold text-black">{label}</p>
            <p className="mt-1 text-xs text-zinc-500">Affinez les résultats affichés</p>
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

        <div className="grid gap-6 overflow-y-auto px-5 py-5">
          {sections.map((section) => (
            <section key={section.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                {section.title}
              </p>
              <div className="mt-3 grid gap-2">
                {section.options.map((option) => (
                  <DialogClose asChild key={option.href}>
                    <Link
                      href={option.href}
                      className={
                        option.active
                          ? "rounded-2xl border border-black bg-black px-4 py-3 text-white"
                          : "rounded-2xl border border-black/10 bg-white px-4 py-3 text-black transition hover:bg-zinc-50"
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
      </DialogContent>
    </Dialog>
  );
}
