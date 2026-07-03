import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FavoritesProvider } from "@repo/ui";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mi Tienda",
  description: "Descripción de la tienda para Google y redes. Cambiala.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <FavoritesProvider>{children}</FavoritesProvider>
      </body>
    </html>
  );
}
