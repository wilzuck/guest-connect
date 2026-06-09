import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { notifications } from "@/lib/mock/notifications";
import { getLocale } from "next-intl/server";
import { AccountShell } from "@/components/account/AccountShell";

export default async function NotificationsPage() {
  const locale = await getLocale();
  return (
    <AccountShell
      locale={locale}
      title="Notifications"
      subtitle="Suivez les confirmations, messages et mises à jour importantes. Tout est regroupé ici."
      activeHref={`/${locale}/notifications`}
    >
      <div className="grid gap-4">
        {notifications.map((n) => (
          <Card key={n.id} className="p-6 shadow-none">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl border border-black/10 bg-white">
                  <Icon type={n.type} />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold ">{n.title}</p>
                    {!n.read ? <Badge className="text-black">Nouveau</Badge> : null}
                  </div>
                  <p className="mt-2 text-sm leading-7 text-zinc-600 dark:text-zinc-400">{n.description}</p>
                  <p className="mt-2 text-xs text-zinc-500">{n.time}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AccountShell>
  );
}

function Icon({ type }: { type: (typeof notifications)[number]["type"] }) {
  switch (type) {
    case "message":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-zinc-700" fill="none" aria-hidden="true">
          <path
            d="M7 8h10M7 12h6m-1 9-4-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-2l-4 3Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "reservation":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-zinc-700" fill="none" aria-hidden="true">
          <path
            d="M7 3v3M17 3v3M4 9h16M6 6h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="m9 14 2 2 4-5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "security":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-zinc-700" fill="none" aria-hidden="true">
          <path
            d="M12 2 20 6v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M12 11v4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M12 8h.01"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case "promo":
    default:
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-zinc-700" fill="none" aria-hidden="true">
          <path
            d="M12 2v4m0 12v4M4 12H2m20 0h-2M5 5l2.5 2.5M19 19l-2.5-2.5M19 5l-2.5 2.5M5 19l2.5-2.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );
  }
}
