import React from "react";

interface ProgressBarProps {
  value: number; // 0–100
  className?: string;
}

export default function ProgressBar({
  value,
  className = "",
}: ProgressBarProps) {
  return (
    <div
      className={`w-14 h-1.5 rounded-full bg-[var(--color-neutral-100)] overflow-hidden ${className}`}
    >
      <div
        className="h-full rounded-full bg-[var(--color-brand-primary)] transition-all duration-[var(--transition-slow)]"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
