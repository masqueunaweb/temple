import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { FailLevel } from '@/lib/types';
import { getFailLevel } from '@/lib/utils';

interface FailFormProps {
  entries: any[];
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

  const failLevel = reason ? getFailLevel(reason, entries) : 'desliz';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    if (failLevel === 'punto_ciego' && !reflection.trim()) {
      alert('Debes escribir qué vas a cambiar');
      return;
    }

    if (failLevel === 'patron' && !note.trim()) {
      alert('Debes escribir una reflexión');
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
        <label className="block text-label mb-2">Motivo del fallo</label>
        <Input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Ej: Falta de tiempo, cansancio..."
          required
        />
      </div>

      {failLevel === 'patron' && (
        <div>
          <label className="block text-label mb-2">
            Reflexión (obligatorio - patrón detectado)
          </label>
          <Input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="¿Qué patrón ves en este fallo?"
            required
          />
        </div>
      )}

      {failLevel === 'punto_ciego' && (
        <div>
          <label className="block text-label mb-2">
            ¿Qué vas a cambiar? (obligatorio - punto ciego)
          </label>
          <Input
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Acción concreta para evitar repetir"
            required
          />
        </div>
      )}

      {failLevel === 'desliz' && (
        <div>
          <label className="block text-label mb-2">Nota opcional</label>
          <Input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Reflexión breve..."
          />
        </div>
      )}

      <div className="flex gap-4">
        <Button
          type="button"
          onClick={onCancel}
          variant="secondary"
          className="flex-1"
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" className="flex-1" disabled={isLoading}>
          Registrar fallo
        </Button>
      </div>
    </form>
  );
}
