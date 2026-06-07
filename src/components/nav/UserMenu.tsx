"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";
import { useLocale, useTranslations } from "next-intl";
import {
  filterByPermissions,
  getCurrentUserAccess,
  type Permission,
} from "@/lib/auth/access-control";

type UserMenuItem = { label: string; href: string; permission?: Permission };

export function UserMenu() {
  const locale = useLocale();
  const t = useTranslations("userMenu");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const currentUser = getCurrentUserAccess();

  const primary: UserMenuItem[] = [
    { label: t("login"), href: `/${locale}/login` },
    { label: t("signup"), href: `/${locale}/signup` },
  ];

  const account: UserMenuItem[] = [
    { label: t("dashboard"), href: `/${locale}/dashboard`, permission: "dashboard.read" },
    { label: "Administration", href: `/${locale}/dashboard/admin`, permission: "admin.read" },
    { label: "Gestion de mes services", href: `/${locale}/dashboard/admin/services`, permission: "services.manage" },
    { label: t("profile"), href: `/${locale}/profile` },
    { label: t("reservations"), href: `/${locale}/reservations`, permission: "reservations.read" },
    { label: t("favorites"), href: `/${locale}/favorites`, permission: "favorites.read" },
    { label: t("activities"), href: `/${locale}/activities` },
    { label: t("messages"), href: `/${locale}/messages`, permission: "messages.read" },
    { label: t("notifications"), href: `/${locale}/notifications` },
    { label: t("settings"), href: `/${locale}/settings` },
    { label: t("logout"), href: `/${locale}/logout` },
  ];

  const visibleAccount = filterByPermissions(account, currentUser);

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
        <UserIcon className="h-5 w-5 text-zinc-700" />
      </button>

      <div
        className={cn(
          "absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-lg shadow-black/10",
          open ? "block" : "hidden",
        )}
        role="menu"
      >
        <div className="p-2">
          <MenuSection title={t("account")} items={primary} onSelect={() => setOpen(false)} />
          <div className="my-2 h-px bg-black/5" />
          <MenuSection title={t("space")} items={visibleAccount} onSelect={() => setOpen(false)} />
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
  title: string;
  items: UserMenuItem[];
  onSelect: () => void;
}) {
  return (
    <div>
      <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
        {title}
      </p>
      <ul className="mt-1">
        {items.map((i) => (
          <li key={i.href}>
            <Link
              href={i.href}
              onClick={onSelect}
              className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-black transition-colors"
              role="menuitem"
            >
              <span>{i.label}</span>
              <ChevronRight className="h-4 w-4 text-zinc-400" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 21a8 8 0 0 0-16 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m10 17 5-5-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
