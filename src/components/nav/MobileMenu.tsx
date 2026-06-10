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
  CalendarDays,
  ChevronRight,
  CircleUserRound,
  Compass,
  CreditCard,
  HelpCircle,
  Home,
  Kanban,
  Languages,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Moon,
  Search,
  Sparkles,
  UserRoundCog,
  WalletCards,
  X,
} from "lucide-react";
import {
  filterByPermissions,
  getCurrentUserAccess,
  type Permission,
} from "@/lib/auth/access-control";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { CurrencySwitcher } from "@/components/currency/CurrencySwitcher";
import { forwardRef, type ReactNode } from "react";

type SpaceLink = {
  label: string;
  href: string;
  icon: typeof MessageCircle;
  permission?: Permission;
};

export function MobileMenu() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const tm = useTranslations("mobileMenu");
  const currentUser = getCurrentUserAccess();
  const labels = getMobileSpaceLabels(locale);

  const links = [
    { label: t("accommodations"), href: `/${locale}/stays`, icon: Home },
    { label: t("services"), href: `/${locale}/services`, icon: BriefcaseBusiness },
    { label: t("experiences"), href: `/${locale}/experiences`, icon: Sparkles },
    { label: t("pricing"), href: `/${locale}/pricing`, icon: CreditCard },
    { label: tm("siteMap"), href: `/${locale}/plan-du-site`, icon: Compass },
  ];
  const spaceLinks = filterByPermissions<SpaceLink>(
    [
      { label: labels.messages, href: `/${locale}/messages`, icon: MessageCircle, permission: "messages.read" },
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
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900 dark:focus-visible:ring-white/20 md:hidden"
          aria-label={tm("openMenu")}
        >
          <Kanban className="h-5 w-5 rotate-90" aria-hidden="true" />
        </button>
      </DialogTrigger>

      <DialogContent className="flex w-[calc(100vw-32px)] max-w-[360px] flex-col overflow-hidden bg-white p-0 dark:bg-zinc-950">
        <div className="flex items-center justify-between border-b border-black/5 px-4 py-4 dark:border-zinc-800">
          <DialogClose asChild>
            <Link href={`/${locale}`} className="inline-flex">
              <Logo />
            </Link>
          </DialogClose>

          <DialogClose asChild>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-sm shadow-black/5 transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:shadow-black/30 dark:hover:bg-zinc-800 dark:focus-visible:ring-white/20"
              aria-label={tm("closeMenu")}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </DialogClose>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden px-3 py-3">
          <DialogClose asChild>
            <Link
              href={`/${locale}/search`}
              className="inline-flex w-full items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-3 text-left text-black shadow-sm shadow-black/5 transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:shadow-black/30 dark:hover:bg-zinc-800 dark:focus-visible:ring-white/20"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-zinc-100 text-black dark:bg-zinc-950 dark:text-white">
                  <Search className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="block truncate text-sm font-semibold">{t("search")}</span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
            </Link>
          </DialogClose>

          <nav className="mt-3 grid gap-2" aria-label={tm("openMenu")}>
            {links.map((l) => {
              const Icon = l.icon;
              return (
                <DialogClose asChild key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex min-h-14 items-center gap-3 rounded-2xl border border-black/5 bg-white px-3 py-2 text-left shadow-sm shadow-black/[0.03] transition hover:border-black/10 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/30 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-zinc-100 text-black transition group-hover:bg-black group-hover:text-white dark:bg-zinc-900 dark:text-white dark:group-hover:bg-white dark:group-hover:text-black">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-black dark:text-white">{l.label}</span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-black dark:group-hover:text-white" aria-hidden="true" />
                  </Link>
                </DialogClose>
              );
            })}
          </nav>

          <div className="mt-3 rounded-2xl border border-black/10 bg-zinc-50 p-2.5 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3 px-1 pb-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-black text-xs font-semibold text-white dark:bg-white dark:text-black">
                {getInitials(currentUser.name)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-black dark:text-white">{currentUser.name}</p>
                <p className="mt-0.5 truncate text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {labels.memberSince}
                </p>
              </div>
            </div>

            <div className="grid gap-1">
              {spaceLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <DialogClose asChild key={item.href}>
                    <MobileAccountLink href={item.href} icon={<Icon className="h-4 w-4" />} label={item.label} />
                  </DialogClose>
                );
              })}

              <div className="my-1 h-px bg-black/10 dark:bg-white/10" />

              <DialogClose asChild>
                <MobileAccountLink href={`/${locale}/pricing`} icon={<CreditCard className="h-4 w-4" />} label={labels.subscription} />
              </DialogClose>
              <DialogClose asChild>
                <MobileAccountLink href={`/${locale}/support`} icon={<HelpCircle className="h-4 w-4" />} label={labels.helpCenter} />
              </DialogClose>
              <MobileAccountControl icon={<Languages className="h-4 w-4" />} label={labels.language}>
                <LocaleSwitcher className="shadow-none" />
              </MobileAccountControl>
              <MobileAccountControl icon={<Moon className="h-4 w-4" />} label={labels.theme}>
                <ThemeSwitcher className="shadow-none" />
              </MobileAccountControl>
              <MobileAccountControl icon={<WalletCards className="h-4 w-4" />} label={labels.currency}>
                <CurrencySwitcher className="shadow-none" />
              </MobileAccountControl>

              <div className="my-1 h-px bg-black/10 dark:bg-white/10" />

              <DialogClose asChild>
                <MobileAccountLink href={`/${locale}/logout`} icon={<LogOut className="h-4 w-4" />} label={labels.logout} />
              </DialogClose>
            </div>
          </div>

          <div className="mt-auto" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

const MobileAccountLink = forwardRef<
  HTMLAnchorElement,
  { href: string; icon: ReactNode; label: string }
>(function MobileAccountLink({ href, icon, label }, ref) {
  return (
    <Link
      ref={ref}
      href={href}
      className="flex min-h-10 items-center gap-3 rounded-xl px-2.5 py-2 text-sm font-semibold text-black transition hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-800"
    >
      <span className="text-zinc-500 dark:text-zinc-400">{icon}</span>
      <span className="min-w-0 truncate">{label}</span>
    </Link>
  );
});

function MobileAccountControl({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="grid gap-2 rounded-xl px-2.5 py-2 text-sm font-semibold text-black dark:text-white">
      <span className="flex min-w-0 items-center gap-3">
        <span className="text-zinc-500 dark:text-zinc-400">{icon}</span>
        <span className="min-w-0 truncate">{label}</span>
      </span>
      <span>{children}</span>
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function getMobileSpaceLabels(locale: string) {
  const isEn = locale === "en";
  return {
    subscription: isEn ? "My subscription" : "Mon abonnement",
    helpCenter: isEn ? "Help center" : "Centre d'aide",
    messages: isEn ? "Messages" : "Messages",
    manageAccount: isEn ? "Manage my account" : "Gerer mon compte",
    manageServices: isEn ? "Manage my services" : "Gerer mes services",
    manageReservations: isEn ? "Manage my reservations" : "Gerer mes reservations",
    logout: isEn ? "Log out" : "Deconnexion",
    language: isEn ? "Change language" : "Changer de langue",
    theme: isEn ? "Change theme" : "Changer de theme",
    currency: isEn ? "Change currency" : "Changer de devise",
    memberSince: isEn ? "Member since one month" : "Membre depuis un mois",
  };
}
