import { Badge } from "@/components/ui/Badge";
import { AdminDataTable, type AdminDataTableColumn } from "./AdminDataTable";

type DemoRow = {
  id: string;
  title: string;
  owner: string;
  status: string;
  date: string;
};

const rows: DemoRow[] = [
  { id: "1", title: "Villa Cotonou", owner: "Amina", status: "En attente", date: "2026-06-09" },
  { id: "2", title: "Service photo", owner: "David", status: "Actif", date: "2026-06-08" },
  { id: "3", title: "Experience locale", owner: "Sarah", status: "Archive", date: "2026-06-07" },
];

const columns: AdminDataTableColumn<DemoRow>[] = [
  { key: "title", label: "Titre" },
  { key: "owner", label: "Proprietaire" },
  {
    key: "status",
    label: "Statut",
    render: (row) => <Badge>{row.status}</Badge>,
  },
  { key: "date", label: "Date" },
];

const meta = {
  title: "Admin/AdminDataTable",
  component: AdminDataTable,
};

export default meta;

export function Default() {
  return (
    <AdminDataTable
      rows={rows}
      columns={columns}
      getRowId={(row) => row.id}
      groupBy={(row) => (row.status === "En attente" ? "A traiter" : "Autres")}
      stats={[
        { label: "Total", value: rows.length },
        { label: "A traiter", value: rows.filter((row) => row.status === "En attente").length },
      ]}
      renderActions={() => <button className="rounded-lg border border-black/10 px-3 py-1 text-sm">...</button>}
    />
  );
}
