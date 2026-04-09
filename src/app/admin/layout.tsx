'use client';

import { usePathname, useRouter } from 'next/navigation';
import { LayoutGrid, FileText, Image, LogOut } from 'lucide-react';

const NAV = [
  { href: '/admin/dashboard', label: 'Pagine', icon: LayoutGrid },
  { href: '/admin/copy', label: 'Copy Studio', icon: FileText },
  { href: '/admin/visuals', label: 'Visual Generator', icon: Image },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Login page: no sidebar
  if (pathname === '/admin') return <>{children}</>;

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-[#08080C] text-white flex">

      {/* Sidebar */}
      <aside className="w-56 border-r border-white/[0.07] flex flex-col shrink-0">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/[0.07]">
          <img src="/brand/logo bianco.png" alt="Gleeye" className="h-7" />
          <span className="block mt-1 font-satoshi text-[9px] uppercase tracking-[0.2em] text-white/20">
            Admin Panel
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <a key={href} href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  active
                    ? 'bg-white/10 text-white'
                    : 'text-white/30 hover:bg-white/[0.05] hover:text-white/60'
                }`}>
                <Icon size={14} />
                <span className="font-satoshi text-xs font-bold uppercase tracking-[0.12em]">{label}</span>
              </a>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/[0.07]">
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/20 hover:text-white/50 hover:bg-white/[0.04] transition-all w-full">
            <LogOut size={14} />
            <span className="font-satoshi text-xs font-bold uppercase tracking-[0.12em]">Esci</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
