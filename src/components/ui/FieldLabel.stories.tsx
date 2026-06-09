import { FieldLabel } from "./FieldLabel";

const meta = {
  title: "Atoms/FieldLabel",
  component: FieldLabel,
};

export default meta;

export function Default() {
  return (
    <div className="grid gap-2">
      <FieldLabel>Prix par nuit</FieldLabel>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">Libelle reutilisable pour les formulaires.</p>
    </div>
  );
}
