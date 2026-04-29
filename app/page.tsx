'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useState } from 'react';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Te has unido a la lista de espera.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Error al suscribirse');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Error del servidor');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-temple-bg px-4 relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Botón discreto de login */}
      <Link
        href="/login"
        className="absolute top-4 right-4 p-2 hover:opacity-70 transition-opacity z-20"
        aria-label="Login"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" fill="#0A0A0A"/>
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
                fontSize="16" fontWeight="bold" fill="#FFFFFF">
            T
          </text>
        </svg>
      </Link>

      {/* Lista de espera */}
      <div className="text-center max-w-md w-full relative z-10">
        <h1 className="font-satoshi text-display font-bold tracking-tight mb-4">
          TEMPLE
        </h1>
        <p className="font-satoshi text-body text-temple-text-secondary mb-8">
          27 días. Constancia silenciosa.
        </p>

        <div className="space-y-4">
          <p className="font-satoshi text-body text-temple-text-secondary">
            Únete a la lista de espera.
          </p>

          <form className="flex gap-2" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
              className="flex-1 px-4 py-3 border border-temple-border rounded-md bg-temple-surface text-temple-text-primary placeholder-temple-text-tertiary focus:outline-none focus:border-temple-accent transition-colors duration-150 disabled:opacity-50"
            />
            <Button variant="primary" disabled={status === 'loading'}>
              {status === 'loading' ? '...' : 'Unirse'}
            </Button>
          </form>

          {message && (
            <p className={`font-satoshi text-label ${status === 'success' ? 'text-temple-success' : 'text-temple-error'}`}>
              {message}
            </p>
          )}

          <p className="font-satoshi text-label text-temple-text-tertiary">
            Sin spam. Solo actualizaciones importantes.
          </p>
        </div>
      </div>
    </main>
  );
}
