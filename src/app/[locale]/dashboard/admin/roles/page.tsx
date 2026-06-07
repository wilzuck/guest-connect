import { UserAccessTable } from "@/components/admin/UserAccessTable";

const roles = [
  {
    id: "role-admin",
    name: "Administrateur",
    email: "Accès complet",
    role: "Tous modules",
    status: "Actif",
  },
  {
    id: "role-host",
    name: "Hôte",
    email: "Logements, réservations",
    role: "Création limitée",
    status: "Actif",
  },
  {
    id: "role-reviewer",
    name: "Validateur",
    email: "Validation des annonces",
    role: "Publication",
    status: "Actif",
  },
  {
    id: "role-service-manager",
    name: "Gestionnaire services",
    email: "Catalogue services",
    role: "Services uniquement",
    status: "Actif",
  },
];

export default function Page() {
  return (
    <UserAccessTable
      title="Rôles"
      description="Créez des rôles spécifiques pour afficher les bons menus et limiter les actions par profil."
      addLabel="Ajouter un rôle"
      rows={roles}
    />
  );
}
