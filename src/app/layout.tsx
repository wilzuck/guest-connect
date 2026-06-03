import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
      <body className="min-h-full bg-white text-black flex flex-col font-[var(--font-sans)]">
        {children}
      </body>
    </html>
  );
}
