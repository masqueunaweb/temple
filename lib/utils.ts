import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Entry, FailLevel } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFailLevel(failReason: string, entries: Entry[]): FailLevel {
  const sameReasonCount = entries.filter(
    (e) => e.type === 'fallo' && e.fail_reason === failReason
  ).length;

  if (sameReasonCount >= 2) return 'punto_ciego';
  if (sameReasonCount === 1) return 'patron';
  return 'desliz';
}

export function getDayNumber(startedAt: string): number {
  const start = new Date(startedAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.min(diffDays, 27);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
  });
}
