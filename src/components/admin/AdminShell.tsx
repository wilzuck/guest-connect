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
    { href: `/${locale}/dashboard/service-management`, label: "Vue d'ensemble", icon: LayoutDashboard, permission: "admin.read" },
    { href: `/${locale}/dashboard/service-management/approvals`, label: "À valider", icon: ClipboardCheck, permission: "admin.read" },
    { href: `/${locale}/dashboard/service-management/listings`, label: "Logements", icon: Building2, permission: "listings.manage" },
    { href: `/${locale}/dashboard/service-management/locations`, label: "Lieux", icon: MapPin, permission: "locations.manage" },
    { href: `/${locale}/dashboard/service-management/services`, label: "Services", icon: BriefcaseBusiness, permission: "services.manage" },
    { href: `/${locale}/dashboard/service-management/reservations`, label: "Réservations", icon: BookOpen, permission: "reservations.read" },
    { href: `/${locale}/dashboard/service-management/messages`, label: "Messages", icon: MessageSquare, permission: "messages.read" },
    { href: `/${locale}/dashboard/service-management/experiences`, label: "Expériences", icon: Sparkles, permission: "experiences.manage" },
  ];

  const accessNav: NavItem[] = [
    { href: `/${locale}/dashboard/service-management/users`, label: "Utilisateurs", icon: Users, permission: "users.manage" },
    { href: `/${locale}/dashboard/service-management/roles`, label: "Rôles", icon: ShieldCheck, permission: "roles.manage" },
    { href: `/${locale}/dashboard/service-management/permissions`, label: "Droits", icon: FileQuestion, permission: "permissions.manage" },
  ];

  const settingsNav: NavItem[] = [
    { href: `/${locale}/dashboard/service-management/property-types`, label: "Types de propriété", icon: Tags, permission: "categories.manage" },
    { href: `/${locale}/dashboard/service-management/countries`, label: "Pays", icon: MapPin, permission: "locations.manage" },
    { href: `/${locale}/dashboard/service-management/amenities`, label: "Équipements", icon: Wrench, permission: "services.manage" },
    { href: `/${locale}/dashboard/service-management/currencies`, label: "Devises", icon: CircleDollarSign, permission: "admin.read" },
    { href: `/${locale}/dashboard/service-management/translations`, label: "Traductions", icon: Languages, permission: "admin.read" },
  ];

  const docsNav: NavItem[] = [
    { href: `/${locale}/support`, label: "Support", icon: LifeBuoy, permission: "docs.read" },
    { href: `/${locale}/dashboard/service-management/docs/usage`, label: "Documentation", icon: BookOpen, permission: "docs.read" },
    { href: `/${locale}/dashboard/service-management/docs/best-practices`, label: "Bonnes pratiques", icon: Sparkles, permission: "docs.read" },
  ];

  const visibleMainNav = filterByPermissions(mainNav, currentUser);
  const visibleSettingsNav = filterByPermissions(settingsNav, currentUser);
  const visibleAccessNav = filterByPermissions(accessNav, currentUser);
  const visibleDocsNav = filterByPermissions(docsNav, currentUser);
  const visibleMobileNav = [...visibleMainNav, ...visibleSettingsNav, ...visibleAccessNav, ...visibleDocsNav];

  return (
    <div className="min-h-dvh w-full border-t border-[#E8E8EC] bg-white">
      <div className="flex min-h-dvh w-full max-w-none ">
        <aside className="hidden w-[256px] shrink-0 border-r border-[#E8E8EC] bg-[#F7F7F8] lg:flex lg:flex-col">
          {/* Brand 
          <div className="flex h-16 items-center justify-between px-4">
            <Link href={`/${locale}/dashboard/service-management`} className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-black text-sm font-bold text-white shadow-sm shadow-black/10">
                G
              </span>
              <span className="text-sm font-semibold text-[#202024]">GuestConnect</span>
            </Link>
            <ChevronDown className="h-4 w-4 text-[#9B9BA1]" aria-hidden="true" />
          </div>
          */}
          <div className="px-3 py-4">
            <label className="flex h-10 items-center gap-2 rounded-lg bg-white px-3 text-sm text-[#8E8E93] shadow-sm shadow-black/[0.03]">
              <Search className="h-4 w-4" aria-hidden="true" />
              <input
                maxLength={250}
                className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#8E8E93]"
                placeholder="Search"
              />
              <span className="text-xs text-[#8E8E93]">Ctrl F</span>
            </label>
          </div>

          <nav className="flex-1 overflow-y-auto px-3">
            <NavGroup title="Main menu" items={visibleMainNav} pathname={pathname} />
            <NavGroup title="Paramétrage logements" items={visibleSettingsNav} pathname={pathname} />
            <NavGroup title="Accès" items={visibleAccessNav} pathname={pathname} />
            <NavGroup title="Support / Documentation" items={visibleDocsNav} pathname={pathname} />
          </nav>

          <div className="m-3 rounded-xl border border-[#E8E8EC] bg-white p-3">
            <p className="text-xs font-semibold text-[#202024]">Admin workspace</p>
            <p className="mt-1 text-xs leading-5 text-[#8E8E93]">
              {currentUser.name} - {ROLE_LABELS[currentUser.role]}
            </p>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#E8E8EC] bg-white/95 px-4 backdrop-blur lg:px-6">
            <p className="text-lg font-semibold tracking-tight text-[#202024]">Dashboard</p>
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
          <div className="border-b border-[#E8E8EC] bg-[#F7F7F8] px-3 py-2 lg:hidden">
            <div className="flex gap-2 overflow-x-auto">
              {visibleMobileNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#73737A]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <main className="min-w-0 flex-1 bg-white px-4 py-4 lg:px-6 lg:py-6">{children}</main>
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
      <p className="px-3 pb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#A4A4AA]">
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
                  ? "bg-white text-[#202024] shadow-sm shadow-black/[0.04]"
                  : "text-[#73737A] hover:bg-white/75 hover:text-[#202024]",
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
