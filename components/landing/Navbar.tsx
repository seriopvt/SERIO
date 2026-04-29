 "use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nContext";

export default function Navbar() {
  const { t } = useI18n();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[var(--color-neutral-100)]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[var(--color-brand-primary)] rounded-[var(--radius-lg)] flex items-center justify-center">
            <span className="text-white font-bold text-lg">✕</span>
          </div>
          <div>
            <span className="text-[var(--text-base)] font-bold text-[var(--color-neutral-900)] leading-none">
              {t("common.appName")}
            </span>
            <span className="text-[10px] text-[var(--color-neutral-400)] tracking-wider uppercase ml-1.5">
              {t("common.appTagline")}
            </span>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-[var(--text-base)] text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-900)] transition-colors"
          >
            {t("landing.nav.features")}
          </a>
          <a
            href="#how-it-works"
            className="text-[var(--text-base)] text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-900)] transition-colors"
          >
            {t("landing.nav.howItWorks")}
          </a>
          <a
            href="#testimonials"
            className="text-[var(--text-base)] text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-900)] transition-colors"
          >
            {t("landing.nav.testimonials")}
          </a>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-[var(--text-base)] font-semibold text-[var(--color-neutral-600)] hover:text-[var(--color-neutral-900)] transition-colors px-4 py-2"
          >
            {t("landing.nav.login")}
          </Link>
          <Link
            href="/signup"
            className="
              inline-flex items-center gap-2
              bg-[var(--color-brand-primary)] text-white
              px-5 py-2.5 rounded-full
              text-[var(--text-base)] font-semibold
              hover:bg-[var(--color-brand-primary-hover)]
              transition-colors shadow-[var(--shadow-brand)]
            "
          >
            {t("landing.nav.getStarted")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
