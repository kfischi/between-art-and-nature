"use client";
import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, ArrowUpRight } from 'lucide-react';

export default function LeadsPage() {
  const leads = [
    { id: 1, name: "ישראל ישראלי", email: "israel@example.com", property: "אחוזת צוריאל", date: "2026-03-04", status: "חדש" },
    { id: 2, name: "שרה לוי", email: "sarah@design.com", property: "אחוזת קלמנטינה", date: "2026-03-02", status: "בטיפול" },
    { id: 3, name: "דוד כהן", email: "david@luxury.io", property: "פקיעין", date: "2026-02-28", status: "הושלם" },
  ];

  return (
    <section>
      <header className="mb-12">
        <h2 className="text-3xl font-serif mb-2 uppercase italic tracking-tighter">Inquiries</h2>
        <p className="text-gray-500 text-[10px] uppercase tracking-[0.4em]">ניהול לידים ופניות לקוחות VIP</p>
      </header>

      <div className="bg-white/5 border border-white/10 rounded-sm overflow-hidden">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02]">
              <th className="p-6 text-[10px] uppercase tracking-widest text-gray-500 font-light">לקוח</th>
              <th className="p-6 text-[10px] uppercase tracking-widest text-gray-500 font-light">נכס מבוקש</th>
              <th className="p-6 text-[10px] uppercase tracking-widest text-gray-500 font-light">תאריך</th>
              <th className="p-6 text-[10px] uppercase tracking-widest text-gray-500 font-light">סטטוס</th>
              <th className="p-6 text-[10px] uppercase tracking-widest text-gray-500 font-light text-left">פעולה</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {leads.map((lead, i) => (
              <motion.tr 
                key={lead.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="hover:bg-white/[0.03] transition-colors group"
              >
                <td className="p-6">
                  <div className="text-sm font-serif">{lead.name}</div>
                  <div className="text-[10px] text-gray-500">{lead.email}</div>
                </td>
                <td className="p-6 text-xs text-gray-300 italic">{lead.property}</td>
                <td className="p-6 text-[10px] text-gray-500 tabular-nums">{lead.date}</td>
                <td className="p-6">
                  <span className={`text-[9px] uppercase tracking-widest px-2 py-1 border ${
                    lead.status === 'חדש' ? 'border-gold-500/50 text-gold-200' : 'border-white/10 text-gray-500'
                  }`}>
                    {lead.status}
                  </span>
                </td>
                <td className="p-6 text-left">
                  <button className="text-gray-500 group-hover:text-white transition-colors">
                    <ArrowUpRight size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
