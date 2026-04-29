'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const supabase = createClient();

    // Dev bypass: si está habilitado, permite login directo sin magic link
    const isDevBypass = process.env.NEXT_PUBLIC_DEV_BYPASS === 'true';

    if (isDevBypass) {
      const devEmail = process.env.NEXT_PUBLIC_DEV_EMAIL || 'dev@temple.app';
      const devPassword = process.env.NEXT_PUBLIC_DEV_PASSWORD || 'temple-dev-123';

      const { data, error } = await supabase.auth.signInWithPassword({
        email: devEmail,
        password: devPassword,
      });

      if (error) {
        setMessage(`Error: Usuario dev no configurado.`);
      } else {
        setMessage('Login dev exitoso. Redirigiendo...');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      }
      setLoading(false);
      return;
    }

    // Normal magic flow
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage(`Email inválido.`);
    } else {
      setMessage('Revisa tu email.');
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="font-satoshi text-display font-bold tracking-tight mb-4">
            TEMPLE
          </h1>
          <p className="font-satoshi text-body text-temple-text-secondary mb-8">
            27 días. Constancia silenciosa.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full bg-transparent border-b border-temple-border py-3 font-satoshi text-body text-temple-text-primary placeholder-temple-text-tertiary focus:outline-none focus:border-temple-accent transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full font-satoshi text-label font-semibold tracking-wider uppercase text-temple-text-primary hover:text-temple-accent transition-colors disabled:opacity-50 text-left"
          >
            {loading ? 'Enviando...' : 'Entrar →'}
          </button>

          {message && (
            <p className="font-satoshi text-body text-center text-temple-text-secondary">
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
