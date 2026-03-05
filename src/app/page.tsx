"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { locations } from '@/lib/locations';

export default function HomePage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white font-light tracking-tight">
      <section className="py-32 px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-7xl md:text-9xl font-serif italic mb-6">Atelier</motion.h1>
        <p className="text-gray-500 uppercase tracking-[0.5em] text-[10px]">Private Collection of Estates</p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-32 grid grid-cols-1 md:grid-cols-2 gap-24">
        {Object.entries(locations).map(([slug, data], i) => (
          <motion.div key={slug} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
            <Link href={`/${slug}`} className="group">
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900 border border-white/5 mb-6">
                <Image src={data.image} alt={data.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <h3 className="text-3xl font-serif italic mb-2">{data.name}</h3>
              <p className="text-gray-500 text-xs uppercase tracking-widest">Explore Space</p>
            </Link>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
