import { UserAccessTable } from "@/components/admin/UserAccessTable";

const users = [
  {
    id: "usr-admin",
    name: "Admin GuestConnect",
    email: "admin@guestconnect.com",
    role: "Administrateur",
    status: "Actif",
  },
  {
    id: "usr-host",
    name: "Hôte Premium",
    email: "host@guestconnect.com",
    role: "Hôte",
    status: "En validation",
  },
  {
    id: "usr-support",
    name: "Support Voyageur",
    email: "support@guestconnect.com",
    role: "Support",
    status: "Actif",
  },
];

export default function Page() {
  return (
    <UserAccessTable
      title="Utilisateurs"
      description="Gérez les comptes, statuts et rôles visibles dans l’espace d’administration."
      addLabel="Ajouter un utilisateur"
      rows={users}
    />
  );
}
