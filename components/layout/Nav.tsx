import Link from 'next/link';
import { cn } from '@/lib/utils';

interface NavProps {
  currentPath?: string;
}

export default function Nav({ currentPath = '/' }: NavProps) {
  const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/bloque/nuevo', label: 'Nuevo Bloque' },
    { href: '/registro', label: 'Registro' },
  ];

  return (
    <nav className="border-b border-light-border dark:border-dark-border">
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-display font-light">
            TEMPLE
          </Link>
          <div className="flex gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-label transition-colors duration-150',
                  currentPath === link.href
                    ? 'text-accent'
                    : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
