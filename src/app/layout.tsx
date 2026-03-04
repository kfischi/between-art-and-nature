import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import ArditAgent from "@/components/ui/ArditAgent";

const serif = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-serif' 
});

const sans = Inter({ subsets: ["latin"], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Between Art & Nature | Luxury Atelier",
  description: "Experience the intersection of architectural art and natural beauty.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-black text-ivory antialiased overflow-x-hidden">
        <Navbar />
        {children}
        <ArditAgent />
      </body>
    </html>
  );
}
