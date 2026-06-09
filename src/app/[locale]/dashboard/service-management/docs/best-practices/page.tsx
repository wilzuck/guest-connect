export default function Page() {
  return (
    <article className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-white/80">Bonnes pratiques</p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">Qualité des annonces et services</h1>
      <div className="mt-6 grid gap-4 text-sm leading-7 text-zinc-600">
        <p>Privilégiez des titres courts, des photos lumineuses et une description claire des conditions.</p>
        <p>Vérifiez systématiquement prix, localisation, équipements et politique d’annulation avant publication.</p>
        <p>Pour les services, indiquez une catégorie précise, une zone d’intervention et un prix de départ lisible.</p>
      </div>
    </article>
  );
}
