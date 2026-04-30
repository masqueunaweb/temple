'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { ScrambleText } from '@/components/ui/ScrambleText';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/bloque/nuevo', label: 'Nuevo Bloque' },
    { href: '/registro', label: 'Registro' },
    { href: '/historial', label: 'Historial' },
  ];

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <nav className="border-b border-temple-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="font-satoshi text-display font-bold tracking-tight"
          >
            <ScrambleText text="TEMPLE" />
          </Link>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex gap-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'font-satoshi text-label font-semibold tracking-wider uppercase transition-colors',
                    pathname === link.href
                      ? 'text-temple-accent'
                      : 'text-temple-text-secondary hover:text-temple-text-primary'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-8 h-8 rounded-full bg-temple-surface border border-temple-border flex items-center justify-center text-temple-text-secondary hover:text-temple-text-primary transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="square" strokeLinejoin="miter"/>
                    <circle cx="12" cy="7" r="4" strokeLinecap="square" strokeLinejoin="miter"/>
                  </svg>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-temple-surface border border-temple-border rounded-md py-2 z-50">
                    <Link
                      href="/perfil"
                      className="block px-4 py-2 font-satoshi text-body text-temple-text-primary hover:bg-temple-surface-hover transition-colors"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Perfil
                    </Link>
                    <Link
                      href="/configuracion"
                      className="block px-4 py-2 font-satoshi text-body text-temple-text-primary hover:bg-temple-surface-hover transition-colors"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Configuración
                    </Link>
                    <hr className="border-t border-temple-border my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 font-satoshi text-body text-temple-error hover:bg-temple-surface-hover transition-colors"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
