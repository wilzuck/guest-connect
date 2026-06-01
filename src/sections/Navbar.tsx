"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { UserMenu } from "@/components/nav/UserMenu";
import { useLocale, useTranslations } from "next-intl";

export function Navbar() {
  const locale = useLocale();
  const t = useTranslations("nav");

  const links = [
    { label: t("accommodations"), href: `/${locale}/explore` },
    { label: t("destinations"), href: `/${locale}/search` },
    { label: t("experiences"), href: `/${locale}/experiences` },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />

          <nav className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-zinc-600 hover:text-black transition-colors"
              >
                {l.label}
              </Link>
            ))}

            {/* Recherche = bouton avec icône */}
            <ButtonLink
              href={`/${locale}/search`}
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              <SearchIcon className="h-4 w-4" />
              {t("search")}
            </ButtonLink>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ButtonLink
            href={`/${locale}/host`}
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <HostIcon className="h-4 w-4" />
            {t("becomeHost")}
          </ButtonLink>
          <UserMenu />
        </div>
      </Container>
    </header>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M21 21l-4.35-4.35"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HostIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 11.5 12 4l9 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M5 10.5V20h14v-9.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 20v-6.2a2.5 2.5 0 0 1 5 0V20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
