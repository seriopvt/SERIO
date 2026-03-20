import React from "react";
import { Plus } from "lucide-react";

interface BadgeProps {
  label: string;
  onClick?: () => void;
  showPlus?: boolean;
}

export default function Badge({
  label,
  onClick,
  showPlus = true,
}: BadgeProps) {
  return (
    <button
      onClick={onClick}
      className="
        inline-flex items-center gap-1.5
        px-4 py-2 rounded-full
        border border-[var(--color-neutral-200)]
        text-[var(--text-base)] text-[var(--color-neutral-600)]
        bg-[var(--color-surface-card)]
        hover:border-[var(--color-brand-primary)]
        hover:text-[var(--color-brand-primary)]
        transition-colors duration-[var(--transition-base)]
        cursor-pointer
      "
    >
      {showPlus && <Plus size={14} />}
      {label}
    </button>
  );
}
