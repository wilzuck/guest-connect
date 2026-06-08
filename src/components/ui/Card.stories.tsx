import { Card } from "./Card";
import { Button } from "./Button";

const meta = {
  title: "Atoms/Card",
  component: Card,
};

export default meta;

export function BasicCard() {
  return (
    <Card className="max-w-sm p-5">
      <p className="text-sm font-semibold text-black">Appartement premium</p>
      <p className="mt-2 text-sm leading-6 text-zinc-600">
        Une carte simple pour présenter un résumé, une action ou un état dans l&apos;interface.
      </p>
      <Button size="sm" className="mt-4">
        Continuer
      </Button>
    </Card>
  );
}
