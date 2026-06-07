import { getLocale } from "next-intl/server";
import { ServiceFormClient } from "@/components/admin/forms/ServiceFormClient";

export default async function Page() {
  const locale = await getLocale();
  return <ServiceFormClient locale={locale} />;
}

