import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../hooks/useAuth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const dancingScript = Dancing_Script({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-heading-cursive",
});

export const metadata: Metadata = {
  title: "Voisin Créateur | Soutenez vos artisans locaux",
  description: "Découvrez et achetez les créations uniques des artisans de votre quartier, en click & collect ou livraison.",
  openGraph: {
    title: "Voisin Créateur",
    description: "Le talent de votre voisin, directement chez vous.",
    type: "website",
    locale: "fr_FR",
    siteName: "Voisin Créateur",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${dancingScript.variable} font-sans antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
