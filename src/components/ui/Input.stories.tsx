import { Input } from "./Input";

const meta = {
  title: "Atoms/Input",
  component: Input,
};

export default meta;

export function TextFields() {
  return (
    <div className="grid max-w-md gap-4">
      <Input placeholder="Nom du logement" />
      <Input type="email" placeholder="contact@guestconnect.com" />
      <Input type="search" placeholder="Rechercher" />
    </div>
  );
}
