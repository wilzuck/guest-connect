"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils/cn";

export function MobileMenu() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const tm = useTranslations("mobileMenu");

  const links = [
    { label: t("accommodations"), href: `/${locale}/stays` },
    { label: t("destinations"), href: `/${locale}/services` },
    { label: t("experiences"), href: `/${locale}/experiences` },
    { label: t("blog"), href: `/${locale}/blog` },
    { label: t("about"), href: `/${locale}/about` },
    { label: t("search"), href: `/${locale}/search` },
    { label: tm("siteMap"), href: `/${locale}/plan-du-site` },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm shadow-black/5 hover:bg-zinc-50 transition-colors dark:border-white/10 dark:bg-zinc-950 dark:hover:bg-zinc-900 md:hidden"
          aria-label={tm("openMenu")}
        >
          <MenuIcon className="h-5 w-5 text-zinc-700 dark:text-zinc-200" />
        </button>
      </DialogTrigger>

      <DialogContent className="flex flex-col">
        <div className="flex items-center justify-between gap-3">
          <DialogClose asChild>
            <Link href={`/${locale}`} className="inline-flex">
              <Logo />
            </Link>
          </DialogClose>
          <DialogClose asChild>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white hover:bg-zinc-50 transition-colors dark:border-white/10 dark:bg-zinc-950 dark:hover:bg-zinc-900"
              aria-label="Fermer le menu"
            >
              <XIcon className="h-5 w-5 text-zinc-700 dark:text-zinc-200" />
            </button>
          </DialogClose>
        </div>

        <nav className="mt-6 flex flex-col gap-1">
          {links.map((l) => (
            <DialogClose asChild key={l.href}>
              <Link
                href={l.href}
                className="flex items-center justify-between rounded-2xl border border-black/10 bg-white p-5 shadow-sm shadow-black/5 text-base font-medium text-zinc-800 hover:bg-zinc-50 hover:text-black transition dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-white"
              >
                <span>{l.label}</span>
                <ChevronRight className="h-5 w-5 text-zinc-400" />
              </Link>
            </DialogClose>
          ))}
        </nav>

        <div className="mt-6 grid gap-3">
          <DialogClose asChild>
            <ButtonLink href={`/${locale}/search`} variant="primary" size="lg" className="w-full">
              <SearchIcon className="h-4 w-4" />
              {t("search")}
            </ButtonLink>
          </DialogClose>
        </div>

        <div className="mt-6 grid gap-2">
          <p className="px-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            {tm("account")}
          </p>
          <div className="grid gap-2">
            <DialogClose asChild>
              <ButtonLink href={`/${locale}/login`} variant="ghost" size="lg" className="w-full">
                {tm("login")}
              </ButtonLink>
            </DialogClose>
            <DialogClose asChild>
              <ButtonLink href={`/${locale}/signup`} variant="ghost" size="lg" className="w-full">
                {tm("signup")}
              </ButtonLink>
            </DialogClose>
          </div>
        </div>

        <div className="mt-auto pt-6">
          <p className="text-xs text-zinc-500">
            {tm("tagline")}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={cn(className)} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 6 6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
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
