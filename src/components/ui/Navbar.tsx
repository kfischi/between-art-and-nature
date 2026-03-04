"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 px-8 py-6 flex justify-between items-center ${
      scrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent'
    }`}>
      <Link href="/" className="text-xl font-serif tracking-tighter hover:opacity-70 transition-opacity uppercase">
        Art <span className="italic">&</span> Nature
      </Link>
      
      <div className="flex gap-8 items-center text-[10px] uppercase tracking-[0.3em] font-light">
        <Link href="/gallery" className="hover:text-gold-200 transition-colors hidden md:block">האוסף</Link>
        <Link href="/contact" className="border border-white/20 px-6 py-2 hover:bg-white hover:text-black transition-all">
          Contact
        </Link>
      </div>
    </nav>
  );
}
