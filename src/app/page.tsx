"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { locations } from '@/lib/locations';

export default function HomePage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white font-light selection:bg-white/10">
      <section className="h-[60vh] flex flex-col justify-center items-center text-center px-6">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-7xl md:text-9xl font-serif italic mb-4 tracking-tighter">Atelier</motion.h1>
        <p className="text-gray-500 uppercase tracking-[0.5em] text-[10px]">Private Collection of Estates</p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-40 grid grid-cols-1 md:grid-cols-2 gap-20">
        {Object.entries(locations).map(([slug, data], i) => (
          <motion.div key={slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.8 }}>
            <Link href={`/${slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 border border-white/5 mb-6">
                <Image src={data.image} alt={data.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <h3 className="text-3xl font-serif italic mb-2 tracking-tight">{data.name}</h3>
              <p className="text-gray-500 text-[10px] uppercase tracking-widest">Explore Space</p>
            </Link>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
