import Link from "next/link";
import { getLocale } from "next-intl/server";
import {
  Building2,
  Filter,
  FolderTree,
  MapPin,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";
import { readDb } from "@/lib/server/db";
import { Button, ButtonLink } from "@/components/ui/Button";

export default async function Page() {
  const locale = await getLocale();
  const db = await readDb();

  const stats = [
    { label: "Total logements", value: db.listings?.length ?? 0, delta: "+4.6%" },
    { label: "Catégories", value: db.categories?.length ?? 0, delta: "+12.3%" },
    { label: "Lieux", value: db.locations?.length ?? 0, delta: "+8.9%" },
    { label: "Expériences", value: db.experiences?.length ?? 0, delta: "-1.4%" },
  ];

  const collections = [
    {
      title: "Logements",
      description: "Annonces, prix, photos et disponibilités",
      href: `/${locale}/dashboard/service-management/listings`,
      createHref: `/${locale}/dashboard/service-management/listings/new`,
      icon: Building2,
      count: db.listings?.length ?? 0,
      status: "Actif",
    },
    {
      title: "Catégories",
      description: "Typologies d’hébergements et segments",
      href: `/${locale}/dashboard/service-management/categories`,
      createHref: `/${locale}/dashboard/service-management/categories/new`,
      icon: FolderTree,
      count: db.categories?.length ?? 0,
      status: "Actif",
    },
    {
      title: "Lieux",
      description: "Villes, pays et zones de recherche",
      href: `/${locale}/dashboard/service-management/locations`,
      createHref: `/${locale}/dashboard/service-management/locations/new`,
      icon: MapPin,
      count: db.locations?.length ?? 0,
      status: "Actif",
    },
    {
      title: "Services",
      description: "Équipements et options affichés aux voyageurs",
      href: `/${locale}/dashboard/service-management/services`,
      createHref: `/${locale}/dashboard/service-management/services/new`,
      icon: Sparkles,
      count: db.services?.length ?? 0,
      status: "Actif",
    },
  ];

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[#202024]">Overview</h1>
          <p className="mt-1 text-sm text-[#8E8E93]">
            Gérez les contenus principaux de la marketplace GuestConnect.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="flex h-10 min-w-0 items-center gap-2 rounded-lg border border-[#E8E8EC] bg-white px-3 text-sm text-[#8E8E93] sm:w-72">
            <Search className="h-4 w-4" aria-hidden="true" />
            <input
              placeholder="Rechercher..."
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#B1B1B7]"
            />
          </label>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#E8E8EC] bg-white px-3 text-sm font-medium text-[#73737A]"
          >
            <Filter className="h-4 w-4" aria-hidden="true" />
            Filtrer
          </Button>
          <ButtonLink
            href={`/${locale}/dashboard/service-management/listings/new`}
            variant="primary"
            size="sm"
            className="h-10 rounded-lg"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Ajouter
          </ButtonLink>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-[#E8E8EC] bg-white p-4">
            <p className="text-sm font-medium text-[#5D5D65]">{stat.label}</p>
            <div className="mt-2 flex items-end justify-between gap-3">
              <p className="text-2xl font-semibold tracking-tight text-[#202024]">{stat.value}</p>
              <span
                className={
                  stat.delta.startsWith("-")
                    ? "text-xs font-semibold text-[#F2763D]"
                    : "text-xs font-semibold text-[#37B7A8]"
                }
              >
                {stat.delta}
              </span>
            </div>
            <p className="mt-4 text-xs text-[#8E8E93]">Than last month</p>
          </div>
        ))}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-[#202024]">Active views</h2>
          <Link
            href={`/${locale}/dashboard/service-management/listings`}
            className="rounded-lg border border-[#E8E8EC] px-3 py-2 text-sm font-semibold text-[#202024]"
          >
            View All
          </Link>
        </div>

        <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3">
          {collections.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title} className="rounded-xl border border-[#E8E8EC] bg-white p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-[#F7F7F8] text-[#202024]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-[#202024]">{item.title}</h3>
                      <p className="mt-1 truncate text-sm text-[#8E8E93]">{item.description}</p>
                    </div>
                  </div>
                  <MoreVertical className="h-5 w-5 text-[#8E8E93]" aria-hidden="true" />
                </div>

                <div className="mt-5 grid gap-3 rounded-lg bg-[#FAFAFB] p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#73737A]">Status</span>
                    <span className="rounded-md bg-[#DDF8F3] px-2 py-1 text-xs font-semibold text-[#21A99A]">
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#73737A]">Éléments</span>
                    <span className="rounded-md bg-white px-2 py-1 text-xs font-medium text-[#73737A]">
                      {item.count}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <Link
                    href={item.createHref}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-[#E8E8EC] text-[#6D4AFF]"
                    aria-label="Ajouter"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href={item.href}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-[#E8E8EC] text-[#73737A]"
                    aria-label="Modifier"
                  >
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <button
                    type="button"
                    className="grid h-9 w-9 place-items-center rounded-lg border border-[#E8E8EC] text-[#E04F5F]"
                    aria-label="Supprimer"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
