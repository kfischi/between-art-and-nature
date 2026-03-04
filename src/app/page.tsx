"use client";
import Hero from "@/components/sections/Hero";
import GalleryGrid from "@/components/sections/GalleryGrid";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden">
      <Hero />
      
      <section className="py-32 px-6 md:px-12 bg-[#0A0A0A]">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8"
          >
            <div className="max-w-2xl">
              <span className="text-[10px] uppercase tracking-[0.6em] text-gold-500/60 block mb-6">The Collection</span>
              <h2 className="text-5xl md:text-7xl font-serif leading-tight uppercase">
                ארבעה מרחבים, <br /> <span className="italic font-light opacity-60">סיפור אחד</span>
              </h2>
            </div>
            <p className="text-gray-500 font-light text-sm max-w-xs leading-relaxed italic">
              "אוצרות מדויקת של נכסים המגדירים מחדש את המפגש בין האדריכלות לטבע."
            </p>
          </motion.div>

          <GalleryGrid />
        </div>
      </section>
    </div>
  );
}
