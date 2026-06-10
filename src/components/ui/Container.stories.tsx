import { Container } from "./Container";

const meta = {
  title: "Atoms/Container",
  component: Container,
};

export default meta;

export function Default() {
  return (
    <Container className="rounded-2xl border border-dashed border-black/15 bg-zinc-50 py-8 dark:border-white/15 dark:bg-zinc-900">
      <p className="text-sm font-semibold">Contenu centré (max-w-7xl)</p>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Le Container applique une largeur max et un padding horizontal cohérents.
      </p>
    </Container>
  );
}
