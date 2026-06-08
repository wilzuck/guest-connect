import { Switch } from "./Switch";

const meta = { title: "Atoms/Switch", component: Switch };
export default meta;

export function Default() {
  return <Switch label="Activer les notifications" defaultChecked />;
}
