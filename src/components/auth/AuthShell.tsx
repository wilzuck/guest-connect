import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { getTranslations } from "next-intl/server";

type AuthShellProps = {
  locale: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footerHint?: ReactNode;
  illustration?: {
    imageUrl: string;
    alt: string;
    badge?: string;
    title?: string;
    subtitle?: string;
  };
};

export async function AuthShell({
  locale,
  title,
  subtitle,
  children,
  footerHint,
  illustration,
}: AuthShellProps) {
  const t = await getTranslations("authShell");
  const illu = {
    imageUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2400&q=80",
    alt: t("illustration.alt"),
    badge: "GUESTCONNECT",
    title: t("illustration.title"),
    subtitle: t("illustration.subtitle"),
  };
  return (
    <div className="min-h-dvh bg-zinc-50">
      <div className="flex min-h-dvh w-full">
        {/* Left: auth */}
        <div className="flex w-full flex-col px-5 py-2 sm:px-8 sm:py-8 md:w-3/5 lg:w-1/2">
          <main className="flex flex-1 max-w-md mx-auto items-start py-2 sm:py-10">
            <div className="w-full max-w-md">
              <header className="flex items-center py-10 justify-between">
                <Link href={`/${locale}`} className="inline-flex items-center gap-2">
                  <Logo />
                </Link>
                <Link href={`/${locale}`} className="text-sm p-2 border border-black/10 rounded-4xl font-medium text-zinc-500 hover:text-zinc-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                 
                </Link>
              </header>
              <div className="mb-7">
                <h1 className="text-xl font-semibold tracking-tight text-black">
                  {title}
                </h1>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {subtitle}
                </p>
              </div>

              <div className="rounded-3xl bg-transparent p-0">{children}</div>
            </div>
          </main>

          <footer className="mt-6 flex flex-col gap-3 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <Link className="hover:text-black" href={`/${locale}/terms`}>
                {t("footer.terms")}
              </Link>
              <Link className="hover:text-black" href={`/${locale}/privacy`}>
                {t("footer.privacy")}
              </Link>
              <Link className="hover:text-black" href={`/${locale}/cookies`}>
                {t("footer.cookies")}
              </Link>
            </div>
            <div className="lg:order-2 order-1">              
                <LocaleSwitcher />
            </div>
            {footerHint ? (
              <div className="text-zinc-500">{footerHint}</div>
            ) : null}
          </footer>
        </div>

        {/* Right: illustration */}
        <div className="relative hidden w-2/5 overflow-hidden md:block lg:w-1/2">
          <div className="absolute inset-0">
            <Image
              src={illustration?.imageUrl ?? illu.imageUrl}
              alt={illustration?.alt ?? illu.alt}
              fill
              className="object-cover"
              sizes="50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
          </div>

          <div className="relative flex h-full flex-col justify-end p-10">
            <p className="inline-flex w-fit rounded-full bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-white backdrop-blur">
              {illustration?.badge ?? illu.badge}
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-white">
              {illustration?.title ?? illu.title}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/85">
              {illustration?.subtitle ?? illu.subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
