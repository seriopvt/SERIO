import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

const paddingStyles = {
  sm: "p-4",
  md: "p-5",
  lg: "p-8",
};

export default function Card({
  children,
  className = "",
  padding = "md",
}: CardProps) {
  return (
    <div
      className={`
        bg-[var(--color-surface-card)]
        rounded-[var(--radius-2xl)]
        border border-[var(--color-neutral-100)]
        shadow-[var(--shadow-sm)]
        transition-colors duration-300
        ${paddingStyles[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
