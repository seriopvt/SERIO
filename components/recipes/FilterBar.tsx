"use client";

import React, { useCallback, useDeferredValue, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nContext";

const DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;

export default function FilterBar() {
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [difficulty, setDifficulty] = useState(searchParams.get("difficulty") ?? "");

  const deferredQ = useDeferredValue(q);

  const push = useCallback(
    (newQ: string, newDiff: string) => {
      const params = new URLSearchParams();
      if (newQ) params.set("q", newQ);
      if (newDiff) params.set("difficulty", newDiff);
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname]
  );

  // Debounce: only push when deferredQ settles
  useEffect(() => {
    push(deferredQ, difficulty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredQ, difficulty]);

  const clearSearch = () => {
    setQ("");
    push("", difficulty);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-8">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search
          size={15}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-neutral-500)] pointer-events-none"
        />
        <input
          type="text"
          id="catalog-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("recipes.filter.searchPlaceholder")}
          className="
            w-full pl-10 pr-10 py-3 rounded-full
            bg-[var(--color-surface-card)]
            border border-[var(--color-neutral-200)]
            text-[var(--text-base)] text-[var(--color-neutral-700)]
            placeholder:text-[var(--color-neutral-500)]
            focus:outline-none focus:border-[var(--color-brand-primary)]
            focus:ring-2 focus:ring-[var(--color-brand-primary-shadow)]
            shadow-[var(--shadow-xs)]
            transition-all duration-[var(--transition-base)]
          "
        />
        {q && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-600)] transition-colors cursor-pointer"
            aria-label={t("recipes.filter.clearSearch")}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Difficulty Chips */}
      <div className="flex items-center gap-2">
        <SlidersHorizontal size={14} className="text-[var(--color-neutral-400)] shrink-0" />
        {DIFFICULTIES.map((d) => {
          const active = difficulty.toLowerCase() === d.toLowerCase();
          return (
            <button
              key={d}
              id={`filter-${d.toLowerCase()}`}
              onClick={() => {
                const next = active ? "" : d;
                setDifficulty(next);
                push(q, next);
              }}
              className={`
                px-3.5 py-1.5 rounded-full text-[var(--text-sm)] font-semibold
                border transition-all duration-[var(--transition-base)] cursor-pointer
                ${
                  active
                    ? "bg-[var(--color-brand-primary)] border-[var(--color-brand-primary)] text-white shadow-[var(--shadow-brand)]"
                    : "border-[var(--color-neutral-200)] text-[var(--color-neutral-500)] hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] bg-[var(--color-surface-card)]"
                }
              `}
            >
              {t(`recipes.difficulty.${d.toLowerCase()}`)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
