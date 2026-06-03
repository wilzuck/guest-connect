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
      illustration={{
        imageUrl:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2400&q=80",
        alt: "Maison d’hôtes — inscription",
        badge: "CRÉER UN COMPTE",
        title: "Rejoignez GuestConnect",
        subtitle: "Créez votre profil, enregistrez vos favoris et gérez vos réservations en quelques clics.",
      }}
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
