import { BackButton } from "./BackButton";

const meta = {
  title: "Atoms/BackButton",
  component: BackButton,
};

export default meta;

export function Default() {
  return <BackButton href="#" label="Retour à l'annonce" />;
}

export function Dark() {
  return (
    <div className="dark rounded-2xl bg-zinc-950 p-6">
      <BackButton href="#" label="Retour à l'annonce" />
    </div>
  );
}
