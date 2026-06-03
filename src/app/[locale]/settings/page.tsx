import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Settings — GuestConnect",
  description: "Account settings.",
};

export default async function Page() {
  const locale = await getLocale();
  const isEn = locale === "en";

  const user = {
    name: "Eteka Wilfried",
    email: "etekawilfried@gmail.com",
    provider: "Google",
  };

  return (
    <div className="bg-white">
      <Container className="py-10 sm:py-14">
        <h1 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
          {isEn ? "Settings" : "Paramètres"}
        </h1>
        <p className="mt-2 text-sm text-zinc-600">
          {isEn ? "View your account information." : "Consultez et gérez votre compte."}
        </p>

        <div className="mt-10 grid gap-10">
          {/* User info */}
          <Section title={isEn ? "User info" : "Infos utilisateur"}>
            <Card className="overflow-hidden border border-black/10 bg-white p-0 shadow-none">
              <Row
                title={isEn ? "Avatar" : "Avatar"}
                subtitle={isEn ? "JPG, PNG, or GIF (max 2 MB)" : "JPG, PNG ou GIF (max 2 Mo)"}
                right={
                  <div
                    className="h-10 w-10 overflow-hidden rounded-xl border border-black/10 bg-zinc-100"
                    aria-hidden="true"
                  />
                }
              />
              <Divider />
              <Row title={isEn ? "Name" : "Nom"} subtitle={isEn ? "Your profile name" : "Votre nom de profil"} right={user.name} />
              <Divider />
              <Row title={user.provider} subtitle={isEn ? "Your login method" : "Votre méthode de connexion"} right={user.email} />
            </Card>
          </Section>

          {/* Notifications */}
          <Section title={isEn ? "Notifications" : "Notifications"}>
            <Card className="border border-black/10 bg-white p-6 shadow-none">
              <p className="text-sm text-zinc-600">
                {isEn ? "Email updates, booking reminders and product news." : "Emails, rappels de réservation et nouveautés."}
              </p>
              <div className="mt-6 grid gap-3 text-sm">
                <Toggle defaultChecked label={isEn ? "Booking reminders" : "Rappels de réservation"} />
                <Toggle defaultChecked label={isEn ? "Price alerts" : "Alertes de prix"} />
                <Toggle label={isEn ? "Product updates" : "Nouveautés produit"} />
              </div>
            </Card>
          </Section>

          {/* Security */}
          <Section title={isEn ? "Security" : "Sécurité"}>
            <Card className="border border-black/10 bg-white p-6 shadow-none">
              <p className="text-sm text-zinc-600">
                {isEn ? "Password and session preferences." : "Mot de passe et préférences de session."}
              </p>
              <div className="mt-6 grid gap-2 sm:max-w-md">
                <button className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-zinc-50 transition">
                  {isEn ? "Change password" : "Changer le mot de passe"}
                </button>
                <button className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-zinc-50 transition">
                  {isEn ? "Manage sessions" : "Gérer les sessions"}
                </button>
              </div>
            </Card>
          </Section>

          {/* Account access */}
          <Section title={isEn ? "Account access" : "Accès au compte"}>
            <Card className="border border-black/10 bg-white p-6 shadow-none">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-black">{isEn ? "Log out current account" : "Déconnecter le compte actuel"}</p>
                  <p className="mt-1 text-sm text-zinc-600">{isEn ? "End your current session." : "Terminer votre session actuelle."}</p>
                </div>
                <Link
                  href={`/${locale}/logout`}
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-black px-5 text-sm font-semibold text-white transition"
                >
                  {isEn ? "Log out" : "Déconnexion"}
                </Link>
              </div>
            </Card>
          </Section>

          {/* Danger zone */}
          <Section title={isEn ? "Danger zone" : "Zone sensible"}>
            <Card className="border border-black/10 bg-white p-6 shadow-none">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-black">{isEn ? "Delete account" : "Supprimer le compte"}</p>
                  <p className="mt-1 text-sm text-zinc-600">
                    {isEn ? "Permanently delete your account." : "Supprimer définitivement votre compte."}
                  </p>
                </div>
                <button className="inline-flex h-11 items-center justify-center rounded-2xl bg-red-600 px-5 text-sm font-semibold text-white hover:bg-red-700 transition">
                  {isEn ? "Delete" : "Supprimer"}
                </button>
              </div>
            </Card>
          </Section>
        </div>
      </Container>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <p className="text-sm font-semibold text-black">{title}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Divider() {
  return <div className="h-px bg-black/10" />;
}

function Row({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle: string;
  right: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-black">{title}</p>
        <p className="mt-1 text-xs text-zinc-600">{subtitle}</p>
      </div>
      <div className="shrink-0 text-sm font-semibold text-zinc-900">{right}</div>
    </div>
  );
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white px-4 py-3">
      <span className="text-sm text-zinc-900">{label}</span>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="h-5 w-9 appearance-none rounded-full bg-zinc-200 ring-1 ring-black/10 transition relative
          before:absolute before:left-0.5 before:top-0.5 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition
          checked:bg-black checked:before:translate-x-4"
      />
    </label>
  );
}
