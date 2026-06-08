import { Badge } from "./Badge";

const meta = {
  title: "Atoms/Badge",
  component: Badge,
};

export default meta;

export function Examples() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Appartement</Badge>
      <Badge>Parking</Badge>
      <Badge>Hôte vérifié</Badge>
    </div>
  );
}
