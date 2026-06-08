import Divider from "./Divider";

const meta = {
  title: "Atoms/Divider",
  component: Divider,
};

export default meta;

export function Horizontal() {
  return (
    <div className="w-full max-w-md">
      <p className="text-sm text-zinc-600">Section précédente</p>
      <Divider className="my-4" />
      <p className="text-sm text-zinc-600">Section suivante</p>
    </div>
  );
}

export function Vertical() {
  return (
    <div className="flex h-16 items-center gap-4">
      <span className="text-sm text-zinc-600">Prix</span>
      <Divider vertical />
      <span className="text-sm text-zinc-600">Disponibilité</span>
    </div>
  );
}
