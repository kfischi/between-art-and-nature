"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Maximize, User, Share2 } from 'lucide-react';

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();

  // כאן בעתיד נמשוך נתונים לפי ה-ID. כרגע זה Placeholder יוקרתי.
  return (
    <main className="bg-black min-h-screen">
      {/* Back Button */}
      <nav className="fixed top-0 w-full z-50 px-8 py-10 flex justify-between items-center mix-blend-difference">
        <button onClick={() => router.back()} className="flex items-center gap-2 group text-white">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-[0.3em]">Back</span>
        </button>
        <Share2 size={18} className="text-white cursor-pointer hover:text-gold-200 transition-colors" />
      </nav>

      {/* Hero Image */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1600607687940-477a63bd394c?q=80&w=2070" 
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-12 left-8 md:left-20">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold-200 text-[10px] uppercase tracking-[0.5em] mb-4 block">
            The Collection
          </motion.span>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-6xl md:text-9xl font-serif text-white uppercase">
            {params.id === 'caesarea' ? 'אחוזת הקיסר' : 'בקתות היער'}
          </motion.h1>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 border-y border-white/10 bg-[#0d0d0d]">
        {[
          { icon: <MapPin size={14}/>, label: "Location", value: "קיסריה" },
          { icon: <Maximize size={14}/>, label: "Space", value: "720 sqm" },
          { icon: <User size={14}/>, label: "Client", value: "Confidential" },
          { icon: <Share2 size={14}/>, label: "Year", value: "2025" },
        ].map((item, i) => (
          <div key={i} className="p-10 border-r border-white/10 flex flex-col gap-2">
            <span className="text-[9px] uppercase tracking-widest text-gray-500">{item.label}</span>
            <span className="text-sm font-light text-ivory italic">{item.value}</span>
          </div>
        ))}
      </section>

      {/* Content Section */}
      <section className="py-32 px-8 md:px-32 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl font-serif mb-8 leading-tight uppercase tracking-tighter">
            איזון מושלם בין <br /> <span className="italic">חומר לרוח</span>
          </h2>
          <p className="text-gray-400 font-light leading-relaxed text-lg">
            הפרויקט הזה נולד מתוך רצון לייצר חלל שלא רק נראה טוב, אלא מרגיש נכון. השימוש באור טבעי כאלמנט עיצובי מרכזי מאפשר לנכס להשתנות לאורך שעות היום.
          </p>
        </div>
        <div className="aspect-square bg-white/5 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-700" />
        </div>
      </section>
    </main>
  );
}
