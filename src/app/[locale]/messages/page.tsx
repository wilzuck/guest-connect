import { MessagesInbox, type InboxConversation } from "@/components/messages/MessagesInbox";
import { Container } from "@/components/ui";

const conversations: InboxConversation[] = [
  {
    id: "user-msg-001",
    title: "Arrivée tardive à la maison d'hôtes",
    subtitle: "Maison d'hôtes premium • Réservation GC-102",
    participantName: "Amelia Bohold",
    participantRole: "Hôte",
    lastMessage: "Oui, aucun souci. Je vous envoie le code et le plan d'accès.",
    updatedAt: "10:12",
    unreadCount: 2,
    active: true,
    status: "open",
    messages: [
      {
        id: "m1",
        author: "Vous",
        role: "Voyageur",
        body: "Bonjour, notre vol arrive tard. Pouvons-nous arriver vers 23h30 ?",
        time: "09:58",
        mine: true,
      },
      {
        id: "m2",
        author: "Amelia Bohold",
        role: "Hôte",
        body: "Oui, aucun souci. Je vous enverrai le code d'entrée et le plan d'accès. Vous préférez WhatsApp ou SMS ?",
        time: "10:03",
      },
      {
        id: "m3",
        author: "Vous",
        role: "Voyageur",
        body: "WhatsApp idéal, merci. Nous serons deux, avec un bagage cabine chacun.",
        time: "10:06",
        mine: true,
      },
      {
        id: "m4",
        author: "Amelia Bohold",
        role: "Hôte",
        body: "Parfait. Je vous envoie tout dans l'après-midi. Bon voyage !",
        time: "10:12",
        attachments: [{ id: "att-1", name: "plan-acces.pdf", type: "file" }],
      },
    ],
  },
  {
    id: "user-msg-002",
    title: "Service photo pour le séjour",
    subtitle: "Photographie • Demande de service",
    participantName: "Anav Krick",
    participantRole: "Prestataire",
    lastMessage: "Je peux passer samedi matin, avec une livraison des photos sous 24h.",
    updatedAt: "Hier",
    unreadCount: 0,
    active: true,
    status: "pending",
    messages: [
      {
        id: "m1",
        author: "Vous",
        body: "Bonjour, je cherche un photographe pour quelques photos lifestyle pendant mon séjour.",
        time: "18:02",
        mine: true,
      },
      {
        id: "m2",
        author: "Anav Krick",
        role: "Photographe",
        body: "Je peux passer samedi matin, avec une livraison des photos sous 24h.",
        time: "18:35",
      },
    ],
  },
  {
    id: "user-msg-003",
    title: "Groupe voyage Cotonou",
    subtitle: "Conversation de groupe • 4 membres",
    participantName: "Groupe Cotonou",
    groupName: "Voyage Cotonou",
    group: true,
    lastMessage: "Le chauffeur confirme le départ à 08:30.",
    updatedAt: "Lun.",
    unreadCount: 0,
    active: true,
    status: "open",
    messages: [
      {
        id: "m1",
        author: "Support GuestConnect",
        role: "Support",
        body: "Bienvenue dans le groupe de coordination pour votre séjour.",
        time: "08:20",
      },
      {
        id: "m2",
        author: "Marc Hounsou",
        role: "Chauffeur",
        body: "Le chauffeur confirme le départ à 08:30.",
        time: "08:45",
      },
    ],
  },
];

export default function MessagesPage() {
  return (
    <div className=" border-t border-black/10">
      <Container>
        <MessagesInbox
          title="Messages"
          description="Conversations avec les hôtes, prestataires et groupes de séjour."
          conversations={conversations}
          mode="user"
          withTopBorder={false}
          withBottomBorder={false}
          withLeftBorder={true}
          withRightBorder={true}
        />
      </Container>
    </div>
  );
}
