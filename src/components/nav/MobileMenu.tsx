"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Logo } from "@/components/Logo";
import {
  BriefcaseBusiness,
  ChevronRight,
  CircleUserRound,
  Compass,
  CalendarDays,
  Home,
  Kanban,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  UserRoundCog,
  X,
} from "lucide-react";
import {
  filterByPermissions,
  getCurrentUserAccess,
  type Permission,
} from "@/lib/auth/access-control";

type SpaceLink = {
  label: string;
  href: string;
  icon: typeof MessageCircle;
  permission?: Permission;
};

export function MobileMenu() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const tu = useTranslations("userMenu");
  const tm = useTranslations("mobileMenu");
  const currentUser = getCurrentUserAccess();
  const labels = getMobileSpaceLabels(locale);

  const links = [
    {
      label: t("accommodations"),
      href: `/${locale}/stays`,
      icon: Home,
      desc: tm("staysDesc"),
    },
    {
      label: t("services"),
      href: `/${locale}/services`,
      icon: BriefcaseBusiness,
      desc: tm("servicesDesc"),
    },
    {
      label: t("experiences"),
      href: `/${locale}/experiences`,
      icon: Sparkles,
      desc: tm("experiencesDesc"),
    },
    {
      label: tm("siteMap"),
      href: `/${locale}/plan-du-site`,
      icon: Compass,
      desc: tm("siteMapDesc"),
    },
  ];
  const spaceLinks = filterByPermissions<SpaceLink>(
    [
      { label: tu("messages"), href: `/${locale}/messages`, icon: MessageCircle, permission: "messages.read" },
      { label: labels.manageAccount, href: `/${locale}/dashboard`, icon: UserRoundCog },
      {
        label: labels.manageServices,
        href: `/${locale}/dashboard/service-management`,
        icon: LayoutDashboard,
        permission: "admin.read",
      },
      {
        label: labels.manageReservations,
        href: `/${locale}/reservations`,
        icon: CalendarDays,
        permission: "reservations.read",
      },
    ],
    currentUser,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 md:hidden"
          aria-label={tm("openMenu")}
        >
          <Kanban className="h-5 w-5 rotate-90" aria-hidden="true" />
        </button>
      </DialogTrigger>

      <DialogContent className="flex w-[calc(100vw-32px)] max-w-[360px] flex-col overflow-hidden bg-white p-0">
        <div className="flex items-center justify-between border-b border-black/5 px-4 py-4">
          <DialogClose asChild>
            <Link href={`/${locale}`} className="inline-flex">
              <Logo />
            </Link>
          </DialogClose>

          <DialogClose asChild>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-sm shadow-black/5 transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
              aria-label="Fermer le menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </DialogClose>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden px-3 py-3">
          <DialogClose asChild>
            <Link
              href={`/${locale}/search`}
              className="inline-flex w-full items-center justify-between rounded-2xl bg-black px-4 py-3 text-left text-white shadow-xl shadow-black/15 transition hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-black">
                  <Search className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">{t("search")}</span>
                  <span className="block truncate text-xs font-medium text-white/70">
                    {t("searchHint")}
                  </span>
                </span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-white/70" aria-hidden="true" />
            </Link>
          </DialogClose>

          <nav className="mt-3 grid gap-2" aria-label={tm("openMenu")}>
            {links.map((l) => {
              const Icon = l.icon;

              return (
                <DialogClose asChild key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex min-h-14 items-center gap-3 rounded-2xl border border-black/5 bg-white px-3 py-2 text-left shadow-sm shadow-black/[0.03] transition hover:border-black/10 hover:bg-zinc-50"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-zinc-100 text-black transition group-hover:bg-black group-hover:text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-black">
                        {l.label}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-zinc-500">
                        {l.desc}
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-black" aria-hidden="true" />
                  </Link>
                </DialogClose>
              );
            })}
          </nav>

          <div className="mt-3 rounded-2xl border border-black/10 bg-zinc-50 p-2.5">
            <div className="flex items-center gap-3 px-1 pb-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-black shadow-sm shadow-black/5">
                <CircleUserRound className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-black">{tm("account")}</p>
                <p className="truncate text-xs text-zinc-500">{tm("tagline")}</p>
              </div>
            </div>

            <div className="grid gap-2">
              {spaceLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <DialogClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="flex min-h-11 items-center gap-3 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm shadow-black/5 transition hover:bg-zinc-100"
                    >
                      <Icon className="h-4 w-4 text-zinc-500" aria-hidden="true" />
                      <span className="min-w-0 truncate">{item.label}</span>
                    </Link>
                  </DialogClose>
                );
              })}
            </div>

            <div className="my-2 h-px bg-black/10" />

            <DialogClose asChild>
              <Link
                href={`/${locale}/logout`}
                className="flex min-h-11 items-center gap-3 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm shadow-black/5 transition hover:bg-zinc-100"
              >
                <LogOut className="h-4 w-4 text-zinc-500" aria-hidden="true" />
                <span>{tu("logout")}</span>
              </Link>
            </DialogClose>
          </div>

          <div className="mt-auto flex min-w-0 items-center gap-2 pt-3 text-xs font-medium text-zinc-500">
            <ShieldCheck className="h-4 w-4 text-black" aria-hidden="true" />
            <span className="truncate">{tm("tagline")}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function getMobileSpaceLabels(locale: string) {
  const isEn = locale === "en";
  return {
    manageAccount: isEn ? "Manage my account" : "Gérer mon compte",
    manageServices: isEn ? "Manage my services" : "Gérer mes services",
    manageReservations: isEn ? "Manage my reservations" : "Gérer mes réservations",
  };
}
