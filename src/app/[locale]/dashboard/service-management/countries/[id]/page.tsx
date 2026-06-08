import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { ListingOptionFormClient } from "@/components/admin/forms/ListingOptionFormClient";
import { readDb } from "@/lib/server/db";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const locale = await getLocale();
  const { id } = await params;
  const db = await readDb();
  const found = (db.countries ?? []).find((item) => item.id === id);
  if (!found) notFound();
  return <ListingOptionFormClient locale={locale} kind="countries" initial={found} />;
}
