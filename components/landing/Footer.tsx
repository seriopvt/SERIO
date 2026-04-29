 "use client";

import React from "react";
import { useI18n } from "@/lib/i18n/I18nContext";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-[var(--color-neutral-100)] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[var(--color-brand-primary)] rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xs">✕</span>
          </div>
          <span className="text-[var(--text-base)] font-bold text-[var(--color-neutral-900)]">
            {t("common.appName")}
          </span>
        </div>
        <p className="text-[var(--text-sm)] text-[var(--color-neutral-400)]">
          {t("landing.footer.rights")}
        </p>
      </div>
    </footer>
  );
}
