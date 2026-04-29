'use client';

import { useState } from 'react';
import DayGrid from '@/components/blocks/DayGrid';
import { DayStatus } from '@/lib/types';
import { DIMENSIONS } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export default function RegistroPage() {
  const [selectedDay, setSelectedDay] = useState<DayStatus | null>(null);

  // Mock data - will be fetched from Supabase
  const days: DayStatus[] = Array.from({ length: 27 }, (_, i) => ({
    dayNumber: i + 1,
    status: i < 3 ? 'firma' : i === 3 ? 'fallo' : 'pending',
  }));

  const currentDay: number = 4;
  const dimension = DIMENSIONS[0]; // Mock - will come from active block
  const signedCount = days.filter((d) => d.status === 'firma').length;
  const failedCount = days.filter((d) => d.status === 'fallo').length;

  const handleDayClick = (dayNumber: number) => {
    const day = days.find((d) => d.dayNumber === dayNumber);
    if (day) setSelectedDay(day);
  };

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="font-satoshi text-heading font-bold tracking-tight">
            {dimension.name}
          </h1>
          <p className="font-jetbrains text-mono text-temple-text-secondary">
            {signedCount + failedCount} / 27
          </p>
        </div>

        <DayGrid days={days} onDayClick={handleDayClick} currentDay={currentDay} />

        {currentDay === 27 && (
          <div className="border-t border-temple-border pt-8">
            <p className="font-satoshi text-body text-temple-text-secondary">
              Bloque completado. 27 / 27.
            </p>
          </div>
        )}
      </div>

      {selectedDay && (
        <div
          className="fixed inset-x-0 bottom-0 bg-temple-surface border-t border-temple-border p-6 z-50"
          onClick={() => setSelectedDay(null)}
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <p className="font-satoshi text-label font-semibold tracking-wider uppercase text-temple-text-secondary">
                Día {selectedDay.dayNumber}
              </p>
              <button className="text-temple-text-secondary hover:text-temple-text-primary">
                ✕
              </button>
            </div>
            {selectedDay.status === 'firma' && (
              <p className="font-satoshi text-body text-temple-text-primary">
                Firmado.
              </p>
            )}
            {selectedDay.status === 'fallo' && (
              <>
                <p className="font-satoshi text-body text-temple-error mb-2">
                  Fallo.
                </p>
                {selectedDay.note && (
                  <p className="font-satoshi text-body text-temple-text-secondary">
                    {selectedDay.note}
                  </p>
                )}
              </>
            )}
            {selectedDay.status === 'pending' && (
              <p className="font-satoshi text-body text-temple-text-secondary">
                Pendiente.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
