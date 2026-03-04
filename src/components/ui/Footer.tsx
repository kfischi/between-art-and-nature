"use client";
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 pt-24 pb-12 px-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-8">
            <h3 className="font-serif text-3xl tracking-tighter uppercase italic">
              Between <br /> <span className="not-italic opacity-50 text-xl">Art & Nature</span>
            </h3>
            <p className="text-gray-500 text-sm font-light max-w-xs leading-relaxed">
              אוצרות של מרחבים המשלבים אדריכלות מודרנית עם שלווה אורגנית.
              חלק מפרויקט Multibrawn.
            </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold-500/60 block">Navigate</span>
              <nav className="flex flex-col gap-2 text-xs font-light text-gray-400">
                <Link href="/" className="hover:text-white transition-colors">האוסף</Link>
                <Link href="/journal" className="hover:text-white transition-colors">מגזין</Link>
                <Link href="/about" className="hover:text-white transition-colors">הסטודיו</Link>
              </nav>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold-500/60 block">Social</span>
              <nav className="flex flex-col gap-2 text-xs font-light text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors">Pinterest</a>
              </nav>
            </div>

            <div className="space-y-4 hidden md:block">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold-500/60 block">Contact</span>
              <p className="text-xs font-light text-gray-400 leading-relaxed">
                Givat Haim Ihud <br />
                Israel
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-8 text-[9px] uppercase tracking-[0.4em] text-gray-600">
          <p>© {currentYear} MULTIBRAWN ATELIER. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-white transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
