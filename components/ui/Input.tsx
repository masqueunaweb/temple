import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'w-full px-4 py-3 rounded-lg border border-light-border dark:border-dark-border',
          'bg-transparent text-light-text dark:text-dark-text',
          'placeholder:text-light-text-secondary dark:placeholder:text-dark-text-secondary',
          'focus:outline-none focus:border-accent transition-colors duration-150',
          'text-body',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
