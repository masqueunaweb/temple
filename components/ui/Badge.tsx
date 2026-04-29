import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline';
}

export default function Badge({
  className,
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 rounded text-label',
        {
          'bg-accent text-white': variant === 'default',
          'border border-light-border dark:border-dark-border text-light-text dark:text-dark-text':
            variant === 'outline',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
