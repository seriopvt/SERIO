import React from "react";

interface FormInputProps {
  id: string;
  name: string;
  type?: string;
  label: string;
  placeholder: string;
  required?: boolean;
  minLength?: number;
  icon: React.ReactNode;
  /** Optional trailing element (e.g. password toggle) */
  trailing?: React.ReactNode;
  /** Label-level trailing element (e.g. "Forgot password?" link) */
  labelTrailing?: React.ReactNode;
}

export default function FormInput({
  id,
  name,
  type = "text",
  label,
  placeholder,
  required = true,
  minLength,
  icon,
  trailing,
  labelTrailing,
}: FormInputProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label
          htmlFor={id}
          className="text-[var(--text-sm)] font-semibold text-[var(--color-neutral-700)]"
        >
          {label}
        </label>
        {labelTrailing}
      </div>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-neutral-500)]">
          {icon}
        </span>
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          minLength={minLength}
          placeholder={placeholder}
          className="
            w-full pl-11 pr-11 py-3
            bg-white border border-[var(--color-neutral-200)]
            rounded-[var(--radius-xl)]
            text-[var(--text-base)] text-[var(--color-neutral-900)]
            placeholder:text-[var(--color-neutral-500)]
            focus:outline-none focus:border-[var(--color-brand-primary)]
            focus:ring-2 focus:ring-[var(--color-brand-primary-shadow)]
            transition-all duration-[var(--transition-base)]
          "
        />
        {trailing && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {trailing}
          </span>
        )}
      </div>
    </div>
  );
}
