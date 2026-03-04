"use client";
import { motion } from 'framer-motion';
// הוספנו כאן את MessageSquare לרשימת הייבוא
import { TrendingUp, Users, Eye, MessageSquare } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: "Total Views", value: "12.4K", icon: <Eye size={16}/> },
    { label: "Active Inquiries", value: "8", icon: <MessageSquare size={16}/> },
    { label: "Portfolio Value", value: "$4.2M", icon: <TrendingUp size={16}/> },
  ];

  return (
    <section>
      <header className="mb-12">
        <h2 className="text-3xl font-serif mb-2">שלום, כפיר</h2>
        <p className="text-gray-500 text-xs uppercase tracking-widest">כאן מנהלים את הסטנדרט הבא.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-white/5 border border-white/10 rounded-sm"
          >
            <div className="text-gold-500 mb-4">{stat.icon}</div>
            <div className="text-2xl font-serif mb-1">{stat.value}</div>
            <div className="text-[10px] uppercase tracking-widest text-gray-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity / Leads */}
      <div className="bg-white/5 border border-white/10 p-8 rounded-sm">
        <h3 className="text-sm uppercase tracking-widest mb-6 border-b border-white/10 pb-4">פניות אחרונות מלקוחות</h3>
        <div className="space-y-6">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex justify-between items-center group cursor-pointer">
              <div>
                <p className="text-sm font-medium">לקוח VIP - אחוזת הקיסר</p>
                <p className="text-[10px] text-gray-500 uppercase mt-1">לפני שעתיים • kfir@example.com</p>
              </div>
              <button className="text-[10px] uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity border-b border-white">View Message</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
