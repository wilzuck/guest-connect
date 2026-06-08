import { Checkbox } from "./Checkbox";

const meta = { title: "Atoms/Checkbox", component: Checkbox };
export default meta;

export function Default() {
  return <Checkbox label="Parking disponible" defaultChecked />;
}
