import type { Metadata } from "next";
import { Lato, Dancing_Script } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../hooks/useAuth";

const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-main",
});

const dancingScript = Dancing_Script({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Voisin Créateur",
  description: "Découvrez et achetez les créations uniques des artisans de votre quartier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${lato.variable} ${dancingScript.variable} font-sans antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
