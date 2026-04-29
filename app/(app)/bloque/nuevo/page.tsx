'use client';

import { useState } from 'react';
import { DIMENSIONS } from '@/lib/constants';
import { Dimension } from '@/lib/types';
import DimensionCard from '@/components/blocks/DimensionCard';

export const dynamic = 'force-dynamic';

export default function NewBlockPage() {
  const [selectedDimension, setSelectedDimension] = useState<Dimension | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSelect = (dimension: Dimension) => {
    setSelectedDimension(dimension);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    // TODO: Implementar creación de bloque en Supabase
    console.log('Creating block for dimension:', selectedDimension);
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setSelectedDimension(null);
  };

  return (
    <>
      <div className="space-y-4">
        {DIMENSIONS.map((dimension, index) => (
          <DimensionCard
            key={dimension.id}
            dimension={dimension}
            index={index}
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
                className="flex-1 py-3 font-satoshi text-label font-semibold tracking-wider uppercase text-temple-text-secondary hover:text-temple-text-primary transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-3 font-satoshi text-label font-semibold tracking-wider uppercase bg-temple-text-primary text-temple-bg hover:bg-temple-accent hover:text-temple-accent-text rounded-md transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
