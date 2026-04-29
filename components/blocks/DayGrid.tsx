import { DayStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

interface DayGridProps {
  days: DayStatus[];
  onDayClick?: (dayNumber: number) => void;
  currentDay?: number;
}

export default function DayGrid({ days, onDayClick, currentDay }: DayGridProps) {
  return (
    <div className="grid grid-cols-9 gap-2">
      {days.map((day) => {
        const isCurrentDay = currentDay === day.dayNumber;
        const isPending = day.status === 'pending';

        return (
          <button
            key={day.dayNumber}
            onClick={() => onDayClick?.(day.dayNumber)}
            className={cn(
              'w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150',
              'font-satoshi text-body font-mono',
              {
                'bg-temple-text-primary text-temple-bg hover:bg-temple-accent hover:text-temple-accent-text':
                  day.status === 'firma',
                'border border-temple-border text-temple-text-secondary hover:text-temple-text-primary':
                  day.status === 'pending' && !isCurrentDay,
                'border border-temple-error text-temple-error':
                  day.status === 'fallo',
              },
              isCurrentDay && isPending && 'border-temple-accent animate-pulse'
            )}
          >
            {day.status === 'fallo' ? '✕' : day.dayNumber}
          </button>
        );
      })}
    </div>
  );
}
