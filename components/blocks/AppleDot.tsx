'use client';

interface AppleDotProps {
  daysRemaining: number;
  totalDays?: number;
}

export default function AppleDot({ daysRemaining, totalDays = 27 }: AppleDotProps) {
  const percentage = (daysRemaining / totalDays) * 100;
  
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        {/* Outer ring */}
        <div
          className="w-3 h-3 rounded-full bg-temple-accent animate-pulse"
          style={{
            animationDuration: '2s',
          }}
        />
        {/* Inner dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-temple-accent-text" />
        </div>
      </div>
      <span className="font-jetbrains text-mono text-sm text-temple-text-secondary">
        {daysRemaining} / {totalDays}
      </span>
    </div>
  );
}
