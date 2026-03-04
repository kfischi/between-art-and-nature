"use client";
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <motion.div 
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070" 
          alt="Nature" 
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      <div className="relative z-10 text-center px-4">
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-7xl md:text-[12vw] font-serif leading-none tracking-tighter uppercase text-white"
        >
          Art <span className="italic font-light text-gray-400">&</span> Nature
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-[10px] uppercase tracking-[0.8em] text-gold-200 mt-6"
        >
          Limited Edition Living
        </motion.p>
      </div>
    </section>
  );
}
