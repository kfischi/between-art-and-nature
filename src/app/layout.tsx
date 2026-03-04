import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ArditAgent from "@/components/ui/ArditAgent";

const serif = Cormorant_Garamond({ 
  subsets: ["latin"], 
  variable: '--font-serif',
  weight: ['300', '400', '500', '600'] 
});

const sans = Inter({ subsets: ["latin"], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Between Art & Nature | Atelier",
  description: "Exclusive Portfolio Curation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-black text-white antialiased">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <ArditAgent />
        <Footer />
      </body>
    </html>
  );
}
