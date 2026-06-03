export type MessageThread = {
  id: string;
  subject: string;
  listingTitle: string;
  lastMessage: string;
  updatedAt: string;
  unread: number;
  coverImage: string;
};

export type ThreadMessage = {
  id: string;
  from: "you" | "host" | "support";
  text: string;
  time: string;
};

export const messageThreads: MessageThread[] = [
  {
    id: "msg-102",
    subject: "Arrivée tardive (23h30) — est-ce possible ?",
    listingTitle: "Maison d’hôtes premium",
    lastMessage: "Oui, aucun souci. Je vous envoie le code et le plan d’accès.",
    updatedAt: "Aujourd’hui, 10:12",
    unread: 1,
    coverImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "msg-089",
    subject: "Transfert aéroport + petit-déjeuner",
    listingTitle: "Appartement centre-ville",
    lastMessage: "Je peux organiser le transfert. Pour le petit-déj, c’est 6€ / personne.",
    updatedAt: "Hier, 18:40",
    unread: 0,
    coverImage:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "msg-077",
    subject: "Facture et infos Wi‑Fi",
    listingTitle: "Villa avec jardin",
    lastMessage: "Je vous ai envoyé la facture PDF. Le Wi‑Fi est inclus, très stable.",
    updatedAt: "Lun., 09:05",
    unread: 0,
    coverImage:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1600&q=80",
  },
];

export const threadMessages: Record<string, ThreadMessage[]> = {
  "msg-102": [
    { id: "m1", from: "you", text: "Bonjour, notre vol arrive tard. Pouvons-nous arriver vers 23h30 ?", time: "09:58" },
    {
      id: "m2",
      from: "host",
      text: "Oui, aucun souci. Je vous enverrai le code d’entrée et le plan d’accès. Vous préférez WhatsApp ou SMS ?",
      time: "10:03",
    },
    {
      id: "m3",
      from: "you",
      text: "WhatsApp idéal, merci. Nous serons deux, avec un bagage cabine chacun.",
      time: "10:06",
    },
    {
      id: "m4",
      from: "host",
      text: "Parfait. Je vous envoie tout dans l’après-midi. Bon voyage !",
      time: "10:12",
    },
  ],
  "msg-089": [
    {
      id: "m1",
      from: "you",
      text: "Bonjour, pouvez-vous organiser un transfert aéroport ? Et proposez-vous le petit-déjeuner ?",
      time: "17:50",
    },
    {
      id: "m2",
      from: "host",
      text: "Je peux organiser le transfert. Pour le petit-déj, c’est 6€ / personne, servi entre 7h et 10h.",
      time: "18:40",
    },
  ],
  "msg-077": [
    { id: "m1", from: "you", text: "Bonjour, pourriez-vous fournir une facture, et me confirmer les infos Wi‑Fi ?", time: "08:44" },
    { id: "m2", from: "host", text: "Je vous ai envoyé la facture PDF. Le Wi‑Fi est inclus, très stable.", time: "09:05" },
  ],
};

export function getThread(id: string) {
  return messageThreads.find((t) => t.id === id);
}

