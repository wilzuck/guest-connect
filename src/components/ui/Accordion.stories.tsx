import { Accordion } from "./Accordion";

const meta = { title: "Atoms/Accordion", component: Accordion };
export default meta;

export function Default() {
  return (
    <Accordion
      items={[
        { title: "Conditions d'annulation", content: "Les règles sont affichées avant la réservation." },
        { title: "Validation admin", content: "Les annonces doivent être validées avant publication." },
      ]}
    />
  );
}
