import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { MarketingPageLayout } from "@/components/layout/MarketingPageLayout";

export const metadata: Metadata = {
  title: "Contact — GuestConnect",
  description: "Contactez-nous pour une question, une demande presse ou un partenariat.",
};

export default async function Page() {
  const locale = await getLocale();
  const isEn = locale === "en";

  return (
    <MarketingPageLayout
      eyebrow={isEn ? "Contact" : "Contact"}
      title={isEn ? "Talk to GuestConnect" : "Parler à GuestConnect"}
      description={
        isEn
          ? "Support, partnerships, press—send us a message and we’ll get back quickly."
          : "Support, partenariats, presse — envoie un message et on te répond vite."
      }
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Card className="p-6">
            <form className="grid gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-semibold ">
                  {isEn ? "Full name" : "Nom complet"}
                </label>
                <Input placeholder={isEn ? "Your name" : "Votre nom"} />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-semibold ">Email</label>
                <Input placeholder={isEn ? "you@email.com" : "vous@email.com"} />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-semibold ">
                  {isEn ? "Message" : "Message"}
                </label>
                <Textarea
                  rows={6}
                  placeholder={
                    isEn
                      ? "Tell us what you need (booking ID, dates, listing name...)."
                      : "Dites-nous ce dont vous avez besoin (ID réservation, dates, nom du logement...)."
                  }
                />
              </div>
              <div className="pt-2">
                <Button type="button" className="w-full rounded-2xl">
                  {isEn ? "Send message" : "Envoyer"}
                </Button>
                <p className="mt-3 text-xs text-zinc-500">
                  {isEn
                    ? "This is a UI form (backend hookup can be added next)."
                    : "Ceci est un formulaire UI (backend à connecter ensuite)."}
                </p>
              </div>
            </form>
          </Card>
        </div>

        <div className="lg:col-span-5">
          <Card className="p-6">
            <p className="text-sm font-semibold ">{isEn ? "What to include" : "À inclure"}</p>
            <ul className="mt-3 grid gap-2 text-sm text-zinc-600">
              <li>• {isEn ? "Booking ID (if any)" : "ID de réservation (si dispo)"}</li>
              <li>• {isEn ? "Listing name / city" : "Nom du logement / ville"}</li>
              <li>• {isEn ? "Dates and number of guests" : "Dates et nombre de voyageurs"}</li>
              <li>• {isEn ? "Screenshots if there’s an issue" : "Captures si souci"}</li>
            </ul>
          </Card>
        </div>
      </div>
    </MarketingPageLayout>
  );
}
