import React from "react";
import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function SearchInput({
  placeholder = "Search...",
  value,
  onChange,
  className = "",
}: SearchInputProps) {
  return (
    <div
      className={`
        flex items-center
        bg-[var(--color-neutral-50)] rounded-full
        px-4 py-3
        border border-[var(--color-neutral-100)]
        focus-within:border-[var(--color-brand-primary)]
        focus-within:ring-2 focus-within:ring-[var(--color-brand-primary-shadow)]
        transition-all duration-[var(--transition-base)]
        ${className}
      `}
    >
      <Search size={18} className="text-[var(--color-neutral-400)] mr-3 flex-shrink-0" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          bg-transparent flex-1
          text-[var(--text-base)] text-[var(--color-neutral-600)]
          placeholder-[var(--color-neutral-300)]
          outline-none
        "
      />
    </div>
  );
}
