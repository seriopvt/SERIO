import React from "react";
import { Search } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nContext";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function SearchInput({
  placeholder,
  value,
  onChange,
  className = "",
}: SearchInputProps) {
  const { t } = useI18n();
  const resolvedPlaceholder = placeholder ?? t("ui.search.placeholder");

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
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-neutral-500)]" size={18} />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={resolvedPlaceholder}
        className="
          bg-transparent flex-1 pl-7
          text-[var(--text-base)] text-[var(--color-neutral-600)]
          placeholder:text-[var(--color-neutral-500)]
          outline-none
        "
      />
    </div>
  );
}
