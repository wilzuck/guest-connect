import { UserAccessTable } from "@/components/admin/UserAccessTable";
import { PERMISSION_LABELS, ROLE_LABELS, ROLE_PERMISSIONS, type UserRole } from "@/lib/auth/access-control";

const roleOrder: UserRole[] = ["admin", "host", "reviewer", "service_manager", "support", "traveler"];

const roles = roleOrder.map((role) => ({
  id: `role-${role}`,
  name: ROLE_LABELS[role],
  email: ROLE_PERMISSIONS[role].map((permission) => PERMISSION_LABELS[permission]).join(", "),
  role: `${ROLE_PERMISSIONS[role].length} droits`,
  status: "Actif",
}));

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
