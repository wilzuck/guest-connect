import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { ExperienceFormClient } from "@/components/admin/forms/ExperienceFormClient";
import { readDb } from "@/lib/server/db";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const locale = await getLocale();
  const { id } = await params;
  const db = await readDb();
  const found = (db.experiences ?? []).find((x) => x.id === id);
  if (!found) return notFound();

  const locations = (db.locations ?? []).map((l) => ({
    id: String(l.id),
    city: String(l.city ?? ""),
    country: String(l.country ?? ""),
  }));

  return (
    <ExperienceFormClient
      locale={locale}
      locations={locations}
      initial={{
        id,
        title: String(found.title ?? ""),
        cityId: String(found.cityId ?? ""),
        tag: String(found.tag ?? ""),
        priceFrom: Number(found.priceFrom ?? 0),
        currency: String(found.currency ?? "EUR"),
        rating: Number(found.rating ?? 0),
        reviewCount: Number(found.reviewCount ?? 0),
        imageUrl: String(found.imageUrl ?? ""),
        excerpt: String(found.excerpt ?? ""),
      }}
    />
  );
}

