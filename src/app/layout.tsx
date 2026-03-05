import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// פונט בסיס מודרני
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// פונט Serif יוקרתי לכותרות (הסגנון של מיליון דולר)
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  style: ['italic', 'normal'],
  variable: "--font-playfair" 
});

export const metadata: Metadata = {
  title: "The Artists — אוסף מתחמי אירוח",
  description: "חוויית אירוח סינמטית המשלבת אדריכלות, טבע ואומנות מקומית.",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#050505] text-white antialiased overflow-x-hidden">
        {/* הגדרה גלובלית של רקע וצבע טקסט */}
        <div className="relative min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
