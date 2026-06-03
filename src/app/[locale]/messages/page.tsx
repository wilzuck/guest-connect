import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { messageThreads, threadMessages } from "@/lib/mock/messages";
import { ThreadComposerClient } from "@/components/messages/ThreadComposerClient";
import { AccountShell } from "@/components/account/AccountShell";

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>;
}) {
  const locale = await getLocale();
  const sp = await searchParams;
  const selectedId = sp.t && messageThreads.some((x) => x.id === sp.t) ? sp.t : messageThreads[0]?.id;
  const selected = messageThreads.find((x) => x.id === selectedId);
  const messages = selectedId ? threadMessages[selectedId] ?? [] : [];

  return (
    <AccountShell
      locale={locale}
      title="Messages"
      subtitle="Interface type Airbnb/leboncoin : conversations à gauche, discussion au centre, détails à droite (desktop)."
    >
      {/* Desktop/tablette: 3 colonnes (liste / thread / détails). Mobile: liste ou thread selon sélection */}
      <div className="grid gap-4 lg:grid-cols-12">
        {/* Liste */}
        <Card className="p-0 shadow-none lg:col-span-4 xl:col-span-3">
              <div className="border-b border-black/10 p-4">
                <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-3 py-2">
                  <SearchIcon className="h-4 w-4 text-zinc-500" />
                  <input
                    placeholder="Rechercher… (démo)"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
                  />
                </div>
              </div>

              <div className="divide-y divide-black/5">
                {messageThreads.map((t) => {
                  const active = t.id === selectedId;
                  return (
                    <Link
                      key={t.id}
                      href={`/${locale}/messages?t=${encodeURIComponent(t.id)}`}
                      className={[
                        "block p-4 transition",
                        active ? "bg-zinc-50" : "hover:bg-zinc-50",
                      ].join(" ")}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-zinc-100">
                          <Image src={t.coverImage} alt={t.listingTitle} fill className="object-cover" sizes="48px" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="truncate text-sm font-semibold text-black">{t.subject}</p>
                            <span className="shrink-0 text-xs text-zinc-500">{t.updatedAt}</span>
                          </div>
                          <p className="mt-1 truncate text-sm text-zinc-600">{t.lastMessage}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs text-zinc-500">{t.listingTitle}</span>
                            {t.unread ? (
                              <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-2 text-xs font-semibold text-white">
                                {t.unread}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
        </Card>

        {/* Thread */}
        <Card className="p-0 shadow-none lg:col-span-8 xl:col-span-6">
              {selected ? (
                <div className="flex h-[72vh] flex-col">
                  <div className="flex items-center justify-between gap-3 border-b border-black/10 p-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-black">{selected.subject}</p>
                      <p className="truncate text-xs text-zinc-500">{selected.listingTitle}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-zinc-50 transition">
                        Appeler
                      </button>
                      <button className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-zinc-50 transition">
                        Détails
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-auto p-4">
                    <div className="grid gap-3">
                      {messages.map((m) => (
                        <Bubble key={m.id} side={m.from === "you" ? "right" : "left"} time={m.time}>
                          {m.text}
                        </Bubble>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-black/10 p-4">
                    <ThreadComposerClient />
                  </div>
                </div>
              ) : (
                <div className="grid h-[60vh] place-items-center p-10 text-center">
                  <div>
                    <p className="text-sm font-semibold text-black">Aucune conversation</p>
                    <p className="mt-2 text-sm text-zinc-600">Sélectionne une conversation à gauche.</p>
                  </div>
                </div>
              )}
        </Card>

        {/* Détails (xl) */}
        <Card className="hidden p-0 shadow-none xl:block xl:col-span-3">
              {selected ? (
                <div className="p-5">
                  <p className="text-sm font-semibold text-black">Détails</p>
                  <div className="mt-4 overflow-hidden rounded-3xl border border-black/10">
                    <div className="relative aspect-[16/10]">
                      <Image src={selected.coverImage} alt={selected.listingTitle} fill className="object-cover" sizes="320px" />
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-semibold text-black">{selected.listingTitle}</p>
                      <p className="mt-2 text-sm leading-6 text-zinc-600">
                        Astuce: centralise ici les codes d’accès, horaires, et instructions. (Démo UI)
                      </p>
                      <div className="mt-4 grid gap-2">
                        <button className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-50 transition">
                          Signaler
                        </button>
                        <button className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-50 transition">
                          Archiver
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <p className="text-sm font-semibold text-black">Détails</p>
                  <p className="mt-2 text-sm text-zinc-600">Sélectionne une conversation.</p>
                </div>
              )}
        </Card>
      </div>

      <div className="mt-6 flex justify-end">
        <Link
          href={`/${locale}/plan-du-site`}
          className="rounded-2xl border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-zinc-50 transition"
        >
          Plan du site
        </Link>
      </div>
    </AccountShell>
  );
}

function Bubble({
  children,
  side,
  time,
}: {
  children: string;
  side: "left" | "right";
  time: string;
}) {
  const isRight = side === "right";
  return (
    <div className={isRight ? "flex justify-end" : "flex justify-start"}>
      <div className="max-w-[520px]">
        <div
          className={
            isRight
              ? "rounded-3xl bg-black px-5 py-3 text-sm leading-7 text-white"
              : "rounded-3xl border border-black/10 bg-white px-5 py-3 text-sm leading-7 text-zinc-700"
          }
        >
          {children}
        </div>
        <p className={isRight ? "mt-1 text-right text-xs text-zinc-500" : "mt-1 text-xs text-zinc-500"}>{time}</p>
      </div>
    </div>
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
