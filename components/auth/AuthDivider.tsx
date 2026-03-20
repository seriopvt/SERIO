import React from "react";

export default function AuthDivider() {
  return (
    <div className="flex items-center gap-4 my-6">
      <div className="flex-1 h-px bg-[var(--color-neutral-200)]" />
      <span className="text-[var(--text-xs)] text-[var(--color-neutral-400)] font-medium uppercase tracking-wider">
        or
      </span>
      <div className="flex-1 h-px bg-[var(--color-neutral-200)]" />
    </div>
  );
}
