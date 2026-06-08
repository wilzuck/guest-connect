import { UserAccessTable } from "@/components/admin/UserAccessTable";

const reservations = [
  {
    id: "res-001",
    name: "Maison d'hôtes premium",
    email: "Camille Dupont - 12 juin au 15 juin",
    role: "3 nuits",
    status: "Confirmée",
  },
  {
    id: "res-002",
    name: "Appartement centre-ville",
    email: "Fatou Ndiaye - 18 juin au 20 juin",
    role: "2 nuits",
    status: "À valider",
  },
  {
    id: "res-003",
    name: "Villa avec jardin",
    email: "Marc Hounsou - 24 juin au 29 juin",
    role: "5 nuits",
    status: "Paiement en attente",
  },
];

export default function Page() {
  return (
    <UserAccessTable
      title="Réservations"
      description="Suivez les demandes, paiements, confirmations et échanges liés aux séjours."
      addLabel="Créer une réservation"
      rows={reservations}
    />
  );
}
