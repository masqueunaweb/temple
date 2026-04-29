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
    if (process.env.NEXT_PUBLIC_DEV_BYPASS === 'true') {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: 'dev-bypass', // Contraseña dummy para bypass
      });

      if (error) {
        // Si el usuario no existe, crearlo
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password: 'dev-bypass',
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (signUpError) {
          console.error('Supabase error:', signUpError);
          setMessage(`Error: ${signUpError.message}`);
        } else {
          setMessage('Login dev bypass exitoso. Redirigiendo...');
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 1000);
        }
      } else {
        setMessage('Login dev bypass exitoso. Redirigiendo...');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      }
    } else {
      // Normal magic flow
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
