import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARS Metals | Jouw Partner voor Industriële Diensten",
  description:
    "ARS Metals biedt expertise in industriële las- en montagewerken, rook- en warmteafvoer, service & onderhoud en meer. Al meer dan 10 jaar uw betrouwbare partner.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body className="bg-white">{children}</body>
    </html>
  );
}
