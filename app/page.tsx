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
        setMessage('¡Te has unido a la lista de espera!');
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
    <main className="min-h-screen flex flex-col items-center justify-center bg-light-bg dark:bg-dark-bg px-4 relative">
      {/* Botón discreto de login admin */}
      <Link
        href="/login"
        className="absolute top-4 right-4 p-2 hover:opacity-70 transition-opacity"
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
      <div className="text-center max-w-md w-full">
        <h1 className="text-display text-6xl font-bold mb-4">TEMPLE</h1>
        <p className="text-body text-xl text-light-text-secondary dark:text-dark-text-secondary mb-8">
          27 días. Constancia silenciosa.
        </p>

        <div className="space-y-4">
          <p className="text-body text-light-text-secondary dark:text-dark-text-secondary">
            Únete a la lista de espera y sé el primero en acceder.
          </p>

          <form className="flex gap-2" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
              className="flex-1 px-4 py-3 border border-light-border dark:border-dark-border rounded-lg bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text placeholder-light-text-secondary dark:placeholder-dark-text-secondary focus:outline-none focus:border-accent transition-colors duration-150 disabled:opacity-50"
            />
            <Button variant="primary" disabled={status === 'loading'}>
              {status === 'loading' ? '...' : 'Unirse'}
            </Button>
          </form>

          {message && (
            <p className={`text-label ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          <p className="text-label text-light-text-secondary dark:text-dark-text-secondary">
            Sin spam. Solo actualizaciones importantes.
          </p>
        </div>
      </div>
    </main>
  );
}
