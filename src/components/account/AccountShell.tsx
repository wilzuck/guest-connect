// components/account/AccountShell.tsx
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export function AccountShell({
  locale,
  title,
  subtitle,
  children,
  activeHref,
}: {
  locale: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  activeHref?: string;
}) {
  const items = [
    { href: `/${locale}/dashboard`, label: "Tableau de bord" },
    { href: `/${locale}/profile`, label: "Profil" },
    { href: `/${locale}/reservations`, label: "Réservations" },
    { href: `/${locale}/favorites`, label: "Favoris" },
    { href: `/${locale}/activities`, label: "Activités" },
    { href: `/${locale}/notifications`, label: "Notifications" },
    { href: `/${locale}/settings`, label: "Paramètres" },
  ];

  return (
    <div className="min-h-screen">
      <div className="border-b border-zinc-200">
        <Container className="pt-6 sm:pt-8 lg:pt-10">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-black">
              {title}
            </h1>

            {subtitle && (
              <p className="mt-2 text-xs sm:text-sm text-zinc-600 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>

          {/* Navigation */}
          <nav className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 hide-scroll">
            <div className="flex gap-5 sm:gap-6 lg:gap-8 min-w-max">
              {items.map((item) => {
                const isActive =
                  activeHref === item.href ||
                  (activeHref?.includes("settings") &&
                    item.href.includes("settings"));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "pb-2 sm:pb-3 text-sm whitespace-nowrap transition-colors relative",
                      isActive
                        ? "text-black font-semibold border-b-2 border-black"
                        : "text-zinc-600 hover:text-zinc-900"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </Container>
      </div>

      <div className="bg-zinc-50 min-h-screen">
        <Container className="py-6 sm:py-8 lg:py-10">
          <div className="space-y-6 sm:space-y-8">{children}</div>
        </Container>
      </div>
    </div>
  );
}