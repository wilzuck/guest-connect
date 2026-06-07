import { UserAccessTable } from "@/components/admin/UserAccessTable";
import { PERMISSION_LABELS, ROLE_LABELS, ROLE_PERMISSIONS, type Permission } from "@/lib/auth/access-control";

const permissions = (Object.keys(PERMISSION_LABELS) as Permission[]).map((permission) => {
  const roles = Object.entries(ROLE_PERMISSIONS)
    .filter(([, rolePermissions]) => rolePermissions.includes(permission))
    .map(([role]) => ROLE_LABELS[role as keyof typeof ROLE_LABELS]);

  return {
    id: `perm-${permission}`,
    name: PERMISSION_LABELS[permission],
    email: permission,
    role: roles.join(", "),
    status: "Actif",
  };
});

export default function Page() {
  return (
    <UserAccessTable
      title="Droits"
      description="Définissez les permissions opérationnelles qui contrôlent l'accès aux modules."
      addLabel="Ajouter un droit"
      rows={permissions}
    />
  );
}
