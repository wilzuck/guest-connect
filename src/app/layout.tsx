import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
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
      className={`${inter.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-white text-black flex flex-col font-[var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
