"use client";
import { motion } from 'framer-motion';
import { Edit2, ExternalLink, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AdminProjects() {
  const properties = [
    { id: 'zuriel', name: "אחוזת צוריאל", status: "Published", visitors: "1.2K" },
    { id: 'pekiin', name: "פקיעין", status: "Published", visitors: "850" },
    { id: 'galilee-estate', name: "אחוזה בגליל", status: "Published", visitors: "2.1K" },
    { id: 'clementine', name: "אחוזת קלמנטינה", status: "Draft", visitors: "0" },
  ];

  return (
    <section>
      <div className="flex justify-between items-end mb-12">
        <header>
          <h2 className="text-3xl font-serif mb-2 uppercase italic tracking-tighter">Projects</h2>
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.4em]">ניהול ארכיון הנכסים</p>
        </header>
        <button className="flex items-center gap-2 px-6 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-gold-200 transition-colors">
          <Plus size={14} /> Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {properties.map((prop, i) => (
          <motion.div 
            key={prop.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between p-6 bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
          >
            <div className="flex items-center gap-8">
              <span className="text-[10px] text-gray-600 font-mono italic">0{i+1}</span>
              <div>
                <h3 className="text-lg font-serif">{prop.name}</h3>
                <span className="text-[9px] uppercase tracking-widest text-gold-500/60">{prop.status}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-12 text-[10px] uppercase tracking-widest text-gray-500">
              <div className="hidden md:block text-center">
                <p className="mb-1 text-gray-600">Performance</p>
                <p className="text-white italic">{prop.visitors} Views</p>
              </div>
              <div className="flex gap-4">
                <button className="p-2 hover:text-white transition-colors"><Edit2 size={16} /></button>
                <Link href={`/${prop.id}`} className="p-2 hover:text-white transition-colors"><ExternalLink size={16} /></Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
