import type { Metadata } from "next";
import { Geist, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

// Police "Airbnb-like" (sans moderne, proche de Cereal/Circular)
const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "GuestConnect — Maisons d’hôtes premium",
  description:
    "Trouvez et réservez des maisons d’hôtes vérifiées partout dans le monde. Une expérience premium, simple et fiable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${sans.variable} ${display.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-white text-black font-[var(--font-sans)] dark:bg-zinc-950 dark:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}