import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function Layout({ children }: { children: ReactNode }) {
  const locale = await getLocale();

  return <AdminShell locale={locale}>{children}</AdminShell>;
}
