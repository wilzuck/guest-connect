import { getLocale } from "next-intl/server";
import { LocationFormClient } from "@/components/admin/forms/LocationFormClient";

export default async function Page() {
  const locale = await getLocale();
  return <LocationFormClient locale={locale} />;
}

