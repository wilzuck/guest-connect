import { InfoCard } from "./InfoCard";

const meta = {
  title: "Atoms/InfoCard",
  component: InfoCard,
};

export default meta;

export function Default() {
  return (
    <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
      <InfoCard
        title="Reservations"
        description="Confirmation, modifications et conditions d'annulation."
      />
      <InfoCard
        title="Paiements"
        description="Cartes, remboursements et factures."
        interactive
      />
    </div>
  );
}

export function WithIcon() {
  return (
    <InfoCard
      className="max-w-sm"
      title="Heberger"
      description="Annonce, tarifs, disponibilites et regles du logement."
      icon={<span className="text-lg">GC</span>}
    />
  );
}
