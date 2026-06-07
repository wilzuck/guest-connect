import Link from "next/link";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Plan du site — GuestConnect",
  description: "Accès rapide à toutes les pages fonctionnelles du projet.",
};

export default async function Page() {
  const locale = await getLocale();

  const groups: Array<{
    title: string;
    icon: "discover" | "trust" | "account" | "backoffice" | "flow" | "legal";
    items: Array<{ label: string; href: string; desc?: string }>;
  }> = [
    {
      title: "Découvrir",
      icon: "discover",
      items: [
        { label: "Accueil", href: `/${locale}` },
        { label: "Hébergements", href: `/${locale}/stays` },
        { label: "Recherche", href: `/${locale}/search` },
        { label: "Destinations populaires", href: `/${locale}/services` },
        { label: "Expériences", href: `/${locale}/experiences` },
        { label: "Tarifs", href: `/${locale}/pricing` },
      ],
    },
    {
      title: "Contenu & confiance",
      icon: "trust",
      items: [
        { label: "Notre histoire", href: `/${locale}/about` },
        { label: "Blog", href: `/${locale}/blog` },
        { label: "Sécurité", href: `/${locale}/safety` },
        { label: "Centre d’aide", href: `/${locale}/support` },
        { label: "Contact", href: `/${locale}/contact` },
      ],
    },
    {
      title: "Espace utilisateur",
      icon: "account",
      items: [
        { label: "Dashboard", href: `/${locale}/dashboard` },
        { label: "Profil", href: `/${locale}/profile` },
        { label: "Favoris", href: `/${locale}/favorites` },
        { label: "Réservations", href: `/${locale}/reservations` },
        { label: "Activités", href: `/${locale}/activities` },
        { label: "Messages", href: `/${locale}/messages` },
        { label: "Notifications", href: `/${locale}/notifications` },
        { label: "Paramètres", href: `/${locale}/settings` },
      ],
    },
    {
      title: "Back-office (démo)",
      icon: "backoffice",
      items: [
        { label: "Espace hôte", href: `/${locale}/dashboard/host`, desc: "CRUD logements (démo JSON)" },
        { label: "Back-office admin", href: `/${locale}/dashboard/admin`, desc: "CRUD complet (démo JSON)" },
      ],
    },
    {
      title: "Flux (démo)",
      icon: "flow",
      items: [
        { label: "Checkout", href: `/${locale}/checkout` },
        { label: "Confirmation", href: `/${locale}/checkout/success` },
      ],
    },
    {
      title: "Légal",
      icon: "legal",
      items: [
        { label: "Conditions", href: `/${locale}/terms` },
        { label: "Confidentialité", href: `/${locale}/privacy` },
        { label: "Cookies", href: `/${locale}/cookies` },
      ],
    },
  ];

  return (
    <div className="bg-white">
      <section className="border-b border-black/5 bg-white">
        <Container className="py-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Navigation</p>
          <h1 className="mt-4 text-balance text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-blackt text-black">Plan du site</h1>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
            Accédez rapidement à toutes les pages fonctionnelles (public, compte, back-office, checkout).
          </p>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-14">
          <div className="grid gap-4 lg:grid-cols-12">
            {groups.map((g) => (
              <Card key={g.title} className="p-6 shadow-none lg:col-span-6">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-base font-bold tracking-tight text-zinc-500 sm:text-lg">{g.title}</p>
                  <div className="shrink-0 text-zinc-400">
                    <SectionIcon name={g.icon} className="h-6 w-6" />
                  </div>
                </div>
                <ul className="mt-4 grid gap-2">
                  {g.items.map((i) => (
                    <li key={i.href} className="flex items-start justify-between gap-4">
                      <Link href={i.href} className="text-sm font-semibold text-black hover:underline">
                        {i.label}
                      </Link>
                      {i.desc ? <span className="text-xs text-zinc-500">{i.desc}</span> : null}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

function SectionIcon({ name, className }: { name: string; className?: string }) {
  if (name === "discover") return <CompassIcon className={className} />;
  if (name === "trust") return <ShieldIcon className={className} />;
  if (name === "account") return <UserIcon className={className} />;
  if (name === "backoffice") return <GridIcon className={className} />;
  if (name === "flow") return <CreditCardIcon className={className} />;
  return <DocIcon className={className} />;
}

function CompassIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="m14.8 9.2-2 5.6-5.6 2 2-5.6 5.6-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 12l2.8-2.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3 20 7v6c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V7l8-4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="m9.5 12 1.7 1.7L15.5 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M4 20a8 8 0 0 1 16 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function CreditCardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.5 7.5h17v9a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-9Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 9.5h17" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 15.5h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function DocIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3h7l3 3v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 3v4h4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8 12h8M8 16h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
