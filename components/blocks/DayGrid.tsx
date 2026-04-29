import { DayStatus } from '@/lib/types';
import { cn } from '@/lib/utils';

interface DayGridProps {
  days: DayStatus[];
  onDayClick?: (dayNumber: number) => void;
}

export default function DayGrid({ days, onDayClick }: DayGridProps) {
  return (
    <div className="grid grid-cols-9 gap-2">
      {days.map((day) => (
        <button
          key={day.dayNumber}
          onClick={() => onDayClick?.(day.dayNumber)}
          className={cn(
            'aspect-square rounded-lg border transition-all duration-150',
            'flex items-center justify-center text-label',
            {
              'bg-accent text-white border-accent': day.status === 'firma',
              'bg-transparent border-light-border dark:border-dark-border text-light-text dark:text-dark-text':
                day.status === 'pending',
              'bg-transparent border-red-500 text-red-500': day.status === 'fallo',
            }
          )}
        >
          {day.status === 'fallo' ? '✕' : day.dayNumber}
        </button>
      ))}
    </div>
  );
}
