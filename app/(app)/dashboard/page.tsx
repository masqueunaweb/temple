import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';
import SignButton from '@/components/blocks/SignButton';
import { getActiveBlock, getTodayEntry, getEntriesByBlock } from '@/lib/supabase/queries';
import { getDayNumber } from '@/lib/utils';

// Forzar renderizado dinámico
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const activeBlock = await getActiveBlock(user.id);

  if (!activeBlock) {
    redirect('/bloque/nuevo');
  }

  const currentDay = getDayNumber(activeBlock.started_at);
  const todayEntry = await getTodayEntry(activeBlock.id, currentDay);
  const entries = await getEntriesByBlock(activeBlock.id);

  const signedCount = entries.filter((e) => e.type === 'firma').length;
  const failedCount = entries.filter((e) => e.type === 'fallo').length;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader
        title={`Día ${currentDay} de 27`}
        subtitle={`${activeBlock.dimension.toUpperCase()}`}
      />

      <div className="mt-8 space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-light-border dark:border-dark-border rounded-lg p-4">
            <p className="text-label mb-1">Firmas</p>
            <p className="text-display">{signedCount}</p>
          </div>
          <div className="border border-light-border dark:border-dark-border rounded-lg p-4">
            <p className="text-label mb-1">Fallos</p>
            <p className="text-display">{failedCount}</p>
          </div>
        </div>

        <div className="border border-light-border dark:border-dark-border rounded-lg p-8">
          <SignButton
            isSigned={todayEntry?.type === 'firma'}
            isFailed={todayEntry?.type === 'fallo'}
            onSign={async () => {
              'use server';
              // Server action implementation
            }}
            onFail={async () => {
              'use server';
              // Server action implementation
            }}
          />
        </div>
      </div>
    </main>
  );
}
