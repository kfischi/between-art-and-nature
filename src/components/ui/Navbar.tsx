"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // אפקט שינוי רקע בגלילה
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // סגירת התפריט כשעוברים דף
  useEffect(() => setIsOpen(false), [pathname]);

  const navLinks = [
    { name: 'האוסף', href: '/' },
    { name: 'אמנות וטבע', href: '/about' },
    { name: 'צור קשר', href: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-6 py-6 md:px-12 ${
        scrolled ? 'bg-black/80 backdrop-blur-lg py-4 border-b border-white/5' : 'bg-transparent'
      }`}>
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="relative z-[110] group">
            <motion.div className="text-xl font-serif tracking-tighter text-white">
              BETWEEN <span className="italic font-light text-gray-400 group-hover:text-gold-200 transition-colors">Art & Nature</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-[10px] uppercase tracking-[0.4em] text-gray-300 hover:text-white transition-colors relative"
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div layoutId="nav-underline" className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gold-200" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[110] flex flex-col gap-1.5 md:hidden p-2"
          >
            <motion.div 
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-6 h-[1px] bg-white origin-center" 
            />
            <motion.div 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-[1px] bg-white" 
            />
            <motion.div 
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-6 h-[1px] bg-white origin-center" 
            />
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[105] bg-[#0A0A0A] flex flex-col justify-center items-center px-6"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Link 
                    href={link.href}
                    className="text-4xl font-serif text-white hover:italic transition-all"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom Info in Menu */}
            <div className="absolute bottom-12 flex flex-col items-center gap-4">
               <div className="w-8 h-[1px] bg-gold-500/30" />
               <p className="text-[10px] uppercase tracking-[0.5em] text-gray-500">Multibrawn Atelier</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
