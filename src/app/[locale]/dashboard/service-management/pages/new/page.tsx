import { getLocale } from "next-intl/server";
import { SitePageFormClient } from "@/components/admin/forms/SitePageFormClient";

export default async function Page() {
  const locale = await getLocale();

  return <SitePageFormClient backHref={`/${locale}/dashboard/service-management/pages`} />;
}
