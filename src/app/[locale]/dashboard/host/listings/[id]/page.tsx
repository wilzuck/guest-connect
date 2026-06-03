import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { ListingFormClient } from "@/components/admin/forms/ListingFormClient";
import { readDb } from "@/lib/server/db";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const locale = await getLocale();
  const { id } = await params;
  const db = await readDb();

  const found = (db.listings ?? []).find((x) => x.id === id);
  if (!found) return notFound();

  const categories = (db.categories ?? []).map((c) => ({ id: String(c.id), name: String(c.name ?? c.id) }));
  const locations = (db.locations ?? []).map((l) => ({
    id: String(l.id),
    city: String(l.city ?? ""),
    country: String(l.country ?? ""),
  }));
  const services = (db.services ?? []).map((s) => ({
    id: String(s.id),
    name: String(s.name ?? s.id),
    active: Boolean(s.active ?? true),
  }));

  return (
    <ListingFormClient
      locale={locale}
      categories={categories}
      locations={locations}
      services={services}
      redirectTo="/dashboard/host/listings"
      titleLabel="Titre (visible sur la page annonce)"
      initial={{
        id,
        title: String(found.title ?? ""),
        location: String(found.location ?? ""),
        cityId: String(found.cityId ?? ""),
        categoryId: String(found.categoryId ?? ""),
        pricePerNight: Number(found.pricePerNight ?? 0),
        currency: String(found.currency ?? "EUR"),
        rating: Number(found.rating ?? 0),
        reviewCount: Number(found.reviewCount ?? 0),
        imageUrl: String(found.imageUrl ?? ""),
        shortDescription: String(found.shortDescription ?? ""),
        serviceIds: Array.isArray(found.serviceIds) ? (found.serviceIds as string[]) : [],
      }}
    />
  );
}

