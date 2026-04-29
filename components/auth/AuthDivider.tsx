import React from "react";
import { useI18n } from "@/lib/i18n/I18nContext";

export default function AuthDivider() {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-4 my-6">
      <div className="flex-1 h-px bg-[var(--color-neutral-200)]" />
      <span className="text-[var(--text-xs)] text-[var(--color-neutral-400)] font-medium uppercase tracking-wider">
        {t("common.or")}
      </span>
      <div className="flex-1 h-px bg-[var(--color-neutral-200)]" />
    </div>
  );
}
