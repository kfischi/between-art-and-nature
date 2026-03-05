"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { locations } from '@/lib/locations';

export default function HomePage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white">
      <section className="py-24 text-center">
        <h1 className="text-7xl font-serif italic mb-4">Atelier</h1>
        <p className="text-gray-500 uppercase tracking-widest text-[10px]">Private Collection</p>
      </section>

      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 pb-24">
        {Object.entries(locations).map(([slug, data]) => (
          <Link href={`/${slug}`} key={slug} className="group">
            <div className="relative aspect-[16/10] overflow-hidden border border-white/5 mb-4">
              <Image src={data.image} alt={data.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
            </div>
            <h3 className="text-2xl font-serif italic">{data.name}</h3>
          </Link>
        ))}
      </section>
    </main>
  );
}
