import { ActionTile } from "./ActionTile";

const meta = {
  title: "Atoms/ActionTile",
  component: ActionTile,
};

export default meta;

export function Default() {
  return (
    <div className="grid max-w-sm gap-2">
      <ActionTile href="#">Contacter le support <span aria-hidden="true">-&gt;</span></ActionTile>
      <ActionTile href="#">Confiance et securite <span aria-hidden="true">-&gt;</span></ActionTile>
    </div>
  );
}
