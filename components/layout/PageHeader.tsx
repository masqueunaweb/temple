import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="border-b border-light-border dark:border-dark-border px-4 py-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-display mb-2">{title}</h1>
            {subtitle && (
              <p className="text-body text-light-text-secondary dark:text-dark-text-secondary">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      </div>
    </div>
  );
}
