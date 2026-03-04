"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <main className="bg-black min-h-screen pt-40 px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-serif mb-12 uppercase"
        >
          Let's create <br /> <span className="italic text-gray-500 text-5xl md:text-7xl">something eternal</span>
        </motion.h1>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 border-t border-white/10 pt-20">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-500">Full Name</label>
            <input type="text" className="bg-transparent border-b border-white/20 py-4 focus:border-gold-200 outline-none transition-colors" placeholder="Kfir Schilder" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-500">Email Address</label>
            <input type="email" className="bg-transparent border-b border-white/20 py-4 focus:border-gold-200 outline-none transition-colors" placeholder="hello@atelier.com" />
          </div>
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-gray-500">Your Vision</label>
            <textarea className="bg-transparent border-b border-white/20 py-4 focus:border-gold-200 outline-none transition-colors resize-none" rows={4} placeholder="Describe your project..." />
          </div>
          <button className="md:col-span-2 bg-white text-black py-6 text-xs uppercase tracking-[0.5em] font-bold hover:bg-gold-200 transition-all">
            Send Inquiry
          </button>
        </form>

        <footer className="mt-32 pb-10 flex flex-col md:flex-row justify-between text-[10px] uppercase tracking-widest text-gray-600 border-t border-white/5 pt-10">
          <div className="flex gap-10">
            <span>Instagram</span>
            <span>LinkedIn</span>
          </div>
          <div className="mt-4 md:mt-0">© 2026 Multibrawn</div>
        </footer>
      </div>
    </main>
  );
}
