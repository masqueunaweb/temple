'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { DIMENSIONS } from '@/lib/constants';
import { Dimension } from '@/lib/types';
import DimensionCard from '@/components/blocks/DimensionCard';
import { createClient } from '@/lib/supabase/client';
import { useStaggerReveal } from '@/hooks/use-stagger-reveal';

export const dynamic = 'force-dynamic';

export default function NewBlockPage() {
  const router = useRouter();
  const [selectedDimension, setSelectedDimension] = useState<Dimension | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const listRef = useStaggerReveal();

  const handleSelect = (dimension: Dimension) => {
    setSelectedDimension(dimension);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    if (!selectedDimension) return;

    setIsCreating(true);
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (!profile) {
      await supabase.from('profiles').insert({ id: user.id });
    }

    const { error } = await supabase
      .from('blocks')
      .insert({
        user_id: user.id,
        dimension: selectedDimension,
        started_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Error creating block:', error);
      setIsCreating(false);
      return;
    }

    router.push('/dashboard');
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setSelectedDimension(null);
  };

  return (
    <>
      <div ref={listRef as React.Ref<HTMLDivElement>} className="space-y-4">
        {DIMENSIONS.map((dimension) => (
          <DimensionCard
            key={dimension.id}
            dimension={dimension}
            index={0}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-temple-bg/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-temple-surface border border-temple-border rounded-md p-8 max-w-md w-full">
            <h2 className="font-satoshi text-heading font-bold tracking-tight mb-4">
              Confirmar Bloque
            </h2>
            <p className="font-satoshi text-body text-temple-text-secondary mb-8">
              Empiezas hoy. 27 días. Sin vuelta atrás.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleCancel}
                disabled={isCreating}
                className="flex-1 py-3 font-satoshi text-label font-semibold tracking-wider uppercase text-temple-text-secondary hover:text-temple-text-primary transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                disabled={isCreating}
                className="flex-1 py-3 font-satoshi text-label font-semibold tracking-wider uppercase bg-temple-text-primary text-temple-bg hover:bg-temple-accent hover:text-temple-accent-text rounded-md transition-colors disabled:opacity-50"
              >
                {isCreating ? 'Creando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
