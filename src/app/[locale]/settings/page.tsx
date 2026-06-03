import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Settings — GuestConnect",
  description: "Account settings.",
};

export default async function Page() {
  const locale = await getLocale();
  const isEn = locale === "en";

  return (
    <div className="bg-white">
      <section className="border-b border-black/5 bg-white">
        <Container className="py-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {isEn ? "Settings" : "Paramètres"}
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-black sm:text-5xl">
            {isEn ? "Account preferences" : "Préférences du compte"}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
            {isEn
              ? "Control notifications and security options. This is a UI placeholder ready for backend integration."
              : "Gérez les notifications et options de sécurité. UI placeholder prête à être connectée au backend."}
          </p>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-14">
          <div className="grid gap-4 lg:grid-cols-12">
            <Card className="p-6 shadow-none lg:col-span-6">
              <p className="text-sm font-semibold text-black">{isEn ? "Notifications" : "Notifications"}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {isEn ? "Email updates, booking reminders and product news." : "Emails, rappels de réservation et nouveautés."}
              </p>
              <div className="mt-5 grid gap-2 text-sm text-zinc-700">
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4" defaultChecked />
                  {isEn ? "Booking reminders" : "Rappels de réservation"}
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4" defaultChecked />
                  {isEn ? "Price alerts" : "Alertes de prix"}
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4" />
                  {isEn ? "Product updates" : "Nouveautés produit"}
                </label>
              </div>
            </Card>

            <Card className="p-6 shadow-none lg:col-span-6">
              <p className="text-sm font-semibold text-black">{isEn ? "Security" : "Sécurité"}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                {isEn ? "Password and session preferences." : "Mot de passe et préférences de session."}
              </p>
              <div className="mt-5 grid gap-2">
                <button className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-zinc-50 transition">
                  {isEn ? "Change password" : "Changer le mot de passe"}
                </button>
                <button className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-zinc-50 transition">
                  {isEn ? "Manage sessions" : "Gérer les sessions"}
                </button>
              </div>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  );
}

