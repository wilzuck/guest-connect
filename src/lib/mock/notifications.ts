export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "reservation" | "message" | "security" | "promo";
  read: boolean;
};

export const notifications: NotificationItem[] = [
  {
    id: "ntf-301",
    title: "Message de l’hôte",
    description: "Votre hôte a envoyé les infos d’arrivée (code, plan d’accès).",
    time: "Aujourd’hui, 10:12",
    type: "message",
    read: false,
  },
  {
    id: "ntf-289",
    title: "Réservation confirmée (démo)",
    description: "Votre séjour est confirmé. Vérifiez les détails et l’heure d’arrivée.",
    time: "Hier, 20:05",
    type: "reservation",
    read: true,
  },
  {
    id: "ntf-241",
    title: "Conseil sécurité",
    description: "Activez une authentification forte pour protéger votre compte.",
    time: "Mar., 09:30",
    type: "security",
    read: true,
  },
  {
    id: "ntf-221",
    title: "Nouveauté",
    description: "Les expériences locales sont désormais visibles sur la page logement.",
    time: "Lun., 17:10",
    type: "promo",
    read: true,
  },
];

