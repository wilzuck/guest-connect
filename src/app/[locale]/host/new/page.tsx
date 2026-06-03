import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { ListingFormClient } from "@/components/admin/forms/ListingFormClient";
import { readDb } from "@/lib/server/db";

export const metadata: Metadata = {
  title: "Ajouter un logement — GuestConnect",
  description: "Créez votre annonce avec photos, tarifs et services.",
};

export default async function Page() {
  const locale = await getLocale();
  const db = await readDb();

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
    <div className="bg-white">
      <section className="bg-white">
        <Container className="py-10 sm:py-14">
          <ListingFormClient
            locale={locale}
            categories={categories}
            locations={locations}
            services={services}
            redirectTo="/host"
            titleLabel="Titre (visible sur la page annonce)"
          />
        </Container>
      </section>
    </div>
  );
}
