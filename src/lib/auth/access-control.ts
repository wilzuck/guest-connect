export type UserRole = "admin" | "host" | "reviewer" | "service_manager" | "support" | "traveler";

export type Permission =
  | "dashboard.read"
  | "admin.read"
  | "listings.manage"
  | "hostListings.manage"
  | "categories.manage"
  | "locations.manage"
  | "services.manage"
  | "experiences.manage"
  | "users.manage"
  | "roles.manage"
  | "permissions.manage"
  | "docs.read"
  | "reservations.read"
  | "messages.read"
  | "favorites.read";

export type CurrentUserAccess = {
  id: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
};

export type PermissionGuard = {
  permission?: Permission;
};

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Administrateur",
  host: "Hote",
  reviewer: "Validateur",
  service_manager: "Gestionnaire services",
  support: "Support",
  traveler: "Voyageur",
};

export const PERMISSION_LABELS: Record<Permission, string> = {
  "dashboard.read": "Voir le tableau de bord",
  "admin.read": "Acceder a l'administration",
  "listings.manage": "Gerer les logements",
  "hostListings.manage": "Gerer ses logements",
  "categories.manage": "Gerer les categories",
  "locations.manage": "Gerer les lieux",
  "services.manage": "Gerer les services",
  "experiences.manage": "Gerer les experiences",
  "users.manage": "Gerer les utilisateurs",
  "roles.manage": "Gerer les roles",
  "permissions.manage": "Gerer les droits",
  "docs.read": "Lire la documentation",
  "reservations.read": "Voir les reservations",
  "messages.read": "Voir les messages",
  "favorites.read": "Voir les favoris",
};

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    "dashboard.read",
    "admin.read",
    "listings.manage",
    "hostListings.manage",
    "categories.manage",
    "locations.manage",
    "services.manage",
    "experiences.manage",
    "users.manage",
    "roles.manage",
    "permissions.manage",
    "docs.read",
    "reservations.read",
    "messages.read",
    "favorites.read",
  ],
  host: [
    "dashboard.read",
    "hostListings.manage",
    "services.manage",
    "reservations.read",
    "messages.read",
    "favorites.read",
    "docs.read",
  ],
  reviewer: ["dashboard.read", "admin.read", "listings.manage", "docs.read"],
  service_manager: ["dashboard.read", "admin.read", "services.manage", "docs.read"],
  support: ["dashboard.read", "admin.read", "users.manage", "docs.read", "messages.read"],
  traveler: ["dashboard.read", "reservations.read", "messages.read", "favorites.read", "docs.read"],
};

const DEMO_USER: CurrentUserAccess = {
  id: "usr-admin",
  name: "Admin GuestConnect",
  role: "admin",
  permissions: ROLE_PERMISSIONS.admin,
};

export function getCurrentUserAccess(): CurrentUserAccess {
  return DEMO_USER;
}

export function hasPermission(user: CurrentUserAccess, permission?: Permission) {
  if (!permission) return true;
  return user.permissions.includes(permission);
}

export function filterByPermissions<T extends PermissionGuard>(items: T[], user: CurrentUserAccess): T[] {
  return items.filter((item) => hasPermission(user, item.permission));
}
