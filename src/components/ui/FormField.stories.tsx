import { Input } from "./Input";
import { FormField } from "./FormField";

const meta = {
  title: "Molecules/FormField",
  component: FormField,
};

export default meta;

export function WithHintAndError() {
  return (
    <div className="grid max-w-md gap-5">
      <FormField label="Nom du logement" required hint="Utilisez un titre court et concret.">
        <Input placeholder="Villa Haie Vive" />
      </FormField>
      <FormField label="Prix" error="Le prix doit être supérieur à 0.">
        <Input type="number" placeholder="45000" />
      </FormField>
    </div>
  );
}
