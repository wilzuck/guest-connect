import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { LocationFormClient } from "@/components/admin/forms/LocationFormClient";
import { readDb } from "@/lib/server/db";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const locale = await getLocale();
  const { id } = await params;
  const db = await readDb();
  const found = (db.locations ?? []).find((x) => x.id === id);
  if (!found) return notFound();

  return (
    <LocationFormClient
      locale={locale}
      initial={{
        id,
        city: String(found.city ?? ""),
        country: String(found.country ?? ""),
        countryCode: String(found.countryCode ?? ""),
      }}
    />
  );
}

