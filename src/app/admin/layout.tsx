"use client";
import Link from 'next/link';
import { LayoutDashboard, FolderKanban, MessageSquare, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 p-8 flex flex-col justify-between">
        <div>
          <div className="mb-12">
            <h1 className="font-serif text-xl tracking-tighter italic">Atelier Admin</h1>
          </div>
          
          <nav className="space-y-6">
            <Link href="/admin" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
              <LayoutDashboard size={18} /> <span className="text-xs uppercase tracking-widest">Overview</span>
            </Link>
            <Link href="/admin/projects" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
              <FolderKanban size={18} /> <span className="text-xs uppercase tracking-widest">Projects</span>
            </Link>
            <Link href="/admin/leads" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
              <MessageSquare size={18} /> <span className="text-xs uppercase tracking-widest">Inquiries</span>
            </Link>
          </nav>
        </div>

        <button className="flex items-center gap-3 text-red-900/50 hover:text-red-500 transition-colors">
          <LogOut size={18} /> <span className="text-[10px] uppercase tracking-widest">Sign Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
