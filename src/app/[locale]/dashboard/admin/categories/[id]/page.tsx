import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { CategoryFormClient } from "@/components/admin/forms/CategoryFormClient";
import { readDb } from "@/lib/server/db";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const locale = await getLocale();
  const { id } = await params;
  const db = await readDb();
  const found = (db.categories ?? []).find((x) => x.id === id);
  if (!found) return notFound();

  return (
    <CategoryFormClient
      locale={locale}
      initial={{
        id,
        name: String(found.name ?? ""),
        slug: String(found.slug ?? ""),
      }}
    />
  );
}

