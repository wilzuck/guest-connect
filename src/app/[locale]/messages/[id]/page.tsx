import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ThreadComposerClient } from "@/components/messages/ThreadComposerClient";
import { getThread, threadMessages } from "@/lib/mock/messages";

export default async function MessageThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const locale = await getLocale();
  const { id } = await params;
  const thread = getThread(id);
  if (!thread) return notFound();

  const messages = threadMessages[id] ?? [];

  return (
    <div className="bg-white">
      <section className="border-b border-black/5 bg-white">
        <Container className="py-10 sm:py-14">
          <Link href={`/${locale}/messages`} className="text-sm font-semibold text-zinc-600 hover:text-black transition">
            ← Retour aux messages
          </Link>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            {thread.subject}
          </h1>
          <p className="mt-2 text-sm text-zinc-600">{thread.listingTitle}</p>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-12 sm:py-14">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <Card className="overflow-hidden p-0 shadow-none">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={thread.coverImage}
                    alt={thread.listingTitle}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 28vw"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-black">Contexte</p>
                  <p className="mt-2 text-sm leading-7 text-zinc-600">
                    Les messages restent centralisés ici pour éviter les informations perdues (codes, horaires,
                    instructions). Démo: l’envoi n’est pas actif.
                  </p>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-8">
              <Card className="p-6 shadow-none">
                <div className="grid gap-3">
                  {messages.map((m) => (
                    <Bubble key={m.id} side={m.from === "you" ? "right" : "left"} time={m.time}>
                      {m.text}
                    </Bubble>
                  ))}
                </div>

                <ThreadComposerClient />
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </div>
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
      <div className={isRight ? "max-w-[520px]" : "max-w-[520px]"}>
        <div
          className={
            isRight
              ? "rounded-3xl bg-black px-5 py-4 text-sm leading-7 text-white"
              : "rounded-3xl border border-black/10 bg-white px-5 py-4 text-sm leading-7 text-zinc-700"
          }
        >
          {children}
        </div>
        <p className={isRight ? "mt-1 text-right text-xs text-zinc-500" : "mt-1 text-xs text-zinc-500"}>{time}</p>
      </div>
    </div>
  );
}
