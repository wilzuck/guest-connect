import { UserAccessTable } from "@/components/admin/UserAccessTable";

const permissions = [
  {
    id: "perm-publish",
    name: "Publier une annonce",
    email: "Validation et mise en ligne",
    role: "Administrateur, Validateur",
    status: "Actif",
  },
  {
    id: "perm-users",
    name: "Gérer les utilisateurs",
    email: "Création, suspension, rôles",
    role: "Administrateur",
    status: "Actif",
  },
  {
    id: "perm-services",
    name: "Gérer les services",
    email: "Catalogue, prix, visibilité",
    role: "Administrateur, Support",
    status: "Actif",
  },
];

export default function Page() {
  return (
    <UserAccessTable
      title="Droits"
      description="Définissez les permissions opérationnelles qui contrôlent l’accès aux modules."
      addLabel="Ajouter un droit"
      rows={permissions}
    />
  );
}
