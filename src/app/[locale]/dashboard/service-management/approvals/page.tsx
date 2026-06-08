import { getLocale } from "next-intl/server";
import { ApprovalsQueueClient, type ApprovalItem } from "@/components/admin/ApprovalsQueueClient";
import { readDb } from "@/lib/server/db";

export default async function Page() {
  const locale = await getLocale();
  const db = await readDb();
  const base = `/${locale}/dashboard/service-management`;

  const items: ApprovalItem[] = [
    ...(db.listings ?? []).map((listing) => ({
      id: String(listing.id),
      entity: "listings",
      entityLabel: "Logement",
      title: String(listing.title ?? "Logement sans titre"),
      subtitle: String(listing.location ?? listing.shortDescription ?? "Annonce à vérifier"),
      submittedBy: String(listing.hostName ?? "Hôte GuestConnect"),
      submittedAt: String(listing.createdAt ?? "Aujourd'hui"),
      status: normalizeStatus(listing.validationStatus),
      href: `${base}/listings/${String(listing.id)}`,
      canPersist: true,
    })),
    ...(db.services ?? []).map((service) => ({
      id: String(service.id),
      entity: "services",
      entityLabel: "Service",
      title: String(service.name ?? "Service sans titre"),
      subtitle: String(service.description ?? service.slug ?? "Service proposé par un utilisateur"),
      submittedBy: String(service.providerName ?? "Prestataire GuestConnect"),
      submittedAt: String(service.createdAt ?? "Aujourd'hui"),
      status: normalizeStatus(service.validationStatus),
      href: `${base}/services/${String(service.id)}`,
      canPersist: true,
    })),
    ...(db.experiences ?? []).map((experience) => ({
      id: String(experience.id),
      entity: "experiences",
      entityLabel: "Expérience",
      title: String(experience.title ?? "Expérience sans titre"),
      subtitle: String(experience.excerpt ?? experience.tag ?? "Activité à vérifier"),
      submittedBy: String(experience.hostName ?? "Créateur local"),
      submittedAt: String(experience.createdAt ?? "Aujourd'hui"),
      status: normalizeStatus(experience.validationStatus),
      href: `${base}/experiences/${String(experience.id)}`,
      canPersist: true,
    })),
    {
      id: "usr-host",
      entity: "accounts",
      entityLabel: "Compte",
      title: "Hôte Premium",
      subtitle: "Compte hôte en attente de vérification d'identité",
      submittedBy: "host@guestconnect.com",
      submittedAt: "Aujourd'hui",
      status: "pending",
      href: `${base}/users`,
      canPersist: false,
    },
  ];

  return <ApprovalsQueueClient initialItems={items} />;
}

function normalizeStatus(value: unknown): ApprovalItem["status"] {
  if (value === "approved" || value === "rejected" || value === "pending") return value;
  return "pending";
}
