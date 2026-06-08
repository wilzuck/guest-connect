import { SectionHeading } from "./SectionHeading";

const meta = {
  title: "Atoms/SectionHeading",
  component: SectionHeading,
};

export default meta;

export function Default() {
  return (
    <SectionHeading
      eyebrow="GuestConnect"
      title="Des logements prêts à réserver"
      description="Un titre de section réutilisable pour les pages marketing, les listes publiques et les espaces de gestion."
    />
  );
}

export function Centered() {
  return (
    <SectionHeading
      align="center"
      eyebrow="Services"
      title="Trouvez le bon prestataire"
      description="Photographie, réparation, couture, lieux de loisirs et services utiles autour du séjour."
    />
  );
}
