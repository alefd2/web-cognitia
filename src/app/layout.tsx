import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cognitia Tecnologia",
  description: "Transformando ideias em soluções tecnológicas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="/logo-without-margins.svg"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
