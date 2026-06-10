"use client";

import Link from "next/link";
import { forwardRef, type ComponentType, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  BedDouble,
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  CreditCard,
  Compass,
  HelpCircle,
  Home,
  Languages,
  LayoutDashboard,
  LogOut,
  type LucideIcon,
  Menu,
  MessageCircle,
  Moon,
  Search,
  Sparkles,
  UserRoundCog,
  WalletCards,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Logo } from "@/components/Logo";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { ThemeSwitcher } from "@/components/theme/ThemeSwitcher";
import { CurrencySwitcher } from "@/components/currency/CurrencySwitcher";
import {
  filterByPermissions,
  getCurrentUserAccess,
  type Permission,
} from "@/lib/auth/access-control";

type NavItem = { label: string; href: string; icon: LucideIcon };
type SpaceItem = NavItem & { permission?: Permission };

export function MobileMenu() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const tm = useTranslations("mobileMenu");
  const currentUser = getCurrentUserAccess();

  const navLinks: NavItem[] = [
    { label: t("home"), href: `/${locale}`, icon: Home },
    { label: t("accommodations"), href: `/${locale}/stays`, icon: BedDouble },
    { label: t("services"), href: `/${locale}/services`, icon: BriefcaseBusiness },
    { label: t("experiences"), href: `/${locale}/experiences`, icon: Sparkles },
    { label: t("pricing"), href: `/${locale}/pricing`, icon: CreditCard },
    { label: tm("siteMap"), href: `/${locale}/plan-du-site`, icon: Compass },
  ];

  const spaceLinks = filterByPermissions<SpaceItem>(
    [
      { label: tm("messages"), href: `/${locale}/messages`, icon: MessageCircle, permission: "messages.read" },
      { label: tm("manageAccount"), href: `/${locale}/dashboard`, icon: UserRoundCog },
      { label: tm("manageServices"), href: `/${locale}/dashboard/service-management`, icon: LayoutDashboard, permission: "admin.read" },
      { label: tm("manageReservations"), href: `/${locale}/reservations`, icon: CalendarDays, permission: "reservations.read" },
      { label: tm("subscription"), href: `/${locale}/pricing`, icon: CreditCard },
      { label: tm("helpCenter"), href: `/${locale}/support`, icon: HelpCircle },
    ],
    currentUser,
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900 dark:focus-visible:ring-white/30 md:hidden"
          aria-label={tm("openMenu")}
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
      </DialogTrigger>

      <DialogContent
        className="flex h-dvh w-screen max-w-none flex-col gap-0 border-0 bg-white p-0 shadow-none dark:bg-zinc-950"
        aria-label={tm("openMenu")}
      >
        {/* Sticky header */}
        <header className="sticky top-0 z-10 flex items-center justify-between gap-3 bg-white/90 px-5 py-4 backdrop-blur supports-backdrop-filter:bg-white/70 dark:bg-zinc-950/90 dark:supports-backdrop-filter:bg-zinc-950/70">
          <DialogClose asChild>
            <Link href={`/${locale}`} className="inline-flex rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/30">
              <Logo />
            </Link>
          </DialogClose>

          <DialogClose asChild>
            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white dark:focus-visible:ring-white/30"
              aria-label={tm("closeMenu")}
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </DialogClose>
        </header>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-1">
          {/* Search */}
          <DialogClose asChild>
            <Link
              href={`/${locale}/search`}
              className="group flex items-center gap-3 rounded-2xl bg-zinc-100 px-4 py-3.5 text-left text-black transition-colors hover:bg-zinc-200/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 dark:focus-visible:ring-white/30"
            >
              <Search className="size-5 shrink-0 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{t("search")}</span>
                <span className="block truncate text-xs text-zinc-500 dark:text-zinc-400">{t("searchHint")}</span>
              </span>
              <ChevronRight className="size-4 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5 dark:text-zinc-500" aria-hidden="true" />
            </Link>
          </DialogClose>

          {/* Navigation */}
          <Section title={tm("navSection")}>
            {navLinks.map((link) => (
              <DialogClose asChild key={link.href}>
                <MenuRow href={link.href} icon={link.icon} label={link.label} />
              </DialogClose>
            ))}
          </Section>

          {/* User space */}
          {spaceLinks.length > 0 ? (
            <Section title={tm("spaceSection")}>
              <div className="mb-1 flex items-center gap-3 px-3 py-2 bg-black/5 rounded-xl">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-black text-xs font-semibold text-white dark:bg-white dark:text-black">
                  {getInitials(currentUser.name)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-black dark:text-white">{currentUser.name}</span>
                  <span className="block truncate text-xs text-zinc-500 dark:text-zinc-400">{tm("memberSince")}</span>
                </span>
              </div>
              {spaceLinks.map((link) => (
                <DialogClose asChild key={link.href + link.label}>
                  <MenuRow href={link.href} icon={link.icon} label={link.label} />
                </DialogClose>
              ))}
            </Section>
          ) : null}

          {/* Preferences */}
          <Section title={tm("preferencesSection")}>
            <PreferenceRow icon={Languages} label={tm("language")}>
              <LocaleSwitcher className="border-0 bg-transparent p-0 shadow-none dark:bg-transparent dark:shadow-none" />
            </PreferenceRow>
            <PreferenceRow icon={Moon} label={tm("theme")}>
              <ThemeSwitcher className="border-0 bg-transparent p-0 shadow-none dark:bg-transparent dark:shadow-none" />
            </PreferenceRow>
            <PreferenceRow icon={WalletCards} label={tm("currency")}>
              <CurrencySwitcher className="border-0 bg-transparent p-0 shadow-none dark:bg-transparent dark:shadow-none" />
            </PreferenceRow>
          </Section>

          {/* Logout */}
          <div className="mt-6 border-t border-black/5 pt-4 dark:border-white/10">
            <DialogClose asChild>
              <Link
                href={`/${locale}/logout`}
                className="flex min-h-12 items-center gap-3 rounded-2xl px-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/30 dark:text-red-400 dark:hover:bg-red-950/40"
              >
                <LogOut className="size-5 shrink-0" aria-hidden="true" />
                <span className="min-w-0 truncate">{tm("logout")}</span>
              </Link>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
        {title}
      </h2>
      <div className="flex flex-col">{children}</div>
    </section>
  );
}

const MenuRow = forwardRef<
  HTMLAnchorElement,
  { href: string; icon: LucideIcon; label: string }
>(function MenuRow({ href, icon: Icon, label }, ref) {
  return (
    <Link
      ref={ref}
      href={href}
      className="group flex min-h-12 items-center gap-3 rounded-2xl px-3 text-black transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:text-white dark:hover:bg-zinc-900 dark:focus-visible:ring-white/30"
    >
      <Icon className="size-5 shrink-0 text-zinc-500 transition-colors group-hover:text-black dark:text-zinc-400 dark:group-hover:text-white" aria-hidden="true" />
      <span className="min-w-0 flex-1 truncate text-sm font-medium">{label}</span>
      <ChevronRight className="size-4 shrink-0 text-zinc-300 transition-transform group-hover:translate-x-0.5 dark:text-zinc-600" aria-hidden="true" />
    </Link>
  );
});

function PreferenceRow({
  icon: Icon,
  label,
  children,
}: {
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-12 items-center gap-3 rounded-2xl px-3">
      <Icon className="size-5 shrink-0 text-zinc-500 dark:text-zinc-400" aria-hidden={true} />
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-black dark:text-white">{label}</span>
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
