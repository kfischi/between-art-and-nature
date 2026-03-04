"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  { id: 'caesarea', title: "אחוזת הקיסר", cat: "Luxury", img: "https://images.unsplash.com/photo-1600607687940-477a63bd394c?q=80&w=2070" },
  { id: 'forest', title: "בקתות היער", cat: "Nature", img: "https://images.unsplash.com/photo-1449156001437-3a1661acda22?q=80&w=2070" },
];

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <main className="relative">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070" 
               className="w-full h-full object-cover brightness-[0.5]" alt="Hero" />
        </motion.div>
        
        <div className="relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-[12vw] font-serif leading-none uppercase"
          >
            BE<span className="italic font-light">T</span>WEEN
          </motion.h1>
          <motion.p className="text-[10px] uppercase tracking-[1em] text-gold-200 mt-4">Atelier of Quiet Luxury</motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {projects.map((p) => (
          <Link href={`/project/${p.id}`} key={p.id}>
            <motion.div whileHover={{ scale: 0.98 }} className="group relative aspect-[4/5] overflow-hidden rounded-sm">
              <img src={p.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt={p.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-10 flex flex-col justify-end">
                <p className="text-[10px] uppercase text-gold-200 mb-2 tracking-widest">{p.cat}</p>
                <h2 className="text-4xl font-serif text-white">{p.title}</h2>
                <ArrowUpRight className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-all" />
              </div>
            </motion.div>
          </Link>
        ))}
      </section>
    </main>
  );
}
