'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';

export default function Nav() {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/bloque/nuevo', label: 'Nuevo Bloque' },
    { href: '/registro', label: 'Registro' },
  ];

  return (
    <nav className="border-b border-temple-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="font-satoshi text-display font-bold tracking-tight"
          >
            TEMPLE
          </Link>
          <div className="flex items-center gap-6">
            <div className="flex gap-6">
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
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
