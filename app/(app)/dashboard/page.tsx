import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import SignButton from '@/components/blocks/SignButton';
import { getActiveBlock, getTodayEntry } from '@/lib/supabase/queries';
import { getDayNumber } from '@/lib/utils';
import { DIMENSIONS } from '@/lib/constants';

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
  const dimension = DIMENSIONS.find(d => d.id === activeBlock.dimension);

  const dayString = currentDay.toString().padStart(2, '0');

  return (
    <div className="space-y-12">
      <div className="text-center space-y-2">
        <p className="font-satoshi text-display font-bold tracking-tight">
          {dayString}
        </p>
        <p className="font-satoshi text-label font-semibold tracking-wider uppercase text-temple-text-secondary">
          {dimension?.name}
        </p>
      </div>

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
  );
}
