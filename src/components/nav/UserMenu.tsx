"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  ChevronRight,
  CircleUserRound,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  UserRoundCog,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useLocale, useTranslations } from "next-intl";
import {
  filterByPermissions,
  getCurrentUserAccess,
  type Permission,
} from "@/lib/auth/access-control";

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
  const logout: UserMenuItem[] = [{ label: t("logout"), href: `/${locale}/logout`, icon: LogOut }];

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
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm shadow-black/5 hover:bg-zinc-50 transition-colors"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Menu utilisateur"
      >
        <CircleUserRound className="h-5 w-5 text-zinc-700" aria-hidden="true" />
      </button>

      <div
        className={cn(
          "absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-lg shadow-black/10",
          open ? "block" : "hidden",
        )}
        role="menu"
      >
        <div className="p-2">
          <MenuSection title={t("space")} items={visibleSpace} onSelect={() => setOpen(false)} />
          <div className="my-2 h-px bg-black/5" />
          <MenuSection items={logout} onSelect={() => setOpen(false)} />
        </div>
      </div>
    </div>
  );
}

function MenuSection({
  title,
  items,
  onSelect,
}: {
  title?: string;
  items: UserMenuItem[];
  onSelect: () => void;
}) {
  return (
    <div>
      {title ? (
        <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          {title}
        </p>
      ) : null}
      <ul className="mt-1">
        {items.map((i) => {
          const Icon = i.icon;

          return (
          <li key={i.href}>
            <Link
              href={i.href}
              onClick={onSelect}
              className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-black"
              role="menuitem"
            >
              <span className="flex min-w-0 items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-zinc-100 text-zinc-700 transition group-hover:bg-black group-hover:text-white">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="min-w-0 truncate">{i.label}</span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-black" aria-hidden="true" />
            </Link>
          </li>
          );
        })}
      </ul>
    </div>
  );
}

function getMenuLabels(locale: string) {
  const isEn = locale === "en";
  return {
    manageAccount: isEn ? "Manage my account" : "Gérer mon compte",
    manageServices: isEn ? "Manage my services" : "Gérer mes services",
    manageReservations: isEn ? "Manage my reservations" : "Gérer mes réservations",
  };
}

