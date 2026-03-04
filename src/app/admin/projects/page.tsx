"use client";
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminProjects() {
  const projects = [
    { id: 1, title: "אחוזת הקיסר", status: "Published", img: "https://images.unsplash.com/photo-1600607687940-477a63bd394c?q=80&w=200" },
    { id: 2, title: "בקתות היער", status: "Draft", img: "https://images.unsplash.com/photo-1449156001437-3a1661acda22?q=80&w=200" },
  ];

  return (
    <section>
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-3xl font-serif">פרויקטים באוסף</h2>
        <button className="bg-white text-black px-6 py-3 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-gold-200 transition-all">
          <Plus size={14} /> Add New
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="flex items-center gap-6 p-4 bg-white/5 border border-white/5 hover:border-white/20 transition-all rounded-sm">
            <img src={p.img} className="w-16 h-16 object-cover rounded-sm" />
            <div className="flex-1">
              <h4 className="text-sm font-serif">{p.title}</h4>
              <span className={`text-[9px] uppercase tracking-widest ${p.status === 'Published' ? 'text-green-500' : 'text-amber-500'}`}>
                {p.status}
              </span>
            </div>
            <div className="flex gap-4">
              <Edit2 size={16} className="text-gray-500 cursor-pointer hover:text-white transition-colors" />
              <Trash2 size={16} className="text-gray-500 cursor-pointer hover:text-red-500 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
