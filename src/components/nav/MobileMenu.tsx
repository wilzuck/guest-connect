"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";

export function MobileMenu() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const tm = useTranslations("mobileMenu");

  const links = [
    { label: t("accommodations"), href: `/${locale}/stays` },
    { label: t("destinations"), href: `/${locale}/services` },
    { label: t("experiences"), href: `/${locale}/experiences` },
    { label: t("search"), href: `/${locale}/search` },
    { label: tm("siteMap"), href: `/${locale}/plan-du-site` },
    
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition md:hidden"
          aria-label={tm("openMenu")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-700"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </DialogTrigger>

      <DialogContent className="flex flex-col gap-4 bg-white p-4">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <DialogClose asChild>
            <Link href={`/${locale}`} className="inline-flex">
              <Logo />
            </Link>
          </DialogClose>

          <DialogClose asChild>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition"
              aria-label="Fermer le menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-700"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </DialogClose>
        </div>

        {/* NAV */}
        <nav className="flex flex-col gap-2 mt-2">
          {links.map((l) => (
            <DialogClose asChild key={l.href}>
              <Link
                href={l.href}
                className="flex items-center justify-between bg-white px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 transition"
              >
                <span>{l.label}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gray-400"><path d="m9 18 6-6-6-6"/></svg>
              </Link>
            </DialogClose>
          ))}
        </nav>

        {/* CTA SEARCH */}
        <div className="mt-2">
          <DialogClose asChild>
            <ButtonLink
              href={`/${locale}/search`}
              variant="primary"
              size="lg"
              className="w-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              {t("search")}
            </ButtonLink>
          </DialogClose>
        </div>

        {/* ACCOUNT */}
        <div className="mt-3 flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
            {tm("account")}
          </p>

          <DialogClose asChild>
            <Link
              href={`/${locale}/login`}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              {tm("login")}
            </Link>
          </DialogClose>

          <DialogClose asChild>
            <Link
              href={`/${locale}/signup`}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              {tm("signup")}
            </Link>
          </DialogClose>
        </div>

        {/* FOOTER */}
        <div className="mt-auto pt-2">
          <p className="text-xs text-gray-400">
            {tm("tagline")}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}