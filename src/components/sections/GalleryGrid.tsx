"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

const items = [
  { id: 'caesarea', title: "אחוזת הקיסר", img: "https://images.unsplash.com/photo-1600607687940-477a63bd394c?q=80&w=2070" },
  { id: 'forest', title: "בקתות היער", img: "https://images.unsplash.com/photo-1449156001437-3a1661acda22?q=80&w=2070" },
];

export default function GalleryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
          viewport={{ once: true }}
          className="group relative aspect-[16/10] overflow-hidden bg-white/5"
        >
          <Link href={`/project/${item.id}`}>
            <img 
              src={item.img} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
              alt={item.title} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end">
              <h3 className="text-2xl font-serif text-white">{item.title}</h3>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
