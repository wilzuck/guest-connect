import { Textarea } from "./Textarea";

const meta = {
  title: "Atoms/Textarea",
  component: Textarea,
};

export default meta;

export function DefaultTextarea() {
  return (
    <div className="max-w-lg">
      <Textarea placeholder="Décrivez le logement, le quartier et les règles importantes." />
    </div>
  );
}
