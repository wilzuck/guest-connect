import Image from "next/image";
import Link from "next/link";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { messageThreads } from "@/lib/mock/messages";

export default function MessagesPage() {
  return (
    <MarketingPageLayout
      eyebrow="Inbox"
      title="Messages"
      description="Centralisez vos échanges avec les hôtes et le support. Réponses rapides, informations claires."
    >
      <div className="grid gap-4">
        {messageThreads.map((t) => (
          <Link key={t.id} href={`./${t.id}`} className="block">
            <Card className="group overflow-hidden p-0 shadow-none transition hover:bg-zinc-50">
              <div className="grid gap-0 sm:grid-cols-12">
                <div className="relative aspect-[16/10] w-full sm:col-span-4 sm:aspect-[4/3]">
                  <Image
                    src={t.coverImage}
                    alt={t.listingTitle}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 320px"
                  />
                </div>
                <div className="p-6 sm:col-span-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-black">{t.subject}</p>
                      <p className="mt-1 text-sm text-zinc-600">{t.listingTitle}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-500">{t.updatedAt}</span>
                      {t.unread ? <Badge className="text-black">{t.unread} non lu</Badge> : null}
                    </div>
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm leading-7 text-zinc-600">{t.lastMessage}</p>
                  <p className="mt-4 text-sm font-semibold text-black">Ouvrir</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </MarketingPageLayout>
  );
}
