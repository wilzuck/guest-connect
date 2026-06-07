import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { ActivitiesTable } from "@/components/account/ActivitiesTable";
import { AccountShell } from "@/components/account/AccountShell";

export const metadata: Metadata = {
  title: "Activity — GuestConnect",
  description: "Your recent activity.",
};

export default async function Page() {
  const locale = await getLocale();
  const isEn = locale === "en";

  return (
    <AccountShell
      locale={locale}
      title={isEn ? "Recent activity" : "Activité récente"}
      subtitle={isEn ? "A compact log with pagination." : "Un journal compact avec pagination."}
      activeHref={`/${locale}/activities`}
    >
      <ActivitiesTable isEn={isEn} />
    </AccountShell>
  );
}
