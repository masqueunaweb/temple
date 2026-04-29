import { Dimension } from '@/lib/types';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';

const DIMENSIONS: Array<{ id: Dimension; number: string; name: string; description: string }> = [
  { id: 'interior', number: '01', name: 'INTERIOR', description: 'Trabajo mental y espiritual' },
  { id: 'maquina', number: '02', name: 'MÁQUINA', description: 'Salud y rendimiento físico' },
  { id: 'trinchera', number: '03', name: 'TRINCHERA', description: 'Finanzas y recursos' },
  { id: 'afilado', number: '04', name: 'AFILADO', description: 'Habilidades y aprendizaje' },
  { id: 'tribu', number: '05', name: 'TRIBU', description: 'Relaciones y comunidad' },
];

export const dynamic = 'force-dynamic';

export default function NewBlockPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader
        title="Nuevo Bloque"
        subtitle="Elige una dimensión para empezar"
      />

      <div className="mt-8 space-y-4">
        {DIMENSIONS.map((dimension) => (
          <button
            key={dimension.id}
            className="w-full border border-light-border dark:border-dark-border rounded-lg p-6 text-left hover:border-accent transition-colors duration-150"
          >
            <div className="text-label text-light-text-secondary dark:text-dark-text-secondary mb-2">
              {dimension.number}
            </div>
            <h3 className="text-display mb-2">{dimension.name}</h3>
            <p className="text-body text-light-text-secondary dark:text-dark-text-secondary">
              {dimension.description}
            </p>
          </button>
        ))}
      </div>
    </main>
  );
}
