import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { ServiceFormClient } from "@/components/admin/forms/ServiceFormClient";
import { readDb } from "@/lib/server/db";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const locale = await getLocale();
  const { id } = await params;
  const db = await readDb();
  const found = (db.services ?? []).find((x) => x.id === id);
  if (!found) return notFound();

  return (
    <ServiceFormClient
      locale={locale}
      initial={{
        id,
        name: String(found.name ?? ""),
        slug: String(found.slug ?? ""),
        active: Boolean(found.active ?? true),
      }}
    />
  );
}

