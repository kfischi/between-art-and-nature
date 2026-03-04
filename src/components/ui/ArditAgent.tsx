"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export default function ArditAgent() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      
      {/* Tooltip / Greeting */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="bg-white text-black p-4 rounded-sm shadow-2xl relative mb-2"
          >
            <button 
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -left-2 bg-black text-white rounded-full p-1 shadow-lg hover:scale-110 transition-transform"
            >
              <X size={10} />
            </button>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold leading-tight">
              שלום, אני ערדית. <br /> <span className="font-light opacity-60 italic">כיצד אוכל לאצור עבורך חוויה?</span>
            </p>
            {/* Triangle tail */}
            <div className="absolute bottom-[-6px] right-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gold-200/20"
      >
        <div className="absolute inset-0 bg-gold-200/20 rounded-full animate-ping group-hover:animate-none" />
        <div className="flex flex-col items-center">
          <span className="text-[8px] font-black tracking-widest text-black mb-0.5">ARDIT</span>
          <div className="w-1 h-1 bg-gold-500 rounded-full" />
        </div>
      </motion.button>
    </div>
  );
}
