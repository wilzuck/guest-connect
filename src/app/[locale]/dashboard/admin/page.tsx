import { Card } from "@/components/ui/Card";
import { readDb } from "@/lib/server/db";

export default async function Page() {
  const db = await readDb();

  const stats = [
    { k: "Logements", v: db.listings?.length ?? 0 },
    { k: "Catégories", v: db.categories?.length ?? 0 },
    { k: "Lieux", v: db.locations?.length ?? 0 },
    { k: "Services", v: db.services?.length ?? 0 },
    { k: "Expériences", v: db.experiences?.length ?? 0 },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-12">
      {stats.map((s) => (
        <Card key={s.k} className="p-6 shadow-none md:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{s.k}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-black">{s.v}</p>
          <p className="mt-2 text-sm text-zinc-600">Total en base JSON</p>
        </Card>
      ))}

      <Card className="p-6 shadow-none md:col-span-12">
        <p className="text-sm font-semibold text-black">Bonnes pratiques</p>
        <ul className="mt-3 grid gap-2 text-sm text-zinc-600 sm:grid-cols-2">
          <li>• Gardez des titres clairs et des photos cohérentes.</li>
          <li>• Vérifiez l’emplacement et la transparence des conditions.</li>
          <li>• Normalisez catégories, lieux et services avant d’ajouter des logements.</li>
          <li>• Utilisez des descriptions courtes + une phrase “premium” pour la conversion.</li>
        </ul>
      </Card>
    </div>
  );
}

