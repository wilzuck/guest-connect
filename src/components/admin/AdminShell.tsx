"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CircleDollarSign,
  FileQuestion,
  Languages,
  LayoutDashboard,
  LifeBuoy,
  MapPin,
  MessageSquare,
  PanelsTopLeft,
  Plus,
  ClipboardCheck,
  Search,
  ShieldCheck,
  Sparkles,
  Tags,
  Users,
  Wrench,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Text, Heading } from "@/components/ui/Text";
import {
  ROLE_LABELS,
  filterByPermissions,
  getCurrentUserAccess,
  type Permission,
} from "@/lib/auth/access-control";
import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  permission?: Permission;
};

export function AdminShell({
  locale,
  children,
}: {
  locale: string;
  children: ReactNode;
}) {
  const pathname = usePathname() || "";
  const currentUser = getCurrentUserAccess();

  const mainNav: NavItem[] = [
    {
      href: `/${locale}/dashboard/service-management`,
      label: "Vue d'ensemble",
      icon: LayoutDashboard,
      permission: "admin.read",
    },
    {
      href: `/${locale}/dashboard/service-management/approvals`,
      label: "À valider",
      icon: ClipboardCheck,
      permission: "admin.read",
    },
    {
      href: `/${locale}/dashboard/service-management/listings`,
      label: "Logements",
      icon: Building2,
      permission: "listings.manage",
    },
    {
      href: `/${locale}/dashboard/service-management/locations`,
      label: "Lieux",
      icon: MapPin,
      permission: "locations.manage",
    },
    {
      href: `/${locale}/dashboard/service-management/services`,
      label: "Services",
      icon: BriefcaseBusiness,
      permission: "services.manage",
    },
    {
      href: `/${locale}/dashboard/service-management/reservations`,
      label: "Réservations",
      icon: BookOpen,
      permission: "reservations.read",
    },
    {
      href: `/${locale}/dashboard/service-management/experiences`,
      label: "Expériences",
      icon: Sparkles,
      permission: "experiences.manage",
    },
    {
      href: `/${locale}/dashboard/service-management/messages`,
      label: "Messages",
      icon: MessageSquare,
      permission: "messages.read",
    },
  ];

  const accessNav: NavItem[] = [
    {
      href: `/${locale}/dashboard/service-management/users`,
      label: "Utilisateurs",
      icon: Users,
      permission: "users.manage",
    },
    {
      href: `/${locale}/dashboard/service-management/roles`,
      label: "Rôles",
      icon: ShieldCheck,
      permission: "roles.manage",
    },
    {
      href: `/${locale}/dashboard/service-management/permissions`,
      label: "Droits",
      icon: FileQuestion,
      permission: "permissions.manage",
    },
  ];

  const settingsNav: NavItem[] = [
    {
      href: `/${locale}/dashboard/service-management/property-types`,
      label: "Types de propriété",
      icon: Tags,
      permission: "categories.manage",
    },
    {
      href: `/${locale}/dashboard/service-management/countries`,
      label: "Pays",
      icon: MapPin,
      permission: "locations.manage",
    },
    {
      href: `/${locale}/dashboard/service-management/amenities`,
      label: "Équipements",
      icon: Wrench,
      permission: "services.manage",
    },
    {
      href: `/${locale}/dashboard/service-management/currencies`,
      label: "Devises",
      icon: CircleDollarSign,
      permission: "admin.read",
    },
    {
      href: `/${locale}/dashboard/service-management/pages`,
      label: "Pages du site",
      icon: PanelsTopLeft,
      permission: "admin.read",
    },
    {
      href: `/${locale}/dashboard/service-management/translations`,
      label: "Traductions",
      icon: Languages,
      permission: "admin.read",
    },
  ];

  const docsNav: NavItem[] = [
    {
      href: `/${locale}/support`,
      label: "Support",
      icon: LifeBuoy,
      permission: "docs.read",
    },
    {
      href: `/${locale}/dashboard/service-management/docs/usage`,
      label: "Documentation",
      icon: BookOpen,
      permission: "docs.read",
    },
    {
      href: `/${locale}/dashboard/service-management/docs/best-practices`,
      label: "Bonnes pratiques",
      icon: Sparkles,
      permission: "docs.read",
    },
  ];

  const visibleMainNav = filterByPermissions(mainNav, currentUser);
  const visibleSettingsNav = filterByPermissions(settingsNav, currentUser);
  const visibleAccessNav = filterByPermissions(accessNav, currentUser);
  const visibleDocsNav = filterByPermissions(docsNav, currentUser);
  const visibleMobileNav = [
    ...visibleMainNav,
    ...visibleSettingsNav,
    ...visibleAccessNav,
    ...visibleDocsNav,
  ];

  return (
    <div className="h-[calc(100dvh-4rem)] w-full overflow-hidden border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex h-full w-full max-w-none overflow-hidden">
        <aside className="hidden h-full w-[256px] shrink-0 border-r border-zinc-200 bg-zinc-50 lg:flex lg:flex-col dark:border-zinc-800 dark:bg-zinc-900">
          <div className="shrink-0 px-3 py-4">
            <label className="flex h-10 items-center gap-2 rounded-lg border border-transparent bg-white px-3 text-sm text-zinc-500 shadow-sm shadow-black/3 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-400 dark:shadow-none">
              <Search className="h-4 w-4" aria-hidden="true" />

              <input
                maxLength={250}
                className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-zinc-500 dark:placeholder:text-zinc-500"
                placeholder="Search"
              />

              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                Ctrl F
              </span>
            </label>
          </div>

          <nav
            className="
              min-h-0 flex-1 overflow-y-auto px-3
              scrollbar-thin
              scrollbar-track-transparent
              scrollbar-thumb-transparent
              hover:scrollbar-thumb-zinc-400
              dark:scrollbar-thumb-transparent
              dark:hover:scrollbar-thumb-zinc-600
            "
          >
            <NavGroup
              title="Main menu"
              items={visibleMainNav}
              pathname={pathname}
            />

            <NavGroup
              title="Paramétrage logements"
              items={visibleSettingsNav}
              pathname={pathname}
            />

            <NavGroup
              title="Accès"
              items={visibleAccessNav}
              pathname={pathname}
            />

            <NavGroup
              title="Support / Documentation"
              items={visibleDocsNav}
              pathname={pathname}
            />
          </nav>

          <div className="shrink-0 m-3 rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
            <Text as="p" size="xs" weight="semibold">
              Admin workspace
            </Text>

            <Text as="p" tone="subtle" size="xs" className="mt-1 leading-5">
              {currentUser.name} - {ROLE_LABELS[currentUser.role]}
            </Text>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200 bg-white/95 px-4 backdrop-blur lg:px-6 dark:border-zinc-800 dark:bg-zinc-950/95">
            <Heading level={5} as="p" className="text-lg py-4 sm:text-lg">
              Dashboard
            </Heading>
            <div className="flex items-center gap-2">
              <ButtonLink
                href={`/${locale}/dashboard/service-management/listings/new`}
                variant="primary"
                size="sm"
                className="h-10 rounded-lg"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                Ajouter
              </ButtonLink>
            </div>
          </header>
          <div className="border-b border-zinc-200 bg-zinc-50 px-3 py-2 lg:hidden dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex gap-2 overflow-x-auto">
              {visibleMobileNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap rounded-full bg-white px-3 py-2 text-xs font-semibold text-zinc-600 dark:bg-zinc-950 dark:text-zinc-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <main className="min-w-0 overflow-hidden flex-1 bg-white dark:bg-zinc-950">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

function NavGroup({
  title,
  items,
  pathname,
}: {
  title: string;
  items: NavItem[];
  pathname: string;
}) {
  if (items.length === 0) return null;

  return (
    <div className="pb-5">
      <p className="px-3 pb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400 dark:text-zinc-500">
        {title}
      </p>
      <div className="grid gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.href.endsWith("/dashboard/service-management")
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition",
                active
                  ? "bg-white text-zinc-900 shadow-sm shadow-black/4 dark:bg-zinc-800 dark:text-white dark:shadow-none"
                  : "text-zinc-600 hover:bg-white/75 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-white",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
