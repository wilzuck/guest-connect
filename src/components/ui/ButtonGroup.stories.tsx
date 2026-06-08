import { Button } from "./Button";
import { ButtonGroup } from "./ButtonGroup";

const meta = { title: "Atoms/ButtonGroup", component: ButtonGroup };
export default meta;

export function Default() {
  return (
    <ButtonGroup>
      <Button variant="ghost">Jour</Button>
      <Button variant="ghost">Semaine</Button>
      <Button variant="ghost">Mois</Button>
    </ButtonGroup>
  );
}
