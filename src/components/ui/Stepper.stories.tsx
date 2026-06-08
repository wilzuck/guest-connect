import { Stepper } from "./Stepper";

const meta = {
  title: "Atoms/Stepper",
  component: Stepper,
};

export default meta;

const steps = [
  { title: "Détails", description: "Infos de base" },
  { title: "Localisation", description: "Adresse" },
  { title: "Spécifications", description: "Chambres" },
  { title: "Équipements", description: "Confort" },
  { title: "Tarification", description: "Prix" },
];

export function Progress() {
  return (
    <div className="max-w-3xl">
      <Stepper steps={steps} currentStep={2} />
    </div>
  );
}
