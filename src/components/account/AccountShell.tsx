import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { AccountSidebarClient, type AccountNavItem } from "@/components/account/AccountSidebarClient";

export function AccountShell({
  locale,
  title,
  subtitle,
  children,
}: {
  locale: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const items: AccountNavItem[] = [
    { href: `/${locale}/dashboard`, label: "Tableau de bord", icon: <HomeIcon className="h-4 w-4" /> },
    { href: `/${locale}/profile`, label: "Profil", icon: <UserIcon className="h-4 w-4" /> },
    { href: `/${locale}/reservations`, label: "Réservations", icon: <CalendarIcon className="h-4 w-4" /> },
    { href: `/${locale}/favorites`, label: "Favoris", icon: <HeartIcon className="h-4 w-4" /> },
    { href: `/${locale}/activities`, label: "Activités", icon: <BoltIcon className="h-4 w-4" /> },
    { href: `/${locale}/messages`, label: "Messages", icon: <ChatIcon className="h-4 w-4" /> },
    { href: `/${locale}/notifications`, label: "Notifications", icon: <BellIcon className="h-4 w-4" /> },
    { href: `/${locale}/settings`, label: "Paramètres", icon: <CogIcon className="h-4 w-4" /> },
  ];

  return (
    <div className="bg-zinc-50">
      <Container className="py-10 sm:py-12">
        <div className="grid gap-6 lg:grid-cols-12">
          <AccountSidebarClient title="Espace" items={items} />

          <div className="lg:col-span-9">
            <div className="mb-6">
              <h1 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">{title}</h1>
              {subtitle ? <p className="mt-2 text-sm text-zinc-600">{subtitle}</p> : null}
            </div>
            <div className="rounded-3xl border border-black/10 bg-white p-4 shadow-sm shadow-black/5 sm:p-6">
              {children}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 11.5 12 4l8 7.5V20a2 2 0 0 1-2 2h-4v-6H10v6H6a2 2 0 0 1-2-2v-8.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 3v3M17 3v3M4.5 7.5h15v12a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M4.5 10.5h15" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 14a4 4 0 0 1-4 4H9l-4 3v-3a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M9.5 19a2.5 2.5 0 0 0 5 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CogIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M19.4 15a8.1 8.1 0 0 0 .1-1l2-1.1-2-3.4-2.2.6a7.7 7.7 0 0 0-.8-.6l-.3-2.3H10l-.3 2.3a7.7 7.7 0 0 0-.8.6l-2.2-.6-2 3.4 2 1.1a8.1 8.1 0 0 0 .1 1l-2 1.1 2 3.4 2.2-.6c.26.23.53.43.8.6L10 22h4l.3-2.3c.27-.17.54-.37.8-.6l2.2.6 2-3.4-2-1.1Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
        opacity="0.9"
      />
    </svg>
  );
}

