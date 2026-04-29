'use client';

import { useState } from 'react';
import FailForm from './FailForm';
import { FAIL_LEVEL_COPY, getFailLevel } from '@/lib/utils';
import { FailLevel } from '@/lib/types';

interface FailModalProps {
  entries: { type: string; fail_reason: string | null }[];
  onSubmit: (reason: string, note?: string) => void;
  onClose: () => void;
  isLoading?: boolean;
}

export default function FailModal({
  entries,
  onSubmit,
  onClose,
  isLoading = false,
}: FailModalProps) {
  const [reason, setReason] = useState('');
  const failLevel: FailLevel = reason ? getFailLevel(reason, entries) : 'desliz';
  const copy = FAIL_LEVEL_COPY[failLevel];

  return (
    <div className="fixed inset-0 bg-temple-bg/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-temple-surface border border-temple-border rounded-md p-8 max-w-md w-full">
        <h2 className="font-satoshi text-heading font-bold tracking-tight mb-2">
          {copy.title}
        </h2>
        <p className="font-satoshi text-body text-temple-text-secondary mb-6">
          {copy.subtitle}
        </p>

        <FailForm
          entries={entries}
          onSubmit={onSubmit}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
