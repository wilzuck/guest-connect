"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { UserMenu } from "@/components/nav/UserMenu";
import { MobileMenu } from "@/components/nav/MobileMenu";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export function Navbar() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname() || "";
  const hide = /(^|\/)(login|signup)$/.test(pathname);

  const [visible, setVisible] = useState(true);
  const [elevated, setElevated] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    if (hide) return;
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      const goingDown = delta > 4;
      const goingUp = delta < -4;

      if (y < 8) {
        setVisible(true);
        setElevated(false);
      } else {
        if (goingDown) setVisible(false);
        if (goingUp) setVisible(true);
        setElevated(y > 24);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hide]);

  if (hide) return null;

  const links = [
    { label: t("accommodations"), href: `/${locale}/stays` },
    { label: t("services"), href: `/${locale}/services` },
    { label: t("experiences"), href: `/${locale}/experiences` },
  ];

  return (
    <>
      <header
        className={[
          "fixed left-0 right-0 top-0 z-50 bg-white/80 backdrop-blur transition-transform duration-200 will-change-transform",
          visible ? "translate-y-0" : "-translate-y-full",
          elevated ? "shadow-sm shadow-black/10" : "",
        ].join(" ")}
      >
        <Container className="flex h-16 items-center gap-3">
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
          </nav>
        </div>

        {/* Mobile : bouton recherche plein largeur (Airbnb-like) */}
        <div className="flex flex-1 md:hidden">
          <ButtonLink
            href={`/${locale}/search`}
            variant="outline"
            size="md"
            className="w-full justify-start gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-sm shadow-black/5"
          >
            <SearchIcon className="h-4 w-4" />
            <div className="min-w-0 text-left">
              <p className="truncate text-sm font-semibold text-black">{t("search")}</p>
              <p className="truncate text-xs text-zinc-500">
                {t("searchHint")}
              </p>
            </div>
          </ButtonLink>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <ButtonLink
            href={`/${locale}/host`}
            variant="primary"
            size="sm"
            className="!hidden xl:!inline-flex"
          >
            <HostIcon className="h-4 w-4" />
            {t("becomeHost")}
          </ButtonLink>
          <ButtonLink
            href={`/${locale}/search`}
            variant="outline"
            size="sm"
            className="rounded-full !hidden xl:!inline-flex"
          >
            <SearchIcon className="h-4 w-4" />
            {t("search")}
          </ButtonLink>
          <div className="hidden md:block">
            <UserMenu />
          </div>
          <MobileMenu />
        </div>
      </Container>
      </header>
      {/* Spacer pour compenser le header fixed */}
      <div className="h-16" />
    </>
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
        d="M12 21c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 8v8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8 12h8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
