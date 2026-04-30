'use client';

import { DayStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

interface DayGridProps {
  days: DayStatus[];
  onDayClick?: (dayNumber: number) => void;
  currentDay?: number;
}

function getDayCellClass(status: string, isCurrentDay: boolean): string {
  if (status === 'firma') return 'day-cell day-cell--signed';
  if (status === 'fallo') return 'day-cell day-cell--fail';
  if (isCurrentDay && status === 'pending') return 'day-cell day-cell--active';
  return 'day-cell';
}

export default function DayGrid({ days, onDayClick, currentDay }: DayGridProps) {
  return (
    <div className="grid grid-cols-9 gap-2">
      {days.map((day) => {
        const isCurrentDay = currentDay === day.dayNumber;
        const cellClass = getDayCellClass(day.status, isCurrentDay);

        return (
          <button
            key={day.dayNumber}
            onClick={() => onDayClick?.(day.dayNumber)}
            className={cn(
              cellClass,
              'w-9 h-9 flex items-center justify-center font-satoshi text-body font-mono',
              day.status === 'pending' && !isCurrentDay && 'text-temple-text-secondary hover:text-temple-text-primary'
            )}
          >
            {day.status === 'fallo' ? '' : day.dayNumber}
          </button>
        );
      })}
    </div>
  );
}
