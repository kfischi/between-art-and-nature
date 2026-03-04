"use client";
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ATELIER_PROPERTIES } from '@/lib/constants'; // וודא שהקובץ הזה קיים ב-lib

export default function ProjectPage() {
  const { id } = useParams();
  const project = ATELIER_PROPERTIES.find(p => p.id === id);

  if (!project) return (
    <div className="h-screen flex items-center justify-center font-serif italic uppercase tracking-widest">
      Project Archive Not Found
    </div>
  );

  return (
    <article className="bg-black text-white">
      {/* Cinematic Cover */}
      <section className="h-[90vh] relative flex items-center justify-center overflow-hidden">
        <motion.img 
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={project.images[0]} 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 text-center px-4">
           <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold-200 text-[10px] uppercase tracking-[0.5em] mb-6 block">
             Atelier Collection No. {project.id === 'caesarea' ? '01' : '02'}
           </motion.span>
           <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-6xl md:text-[10vw] font-serif uppercase tracking-tighter">
             {project.title}
           </motion.h1>
        </div>
      </section>

      {/* Property Details & Narrative */}
      <section className="py-40 px-6 md:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-7">
            <h2 className="text-3xl font-serif mb-10 leading-tight italic">"{project.description}"</h2>
            <div className="space-y-6 text-gray-400 font-light leading-relaxed max-w-xl">
               <p>כל פרט בנכס הזה נבחר בקפידה כדי לייצר חוויה סינמטית. המעבר בין הפנים לחוץ מטושטש, מה שמאפשר לטבע להפוך לחלק בלתי נפרד מהבית.</p>
            </div>
          </div>
          <div className="md:col-span-5 border-l border-white/10 pl-12 space-y-8">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold-500/50 block mb-2">Architect</span>
              <p className="font-serif text-xl">{project.architect}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold-500/50 block mb-2">Location</span>
              <p className="font-serif text-xl">{project.location}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold-500/50 block mb-2">Atmosphere</span>
              <p className="font-serif text-xl italic">{project.vibe}</p>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
