import { getLocale } from "next-intl/server";
import { ExperienceFormClient } from "@/components/admin/forms/ExperienceFormClient";
import { readDb } from "@/lib/server/db";

export default async function Page() {
  const locale = await getLocale();
  const db = await readDb();

  const locations = (db.locations ?? []).map((l) => ({
    id: String(l.id),
    city: String(l.city ?? ""),
    country: String(l.country ?? ""),
  }));

  return <ExperienceFormClient locale={locale} locations={locations} />;
}

