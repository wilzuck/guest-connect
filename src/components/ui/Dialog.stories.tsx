import { Button } from "./Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "./Dialog";

const meta = {
  title: "Atoms/Dialog",
  component: DialogContent,
};

export default meta;

export function Panel() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Ouvrir</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-6">
        <div className="space-y-3">
          <p className="text-lg font-semibold ">Confirmer l&apos;action</p>
          <p className="text-sm leading-6 text-zinc-600">
            Utilise ce panneau pour les confirmations, les filtres mobiles et
            les formulaires rapides.
          </p>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Valider</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
