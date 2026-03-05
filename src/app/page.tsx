"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const featuredProperties = [
  {
    id: 'galilee-estate',
    title: "אחוזה בגליל",
    location: "ראש פינה",
    image: "https://res.cloudinary.com/decirk3zb/image/upload/v1772401384/1_h9zhkx.webp"
  },
  {
    id: 'pekiin',
    title: "פקיעין",
    location: "סמטאות עתיקות",
    image: "https://res.cloudinary.com/decirk3zb/image/upload/v1772466314/2_g8wy1q.jpg"
  }
];

export default function HomePage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <span className="text-[10px] uppercase tracking-[0.6em] mb-6 block text-gray-400">The Art of Living</span>
          <h1 className="text-6xl md:text-8xl font-serif italic mb-8 tracking-tighter">Atelier Collection</h1>
          <p className="max-w-md mx-auto text-gray-500 text-sm leading-relaxed font-light uppercase tracking-widest">
            אוצרות של אדריכלות, טבע ואירוח סינמטי.
          </p>
        </motion.div>
        
        {/* Background Grain/Texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </section>

      {/* Collection Grid */}
      <section className="px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {featuredProperties.map((prop, i) => (
            <motion.div 
              key={prop.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="group cursor-pointer"
            >
              <Link href={`/${prop.id}`}>
                <div className="relative aspect-[4/5] overflow-hidden mb-6 border border-white/5">
                  <Image 
                    src={prop.image}
                    alt={prop.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-serif italic">{prop.title}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">{prop.location}</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-tighter border-b border-white pb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore Space
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Admin Quick Link - Footer Style */}
      <footer className="py-12 border-t border-white/5 text-center">
        <Link href="/admin" className="text-[9px] uppercase tracking-[0.5em] text-gray-700 hover:text-gold-500 transition-colors">
          Atelier Management System
        </Link>
      </footer>
    </main>
  );
}
