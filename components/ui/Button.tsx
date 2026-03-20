import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-brand-primary)] text-white hover:bg-[var(--color-brand-primary-hover)] shadow-[var(--shadow-brand)]",
  secondary:
    "bg-[var(--color-surface-card)] text-[var(--color-neutral-600)] border border-[var(--color-neutral-200)] hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)]",
  ghost:
    "bg-transparent text-[var(--color-neutral-500)] hover:bg-[var(--color-neutral-50)] hover:text-[var(--color-neutral-700)]",
  icon:
    "bg-[var(--color-neutral-50)] text-[var(--color-neutral-500)] hover:bg-[var(--color-neutral-100)] rounded-full aspect-square !p-0 flex items-center justify-center",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-[var(--text-xs)]",
  md: "px-5 py-2.5 text-[var(--text-base)]",
  lg: "px-6 py-3 text-[var(--text-base)]",
};

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: "w-8 h-8",
  md: "w-9 h-9",
  lg: "w-10 h-10",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const isIcon = variant === "icon";

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold rounded-full cursor-pointer
        transition-all duration-[var(--transition-base)]
        ${variantStyles[variant]}
        ${isIcon ? iconSizeStyles[size] : sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
