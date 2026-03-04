"use client";
import { useParams } from 'next/navigation';
import { ATELIER_PROPERTIES } from '@/lib/constants';
import { motion } from 'framer-motion';

export default function PropertyPage() {
  const { id } = useParams();
  const property = ATELIER_PROPERTIES.find(p => p.id === id);

  if (!property) return <div className="h-screen flex items-center justify-center">Property Not Found</div>;

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Cinematic Hero */}
      <section className="h-screen relative overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={property.images[0]} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-12 md:p-24 bg-gradient-to-t from-black via-transparent">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-gold-200 text-[10px] uppercase tracking-[0.5em] mb-4"
          >
            {property.vibe}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-[10vw] font-serif leading-none"
          >
            {property.title}
          </motion.h1>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-32 px-6 md:px-24 grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-8 underline decoration-gold-500/30 underline-offset-8">
            Concept & Architecture
          </h2>
          <p className="text-xl font-serif italic text-gray-300 leading-relaxed">
            "{property.description}"
          </p>
        </div>
        <div className="flex flex-col gap-4 text-xs font-light tracking-widest text-gray-500 uppercase">
          <p>Architect: {property.architect}</p>
          <p>Location: {property.location}</p>
          <p>Status: Private Collection</p>
        </div>
      </section>

      {/* Image Showcase - Large Full Bleed */}
      <section className="px-6 pb-32">
        <div className="aspect-video bg-white/5 overflow-hidden">
           <img src={property.images[0]} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
        </div>
      </section>
    </div>
  );
}
