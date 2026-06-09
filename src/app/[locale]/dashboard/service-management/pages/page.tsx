import { getLocale } from "next-intl/server";
import { EntityTableClient } from "@/components/admin/EntityTableClient";
import { Badge } from "@/components/ui/Badge";
import { readDb } from "@/lib/server/db";

const fallbackPages = [
  { id: "page-home", title: "Accueil", path: "/", status: "Publié", owner: "Marketing" },
  { id: "page-stays", title: "Hébergements", path: "/stays", status: "Publié", owner: "Catalogue" },
  { id: "page-services", title: "Services", path: "/services", status: "Publié", owner: "Catalogue" },
  { id: "page-terms", title: "Conditions", path: "/terms", status: "Publié", owner: "Legal" },
  { id: "page-privacy", title: "Confidentialité", path: "/privacy", status: "Publié", owner: "Legal" },
];

export default async function Page() {
  const locale = await getLocale();
  const db = await readDb();
  const rows = (db.sitePages?.length ? db.sitePages : fallbackPages).map((page) => ({
    ...page,
    title: sanitizeText(page.title),
    path: sanitizeText(page.path),
    owner: sanitizeText(page.owner),
    status: sanitizeText(page.status),
  }));

  return (
    <EntityTableClient
      title="Pages du site"
      entity="sitePages"
      initialRows={rows}
      createHref={`/${locale}/dashboard/service-management/pages/new`}
      editBaseHref={`/${locale}/dashboard/service-management/pages`}
      columns={[
        { key: "title", label: "Page" },
        { key: "path", label: "URL" },
        { key: "owner", label: "Équipe" },
        { key: "status", label: "Statut", renderKey: "status" },
      ]}
      renderers={{
        status: (row) => (
          <Badge className="rounded-md border-emerald-100 bg-emerald-50 text-emerald-700 shadow-none">
            {String(row.status ?? "Publié")}
          </Badge>
        ),
      }}
    />
  );
}

function sanitizeText(value: unknown) {
  return String(value ?? "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .trim();
}
