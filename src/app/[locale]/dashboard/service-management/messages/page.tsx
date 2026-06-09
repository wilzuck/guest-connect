import { MessagesInbox, type InboxConversation } from "@/components/messages/MessagesInbox";

const adminConversations: InboxConversation[] = [
  {
    id: "admin-msg-001",
    title: "Question avant réservation",
    subtitle: "Logement • Maison d'hôtes premium",
    participantName: "Camille Dupont",
    participantRole: "Voyageur",
    lastMessage: "Est-ce possible d'ajouter un lit bébé pour la nuit du 14 ?",
    updatedAt: "10:28",
    unreadCount: 3,
    active: true,
    status: "pending",
    messages: [
      {
        id: "m1",
        author: "Camille Dupont",
        role: "Voyageur",
        body: "Bonjour, est-ce possible d'ajouter un lit bébé pour la nuit du 14 ?",
        time: "10:15",
      },
      {
        id: "m2",
        author: "Hôte GuestConnect",
        role: "Hôte",
        body: "Oui, nous en avons un disponible. Je laisse le support confirmer l'ajout à la réservation.",
        time: "10:22",
      },
      {
        id: "m3",
        author: "Camille Dupont",
        role: "Voyageur",
        body: "Merci, je veux bien la confirmation officielle.",
        time: "10:28",
      },
    ],
  },
  {
    id: "admin-msg-002",
    title: "Demande service photo",
    subtitle: "Service • Photographie",
    participantName: "Groupe séjour Bohicon",
    groupName: "Séjour Bohicon",
    group: true,
    lastMessage: "Le prestataire propose deux créneaux, samedi 9h ou dimanche 16h.",
    updatedAt: "09:40",
    unreadCount: 1,
    active: true,
    status: "open",
    messages: [
      {
        id: "m1",
        author: "Nadia Bio",
        role: "Voyageur",
        body: "Nous voulons réserver une séance photo pendant notre expérience locale.",
        time: "09:12",
      },
      {
        id: "m2",
        author: "Photo Pro",
        role: "Prestataire",
        body: "Je propose deux créneaux, samedi 9h ou dimanche 16h.",
        time: "09:40",
        attachments: [{ id: "att-1", name: "portfolio-photo.zip", type: "file" }],
      },
    ],
  },
  {
    id: "admin-msg-003",
    title: "Signalement paiement Mobile Money",
    subtitle: "Paiement • Réservation GC-227",
    participantName: "Marc Hounsou",
    participantRole: "Voyageur",
    lastMessage: "Le débit est passé mais la réservation reste en attente.",
    updatedAt: "Hier",
    unreadCount: 0,
    active: false,
    status: "closed",
    messages: [
      {
        id: "m1",
        author: "Marc Hounsou",
        role: "Voyageur",
        body: "Le débit Mobile Money est passé mais la réservation reste en attente.",
        time: "17:06",
      },
      {
        id: "m2",
        author: "Admin GuestConnect",
        role: "Support",
        body: "Nous avons vérifié la transaction et clôturé le ticket après confirmation.",
        time: "18:20",
        mine: true,
      },
    ],
  },
];

export default function Page() {
  return (
    <MessagesInbox
      title="Messages"
      description="Répondez aux voyageurs, hôtes, prestataires et groupes depuis une seule interface."
      conversations={adminConversations}
      mode="admin"
      withTopBorder={false}
      withBottomBorder={false}
    />
  );
}
