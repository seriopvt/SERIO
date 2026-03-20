import React from "react";

interface AvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: "w-8 h-8 text-[var(--text-xs)]",
  md: "w-9 h-9 text-[var(--text-sm)]",
  lg: "w-11 h-11 text-[var(--text-base)]",
};

export default function Avatar({
  initials,
  size = "md",
  className = "",
}: AvatarProps) {
  return (
    <div
      className={`
        rounded-full
        bg-gradient-to-br from-orange-300 to-[var(--color-brand-primary)]
        flex items-center justify-center
        text-white font-semibold
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {initials}
    </div>
  );
}
