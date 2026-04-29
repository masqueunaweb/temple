'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

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
    console.log('Bypass mode:', isDevBypass, 'Value:', process.env.NEXT_PUBLIC_DEV_BYPASS);

    if (isDevBypass) {
      console.log('Using bypass mode - logging in as dev user');
      // Usar un usuario de desarrollo pre-creado para evitar rate limit
      const devEmail = process.env.NEXT_PUBLIC_DEV_EMAIL || 'dev@temple.app';
      const devPassword = process.env.NEXT_PUBLIC_DEV_PASSWORD || 'temple-dev-123';

      const { data, error } = await supabase.auth.signInWithPassword({
        email: devEmail,
        password: devPassword,
      });

      if (error) {
        console.error('Dev login error:', error);
        setMessage(`Error: Usuario dev no configurado. Crea el usuario ${devEmail} en Supabase con contraseña ${devPassword}`);
      } else {
        setMessage('Login dev exitoso. Redirigiendo...');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      }
      return;
    }

    // Normal magic flow
    console.log('Using magic link mode');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error('Supabase error:', error);
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Magic link enviado a tu email. Revisa tu bandeja de entrada.');
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-display mb-4">TEMPLE</h1>
          <p className="text-body text-light-text-secondary dark:text-dark-text-secondary mb-8">
            27 días. Constancia silenciosa.
          </p>
          <p className="text-xs text-amber-500 mb-4">
            🛠️ BYPASS: {process.env.NEXT_PUBLIC_DEV_BYPASS || 'NO CONFIGURADO'}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-label mb-2">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full py-4">
            {loading ? 'Enviando...' : 'Entrar'}
          </Button>

          {message && (
            <p className="text-body text-center text-light-text-secondary dark:text-dark-text-secondary">
              {message}
            </p>
          )}

          <p className="text-body text-center text-light-text-secondary dark:text-dark-text-secondary text-sm">
            Sin cuenta. Sin contraseña. Solo tu email.
          </p>
        </form>
      </div>
    </main>
  );
}
