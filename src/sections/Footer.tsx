"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui/Container";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import type { ReactNode } from "react";

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const pathname = usePathname() || "";
  if (/(^|\/)(login|signup)$/.test(pathname)) return null;

  const columns = [
    {
      title: t("about"),
      links: [
        { label: t("company"), href: `/${locale}/company` },
        { label: t("careers"), href: `/${locale}/careers` },
        { label: t("press"), href: `/${locale}/press` },
      ],
    },
    {
      title: t("support"),
      links: [
        { label: t("helpCenter"), href: `/${locale}/support` },
        { label: t("contact"), href: `/${locale}/contact` },
        { label: t("safety"), href: `/${locale}/safety` },
      ],
    },
    {
      title: t("legal"),
      links: [
        { label: t("terms"), href: `/${locale}/terms` },
        { label: t("privacy"), href: `/${locale}/privacy` },
        { label: t("cookies"), href: `/${locale}/cookies` },
      ],
    },
  ];

  return (
    <footer className="border-t border-black/5 bg-white">
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-600">
              {t("tagline")}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <SocialLink label="X" href="https://x.com" icon={<XIcon className="h-4 w-4" />} />
              <SocialLink
                label="LinkedIn"
                href="https://linkedin.com"
                icon={<LinkedInIcon className="h-4 w-4" />}
              />
              <SocialLink
                label="Instagram"
                href="https://instagram.com"
                icon={<InstagramIcon className="h-4 w-4" />}
              />
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
            {columns.map((c) => (
              <div key={c.title}>
                <p className="text-sm font-semibold text-black">{c.title}</p>
                <ul className="mt-4 space-y-3">
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-zinc-600 hover:text-black transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-black/5 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} GuestConnect. {t("copyright")}
          </p>
          <div className="flex items-center gap-3">
            <LocaleSwitcher />
            <p className="hidden sm:block">{t("madeFor")}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function SocialLink({
  label,
  href,
  icon,
}: {
  label: string;
  href: string;
  icon: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm shadow-black/5 hover:bg-zinc-50 transition-colors"
      aria-label={label}
      title={label}
    >
      {icon}
    </a>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.2 2H21l-6.2 7.1L22 22h-6.2l-4.9-6.8L5.1 22H2.3l6.7-7.7L2 2h6.3l4.4 6.1L18.2 2Zm-1.1 18h1.5L7 3.9H5.4l11.7 16.1Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.4 20.4h-3.5v-5.5c0-1.3 0-3-1.8-3s-2 1.4-2 2.9v5.6H9.6V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.3-1.8 3.5 0 4.1 2.3 4.1 5.3v6.3ZM5.6 7.4A2 2 0 1 1 5.6 3.4a2 2 0 0 1 0 4Zm-1.8 13h3.5V9H3.8v11.4Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
