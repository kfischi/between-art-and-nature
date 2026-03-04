"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Maximize, Users, ArrowDown } from 'lucide-react';

// --- Interface ---
interface PropertyPageProps {
  loc: {
    name: string;
    description: string;
    image: string;
    imageFeatured?: string;
    // הוסף כאן שדות נוספים אם קיימים ב-loc שלך
  };
}

export default function PropertyPage({ loc }: PropertyPageProps) {
  return (
    <main className="bg-[#0A0A0A] text-white min-h-screen">
      
      {/* 1. Hero Section - Cinematic Entry */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src={loc.imageFeatured || loc.image} 
            alt={loc.name}
            className="w-full h-full object-cover brightness-[0.6]"
          />
        </motion.div>

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end items-center pb-20 px-6 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold-200 text-[10px] uppercase tracking-[0.5em] mb-6"
          >
            The Collection / Property Archive
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-8xl font-serif uppercase tracking-tighter"
          >
            {loc.name}
          </motion.h1>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-12 text-gray-500"
          >
            <ArrowDown size={20} strokeWidth={1} />
          </motion.div>
        </div>
      </section>

      {/* 2. Specs Bar - Luxury Minimalist */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-y border-white/5 bg-[#0D0D0D]">
        {[
          { icon: <MapPin size={16}/>, label: "Location", value: "North Galilee" },
          { icon: <Users size={16}/>, label: "Capacity", value: "Private Stay" },
          { icon: <Maximize size={16}/>, label: "Architecture", value: "Stone & Glass" },
          { icon: <span className="text-[10px] font-bold italic">B&N</span>, label: "Curation", value: "Selected" },
        ].map((item, i) => (
          <div key={i} className="p-10 border-r border-white/5 flex flex-col gap-3 items-center text-center">
            <div className="text-gold-500/50">{item.icon}</div>
            <span className="text-[9px] uppercase tracking-widest text-gray-500">{item.label}</span>
            <span className="text-sm font-light italic">{item.value}</span>
          </div>
        ))}
      </div>

      {/* 3. Narrative Section */}
      <section className="py-32 px-6 md:px-24 max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
        <div className="md:w-1/2">
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-gold-500 mb-8 block">Concept</h2>
          <h3 className="text-3xl md:text-5xl font-serif leading-tight mb-8">
            היכן שהזמן <br /> <span className="italic text-gray-400 font-light">מפסיק לזוז.</span>
          </h3>
          <p className="text-gray-400 font-light leading-relaxed text-lg">
            {loc.description}
          </p>
        </div>
        
        <div className="md:w-1/2 flex items-center justify-center">
           <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm group">
              <img 
                src={loc.image} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
                alt="Detail View"
              />
              <div className="absolute inset-0 border border-white/10 m-4 pointer-events-none" />
           </div>
        </div>
      </section>

      {/* 4. Action Section (Scouting) */}
      <section className="py-40 bg-[#0F0F0F] text-center border-t border-white/5">
        <h4 className="text-[10px] uppercase tracking-[0.6em] text-gray-500 mb-10">Exclusive Access</h4>
        <button className="group relative px-12 py-6 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] overflow-hidden">
          <span className="relative z-10">בקשת סיור אוצרות</span>
          <motion.div 
            className="absolute inset-0 bg-gold-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          />
        </button>
      </section>
    </main>
  );
}
