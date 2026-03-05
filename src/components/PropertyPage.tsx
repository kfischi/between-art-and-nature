"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { LocationData } from '@/lib/locations';

export default function PropertyPage({ loc }: { loc: LocationData }) {
  return (
    <main className="bg-[#050505] min-h-screen text-white font-light">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <Image 
            src={loc.imageFeatured || loc.image} 
            alt={loc.name} 
            fill 
            className="object-cover"
            priority 
          />
        </motion.div>
        
        <div className="z-10 text-center px-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.6em] text-gold-500 mb-4 block"
          >
            Atelier Collection
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-serif italic tracking-tighter"
          >
            {loc.name}
          </motion.h1>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
          <div className="w-[1px] h-12 bg-white"></div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-32 px-6 max-w-4xl mx-auto text-center">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xl md:text-2xl font-serif leading-relaxed italic text-gray-300"
        >
          {loc.description}
        </motion.p>
      </section>

      {/* Gallery Grid */}
      <section className="px-6 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loc.gallery.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative aspect-square bg-neutral-900 border border-white/5 overflow-hidden group"
            >
              <Image 
                src={img} 
                alt={`${loc.name} gallery ${i}`} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="py-20 border-t border-white/5 text-center">
        <a href="/" className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
          Back to Collection
        </a>
      </footer>
    </main>
  );
}
