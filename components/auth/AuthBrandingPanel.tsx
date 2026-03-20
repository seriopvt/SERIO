import React from "react";
import Link from "next/link";

interface AuthBrandingPanelProps {
  heading: React.ReactNode;
  subtitle: string;
  /** Bottom section — either a quote or feature list */
  footer: React.ReactNode;
}

export default function AuthBrandingPanel({
  heading,
  subtitle,
  footer,
}: AuthBrandingPanelProps) {
  return (
    <div className="hidden lg:flex w-[45%] bg-gradient-to-br from-[#3a2a1a] to-[#1e1510] relative overflow-hidden flex-col justify-between p-12">
      {/* Decorative radial gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(232,101,44,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(232,101,44,0.1),transparent_50%)]" />

      <div className="relative z-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 mb-16">
          <div className="w-9 h-9 bg-[var(--color-brand-primary)] rounded-[var(--radius-lg)] flex items-center justify-center">
            <span className="text-white font-bold text-xl">✕</span>
          </div>
          <span className="text-[var(--text-md)] font-bold text-white leading-none">
            SERIO
          </span>
        </Link>

        <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
          {heading}
        </h2>
        <p className="text-[var(--text-md)] text-white/60 max-w-sm leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Footer content */}
      <div className="relative z-10 border-t border-white/10 pt-6">
        {footer}
      </div>
    </div>
  );
}
