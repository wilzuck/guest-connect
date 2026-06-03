import { getLocale } from "next-intl/server";
import { CategoryFormClient } from "@/components/admin/forms/CategoryFormClient";

export default async function Page() {
  const locale = await getLocale();
  return <CategoryFormClient locale={locale} />;
}

