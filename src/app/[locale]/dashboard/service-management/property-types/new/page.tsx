import { getLocale } from "next-intl/server";
import { ListingOptionFormClient } from "@/components/admin/forms/ListingOptionFormClient";

export default async function Page() {
  const locale = await getLocale();
  return <ListingOptionFormClient locale={locale} kind="propertyTypes" />;
}
