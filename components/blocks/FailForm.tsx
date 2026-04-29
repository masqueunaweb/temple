'use client';

import { useState } from 'react';
import { FAIL_LEVEL_COPY, getFailLevel } from '@/lib/utils';
import { FailLevel } from '@/lib/types';

interface FailFormProps {
  entries: { type: string; fail_reason: string | null }[];
  onSubmit: (reason: string, note?: string) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function FailForm({
  entries,
  onSubmit,
  onCancel,
  isLoading = false,
}: FailFormProps) {
  const [reason, setReason] = useState('');
  const [note, setNote] = useState('');
  const [reflection, setReflection] = useState('');

  const failLevel: FailLevel = reason ? getFailLevel(reason, entries) : 'desliz';
  const copy = FAIL_LEVEL_COPY[failLevel];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    if (failLevel === 'punto_ciego' && !reflection.trim()) {
      return;
    }

    if (failLevel === 'patron' && !note.trim()) {
      return;
    }

    onSubmit(
      reason,
      failLevel === 'patron' ? note : failLevel === 'punto_ciego' ? reflection : note
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-satoshi text-label font-semibold tracking-wider uppercase text-temple-text-secondary mb-2">
          Motivo del fallo
        </label>
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Ej: Falta de tiempo, cansancio..."
          className="w-full bg-transparent border-b border-temple-border py-2 font-satoshi text-body text-temple-text-primary placeholder-temple-text-tertiary focus:outline-none focus:border-temple-accent transition-colors"
          required
        />
      </div>

      {failLevel === 'patron' && (
        <div>
          <label className="block font-satoshi text-label font-semibold tracking-wider uppercase text-temple-text-secondary mb-2">
            Reflexión
          </label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="¿Qué patrón ves en este fallo?"
            className="w-full bg-transparent border-b border-temple-border py-2 font-satoshi text-body text-temple-text-primary placeholder-temple-text-tertiary focus:outline-none focus:border-temple-accent transition-colors"
            required
          />
        </div>
      )}

      {failLevel === 'punto_ciego' && (
        <div>
          <label className="block font-satoshi text-label font-semibold tracking-wider uppercase text-temple-text-secondary mb-2">
            ¿Qué vas a cambiar?
          </label>
          <input
            type="text"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Escribe algo concreto. No retórico."
            className="w-full bg-transparent border-b border-temple-border py-2 font-satoshi text-body text-temple-text-primary placeholder-temple-text-tertiary focus:outline-none focus:border-temple-accent transition-colors"
            required
          />
        </div>
      )}

      {failLevel === 'desliz' && (
        <div>
          <label className="block font-satoshi text-label font-semibold tracking-wider uppercase text-temple-text-secondary mb-2">
            Nota opcional
          </label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Reflexión breve..."
            className="w-full bg-transparent border-b border-temple-border py-2 font-satoshi text-body text-temple-text-primary placeholder-temple-text-tertiary focus:outline-none focus:border-temple-accent transition-colors"
          />
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 py-3 font-satoshi text-label font-semibold tracking-wider uppercase text-temple-text-secondary hover:text-temple-text-primary transition-colors disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-3 font-satoshi text-label font-semibold tracking-wider uppercase bg-temple-text-primary text-temple-bg hover:bg-temple-accent hover:text-temple-accent-text rounded-md transition-colors disabled:opacity-50"
        >
          Registrar
        </button>
      </div>
    </form>
  );
}
