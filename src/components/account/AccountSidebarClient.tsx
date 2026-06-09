"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export type AccountNavItem = { href: string; label: string; icon: React.ReactNode };

export function AccountSidebarClient({
  title,
  items,
}: {
  title: string;
  items: AccountNavItem[];
}) {
  const pathname = usePathname() || "";

  return (
    <aside className="lg:col-span-3">
      <div className="sticky top-24">
        <div className="rounded-3xl border border-black/10 bg-white p-3 shadow-sm shadow-black/5 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/30">
          <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-white/80">{title}</p>
          <nav className="grid gap-1">
            {items.map((it) => {
              const active = pathname === it.href || pathname.startsWith(it.href + "/");
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition",
                    active
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "text-zinc-700 hover:bg-zinc-50 hover:text-black dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white",
                  )}
                >
                  <span className={cn("grid h-8 w-8 place-items-center rounded-xl", active ? "bg-white/10 dark:bg-black/10" : "bg-zinc-100 dark:bg-zinc-900")}>
                    {it.icon}
                  </span>
                  <span className="truncate">{it.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}

