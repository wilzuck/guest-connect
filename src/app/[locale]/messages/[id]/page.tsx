import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

export default async function MessageThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const locale = await getLocale();
  const { id } = await params;
  redirect(`/${locale}/messages?t=${encodeURIComponent(id)}`);
}
