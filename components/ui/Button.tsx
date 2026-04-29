import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-150',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          {
            'bg-accent text-white hover:bg-opacity-90 focus:ring-accent':
              variant === 'primary',
            'bg-transparent border border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:bg-light-text hover:text-white dark:hover:bg-dark-text dark:hover:text-light-bg':
              variant === 'secondary',
            'bg-transparent text-light-text dark:text-dark-text hover:opacity-70':
              variant === 'ghost',
          },
          {
            'px-3 py-2 text-sm': size === 'sm',
            'px-4 py-3 text-base': size === 'md',
            'px-6 py-4 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
