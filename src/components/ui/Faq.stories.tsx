import { Faq } from "./Faq";

const meta = {
  title: "Atoms/Faq",
  component: Faq,
};

export default meta;

const items = [
  { q: "Comment réserver un logement ?", a: "Choisissez vos dates, le nombre de voyageurs, puis validez le paiement sécurisé." },
  { q: "Puis-je annuler gratuitement ?", a: "Oui, l'annulation est gratuite jusqu'à 48h avant l'arrivée sur la plupart des logements." },
  { q: "Les paiements sont-ils sécurisés ?", a: "Tous les paiements passent par notre prestataire certifié, vos données ne sont jamais stockées en clair." },
];

export function Default() {
  return (
    <div className="max-w-2xl">
      <Faq items={items} />
    </div>
  );
}
