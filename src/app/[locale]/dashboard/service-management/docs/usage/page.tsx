export default function Page() {
  return (
    <article className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Documentation</p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-black">Utilisation de l’administration</h1>
      <div className="mt-6 grid gap-4 text-sm leading-7 text-zinc-600">
        <p>Utilisez le menu principal pour gérer logements, services, expériences, catégories et lieux.</p>
        <p>Les annonces ajoutées restent en attente de validation avant d’être visibles publiquement.</p>
        <p>Les sections Utilisateurs, Rôles et Droits préparent l’affichage conditionnel du menu selon les permissions.</p>
      </div>
    </article>
  );
}
