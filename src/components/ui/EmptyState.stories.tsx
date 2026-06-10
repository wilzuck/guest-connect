import { Search } from "lucide-react";
import { EmptyState } from "./EmptyState";
import { Button } from "./Button";

const meta = {
  title: "Atoms/EmptyState",
  component: EmptyState,
};

export default meta;

export function Basic() {
  return (
    <EmptyState
      title="Aucun résultat"
      description="Essayez d'élargir vos critères de recherche pour voir plus de logements."
    />
  );
}

export function WithIconAndAction() {
  return (
    <EmptyState
      icon={<Search className="size-5" />}
      title="Aucune conversation"
      description="Vos nouveaux échanges avec les hôtes apparaîtront ici."
      action={<Button size="sm">Démarrer une discussion</Button>}
    />
  );
}

export function Dark() {
  return (
    <div className="dark bg-zinc-950 p-6">
      <EmptyState
        icon={<Search className="size-5" />}
        title="Aucune conversation"
        description="Vos nouveaux échanges avec les hôtes apparaîtront ici."
        action={<Button size="sm">Démarrer une discussion</Button>}
      />
    </div>
  );
}
