import React from "react";
import { ArrowRight } from "lucide-react";

interface SubmitButtonProps {
  isLoading: boolean;
  label: string;
}

export default function SubmitButton({ isLoading, label }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="
        w-full flex items-center justify-center gap-2
        bg-[var(--color-brand-primary)] text-white
        px-6 py-3 rounded-[var(--radius-xl)]
        text-[var(--text-base)] font-semibold
        hover:bg-[var(--color-brand-primary-hover)]
        transition-all duration-[var(--transition-base)]
        shadow-[var(--shadow-brand)]
        disabled:opacity-60 disabled:cursor-not-allowed
        cursor-pointer
      "
    >
      {isLoading ? (
        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          {label}
          <ArrowRight size={16} />
        </>
      )}
    </button>
  );
}
