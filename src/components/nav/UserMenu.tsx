"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  CalendarDays,
  ChevronRight,
  CircleUserRound,
  CreditCard,
  HelpCircle,
  Languages,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Moon,
  UserRoundCog,
  WalletCards,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useLocale, useTranslations } from "next-intl";
import {
  filterByPermissions,
  getCurrentUserAccess,
  type Permission,
} from "@/lib/auth/access-control";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { CurrencySwitcher } from "@/components/currency/CurrencySwitcher";

type UserMenuItem = {
  label: string;
  href: string;
  icon: typeof MessageCircle;
  permission?: Permission;
};

export function UserMenu() {
  const locale = useLocale();
  const t = useTranslations("userMenu");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const currentUser = getCurrentUserAccess();
  const labels = getMenuLabels(locale);
  const space: UserMenuItem[] = [
    { label: t("messages"), href: `/${locale}/messages`, icon: MessageCircle, permission: "messages.read" },
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
  ];
  const visibleSpace = filterByPermissions(space, currentUser);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const root = rootRef.current;
      if (!root) return;
      if (e.target instanceof Node && root.contains(e.target)) return;
      setOpen(false);
    }

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm shadow-black/5 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/30 dark:hover:bg-zinc-900"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("aria")}
      >
        <CircleUserRound className="h-5 w-5 text-zinc-700 dark:text-zinc-200" aria-hidden="true" />
      </button>

      <div
        className={cn(
          "absolute right-0 mt-2 w-80 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-lg shadow-black/10 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/50",
          open ? "block" : "hidden",
        )}
        role="menu"
      >
        <div className="border-b border-black/10 p-4 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-black text-sm font-semibold text-white dark:bg-white dark:text-black">
              {getInitials(currentUser.name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-black dark:text-white">{currentUser.name}</p>
              <p className="mt-0.5 truncate text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {labels.memberSince}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-1 p-2">
          <MenuSection items={visibleSpace} onSelect={() => setOpen(false)} />

          <div className="my-1 h-px bg-black/5 dark:bg-white/10" />

          <MenuLink
            href={`/${locale}/pricing`}
            icon={<CreditCard className="h-4 w-4" />}
            label={labels.subscription}
            onSelect={() => setOpen(false)}
          />
          <MenuLink
            href={`/${locale}/support`}
            icon={<HelpCircle className="h-4 w-4" />}
            label={labels.helpCenter}
            onSelect={() => setOpen(false)}
          />

          <div className="my-1 h-px bg-black/5 dark:bg-white/10" />

          <MenuControl icon={<Languages className="h-4 w-4" />} label={labels.language}>
            <LocaleSwitcher className="shadow-none" />
          </MenuControl>
          <MenuControl icon={<Moon className="h-4 w-4" />} label={labels.theme}>
            <ThemeSwitcher className="shadow-none" />
          </MenuControl>
          <MenuControl icon={<WalletCards className="h-4 w-4" />} label={labels.currency}>
            <CurrencySwitcher className="shadow-none" />
          </MenuControl>

          <div className="my-1 h-px bg-black/5 dark:bg-white/10" />

          <MenuLink
            href={`/${locale}/logout`}
            icon={<LogOut className="h-4 w-4" />}
            label={t("logout")}
            onSelect={() => setOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

function MenuSection({ items, onSelect }: { items: UserMenuItem[]; onSelect: () => void }) {
  return (
    <ul className="grid gap-1">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.href}>
            <MenuLink
              href={item.href}
              icon={<Icon className="h-4 w-4" />}
              label={item.label}
              onSelect={onSelect}
            />
          </li>
        );
      })}
    </ul>
  );
}

function MenuLink({
  href,
  icon,
  label,
  onSelect,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  onSelect: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onSelect}
      className="group flex items-center justify-between gap-3 rounded-xl px-2.5 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-black dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white"
      role="menuitem"
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="grid h-7 w-7 shrink-0 place-items-center text-zinc-500 transition group-hover:text-black dark:text-zinc-400 dark:group-hover:text-white">
          {icon}
        </span>
        <span className="min-w-0 truncate">{label}</span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-black dark:group-hover:text-white" aria-hidden="true" />
    </Link>
  );
}

function MenuControl({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl px-2.5 py-2">
      <span className="flex min-w-0 items-center gap-3">
        <span className="grid h-7 w-7 shrink-0 place-items-center text-zinc-500 dark:text-zinc-400">
          {icon}
        </span>
        <span className="min-w-0 truncate text-sm font-semibold text-zinc-700 dark:text-zinc-300">{label}</span>
      </span>
      <span className="shrink-0">{children}</span>
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

function getMenuLabels(locale: string) {
  const isEn = locale === "en";
  return {
    subscription: isEn ? "My subscription" : "Mon abonnement",
    helpCenter: isEn ? "Help center" : "Centre d'aide",
    manageAccount: isEn ? "Manage my account" : "Gerer mon compte",
    manageServices: isEn ? "Manage my services" : "Gerer mes services",
    manageReservations: isEn ? "Manage my reservations" : "Gerer mes reservations",
    language: isEn ? "Change language" : "Changer de langue",
    theme: isEn ? "Change theme" : "Changer de theme",
    currency: isEn ? "Change currency" : "Changer de devise",
    memberSince: isEn ? "Member since one month" : "Membre depuis un mois",
  };
}
