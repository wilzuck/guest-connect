import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { AccountShell } from "@/components/account/AccountShell";
import { FavoritesClient } from "@/components/account/FavoritesClient";

export const metadata: Metadata = {
  title: "Favoris — GuestConnect",
  description: "Retrouvez vos logements enregistrés.",
};

export default async function Page() {
  const locale = await getLocale();
  const isEn = locale === "en";

  return (
    <AccountShell
      locale={locale}
      title={isEn ? "Favorites" : "Favoris"}
      subtitle={isEn ? "Keep your favorite stays in one place." : "Retrouvez vos hébergements favoris au même endroit."}
    >
      <FavoritesClient />
    </AccountShell>
  );
}
