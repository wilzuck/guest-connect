import type { ReactNode } from "react";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils/cn";

export default async function Layout({ children }: { children: ReactNode }) {
  const locale = await getLocale();

  const nav = [
    { href: `/${locale}/dashboard/host`, label: "Vue d’ensemble" },
    { href: `/${locale}/dashboard/host/listings`, label: "Mes logements" },
  ];

  return (
    <div className="bg-white">
      <section className="border-b border-black/5 bg-white">
        <Container className="py-8 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Espace hôte</p>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            Gestion des annonces
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">
            Ajoutez, mettez à jour et optimisez vos logements. Démo en base JSON (sans authentification).
          </p>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-8 sm:py-10">
          <div className="grid gap-8 lg:grid-cols-12">
            <aside className="lg:col-span-3">
              <nav className="sticky top-24">
                <div className="grid gap-2">
                  {nav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-black hover:bg-zinc-50 transition",
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>
            </aside>

            <div className="lg:col-span-9">{children}</div>
          </div>
        </Container>
      </section>
    </div>
  );
}

