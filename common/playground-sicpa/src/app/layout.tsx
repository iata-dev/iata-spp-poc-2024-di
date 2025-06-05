import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from './footer';
import Header from './header';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "End to End Proof of Concept 2024",
  description: "Sicpa.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: "white" }}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
