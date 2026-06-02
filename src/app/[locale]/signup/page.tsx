import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignupForm } from "@/components/auth/SignupForm";

export default async function Page() {
  const locale = await getLocale();
  const t = await getTranslations("authPages.signup");
  return (
    <AuthShell
      locale={locale}
      title={t("title")}
      subtitle={t("subtitle")}
      footerHint={
        <span>
          {t("footerText")}{" "}
          <Link href={`/${locale}/login`} className="font-semibold text-black hover:underline">
            {t("footerLink")}
          </Link>
        </span>
      }
    >
      <SignupForm />
    </AuthShell>
  );
}
