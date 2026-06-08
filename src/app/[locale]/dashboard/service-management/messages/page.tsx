import { UserAccessTable } from "@/components/admin/UserAccessTable";

const conversations = [
  {
    id: "msg-001",
    name: "Question avant réservation",
    email: "Camille Dupont -> Hôte GuestConnect",
    role: "Logement",
    status: "Ouvert",
  },
  {
    id: "msg-002",
    name: "Demande de service photo",
    email: "Prestataire Photo Pro -> Voyageur",
    role: "Service",
    status: "En cours",
  },
  {
    id: "msg-003",
    name: "Support arrivée tardive",
    email: "Support -> Marc Hounsou",
    role: "Support",
    status: "Prioritaire",
  },
];

export default function Page() {
  return (
    <UserAccessTable
      title="Messages"
      description="Centralisez les conversations voyageurs, hôtes, prestataires et support."
      addLabel="Nouveau message"
      rows={conversations}
    />
  );
}
