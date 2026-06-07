"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Activity, BookOpen, ShieldCheck, LifeBuoy } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function DashboardFooter() {
  const locale = useLocale();
  const t = useTranslations("dashboardFooter");

  const links = [
    { label: t("support"), href: `/${locale}/support`, icon: LifeBuoy },
    { label: t("documentation"), href: `/${locale}/components-showcase`, icon: BookOpen },
    { label: t("privacy"), href: `/${locale}/privacy`, icon: ShieldCheck },
    { label: t("terms"), href: `/${locale}/terms`, icon: Activity },
  ];

  return (
    <footer className="border-t border-black/10 bg-white text-black">
      <Container className="py-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold tracking-tight">{t("brand")}</p>
            <p className="mt-1 max-w-2xl text-xs leading-5 text-zinc-500">{t("tagline")}</p>
          </div>

          <nav className="flex flex-wrap items-center gap-2" aria-label={t("brand")}>
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex h-9 items-center gap-2 rounded-full border border-black/10 bg-white px-3 text-xs font-medium text-zinc-600 transition hover:bg-zinc-50 hover:text-black"
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-5 flex flex-col gap-2 border-t border-black/10 pt-4 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} GuestConnect. {t("copyright")}
          </p>
          <p className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
            {t("status")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
