import { ContentSectionCard } from "./ContentSectionCard";

const meta = {
  title: "Molecules/ContentSectionCard",
  component: ContentSectionCard,
};

export default meta;

export function LegalSection() {
  return (
    <ContentSectionCard title="Reservations et paiements" className="max-w-2xl">
      <p>Les informations essentielles doivent etre visibles avant la reservation.</p>
      <p>Les conditions d'annulation doivent etre consultees avant paiement.</p>
    </ContentSectionCard>
  );
}
