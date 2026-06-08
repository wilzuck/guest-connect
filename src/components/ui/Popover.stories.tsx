import { Button } from "./Button";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

const meta = {
  title: "Atoms/Popover",
  component: PopoverContent,
};

export default meta;

export function HelpPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Voir l&apos;aide</Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-xs">
        <p className="text-sm font-semibold text-black">Disponibilités</p>
        <p className="mt-1 text-sm leading-6 text-zinc-600">
          Indique les jours ouverts et bloque les périodes où le logement ne
          peut pas recevoir de voyageurs.
        </p>
      </PopoverContent>
    </Popover>
  );
}
