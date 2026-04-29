import PageHeader from '@/components/layout/PageHeader';
import DayGrid from '@/components/blocks/DayGrid';
import { DayStatus } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default function RegistroPage() {
  // Mock data - will be fetched from Supabase
  const days: DayStatus[] = Array.from({ length: 27 }, (_, i) => ({
    dayNumber: i + 1,
    status: i < 3 ? 'firma' : i === 3 ? 'fallo' : 'pending',
  }));

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader
        title="Registro"
        subtitle="Historial de tu bloque actual"
      />

      <div className="mt-8">
        <DayGrid days={days} />
      </div>

      <div className="mt-8 border-t border-light-border dark:border-dark-border pt-8">
        <h2 className="text-display mb-4">Resumen</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-label mb-1">Firmas</p>
            <p className="text-display">3</p>
          </div>
          <div>
            <p className="text-label mb-1">Fallos</p>
            <p className="text-display">1</p>
          </div>
          <div>
            <p className="text-label mb-1">Pendientes</p>
            <p className="text-display">23</p>
          </div>
        </div>
      </div>
    </main>
  );
}
