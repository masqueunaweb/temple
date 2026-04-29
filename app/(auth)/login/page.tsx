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
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setMessage('Error al enviar el magic link. Intenta de nuevo.');
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
