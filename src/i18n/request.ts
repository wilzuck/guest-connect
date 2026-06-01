import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

const locales = ["fr", "en"] as const;

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = (
    locale && locales.includes(locale as (typeof locales)[number]) ? locale : "fr"
  ) as (typeof locales)[number];

  return {
    locale: safeLocale,
    messages: (await import(`../../messages/${safeLocale}.json`)).default,
  };
});
