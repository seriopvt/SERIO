"use client";

import React, { useState, useEffect, useCallback } from "react";
import { BookOpen, Loader2 } from "lucide-react";
import RecipeCatalogCard, { RecipeCatalogCardProps } from "@/components/recipes/RecipeCatalogCard";
import { useI18n } from "@/lib/i18n/I18nContext";

type SavedRecipe = Omit<RecipeCatalogCardProps, "onSave" | "onUnsave" | "saveLoading" | "isSaved">;

export default function CookbookPage() {
  const { locale, t } = useI18n();
  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingIds, setRemovingIds] = useState<Set<number>>(new Set());

  const fetchSaved = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch("/api/recipes/saved")
      .then((r) => {
        if (!r.ok) throw new Error(t("cookbook.error.loadFailed"));
        return r.json();
      })
      .then((data) => setRecipes(data.results ?? []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [locale]);

  useEffect(() => {
    fetchSaved();
  }, [fetchSaved]);

  const handleUnsave = useCallback(async (id: number) => {
    setRemovingIds((s) => new Set(s).add(id));
    try {
      const res = await fetch(`/api/recipes/saved?recipeId=${id}`, { method: "DELETE" });
      if (res.ok) setRecipes((prev) => prev.filter((r) => r.id !== id));
    } finally {
      setRemovingIds((s) => { const n = new Set(s); n.delete(id); return n; });
    }
  }, []);

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-[var(--text-3xl)] font-extrabold text-[var(--color-neutral-900)] leading-tight mb-1">
          {t("cookbook.title")}
        </h1>
        <p className="text-[var(--text-base)] text-[var(--color-neutral-500)]">
          {t("cookbook.subtitle")}
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin text-[var(--color-brand-primary)]" />
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="text-center py-16 text-[var(--color-error)]">{error}</div>
      )}

      {/* Empty state */}
      {!loading && !error && recipes.length === 0 && (
        <div className="text-center py-24">
          <div className="w-16 h-16 rounded-full bg-[var(--color-brand-primary-light)] flex items-center justify-center mx-auto mb-5">
            <BookOpen size={28} className="text-[var(--color-brand-primary)]" />
          </div>
          <h3 className="font-bold text-[var(--text-lg)] text-[var(--color-neutral-700)] mb-2">
            {t("cookbook.emptyTitle")}
          </h3>
          <p className="text-[var(--text-base)] text-[var(--color-neutral-400)] mb-6 max-w-xs mx-auto">
            {t("cookbook.emptySubtitle")}
          </p>
          <a
            href="/home/recipes"
            className="
              inline-flex items-center gap-2
              bg-[var(--color-brand-primary)] text-white
              px-6 py-2.5 rounded-full
              text-[var(--text-base)] font-semibold
              hover:bg-[var(--color-brand-primary-hover)]
              transition-colors shadow-[var(--shadow-brand)]
            "
          >
            {t("cookbook.browse")}
          </a>
        </div>
      )}

      {/* Recipe grid */}
      {!loading && !error && recipes.length > 0 && (
        <>
          <p className="text-[var(--text-sm)] text-[var(--color-neutral-400)] mb-4">
            {t("cookbook.savedCount", {
              count: String(recipes.length),
              suffix: recipes.length !== 1 ? "s" : "",
            })}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recipes.map((recipe) => (
              <RecipeCatalogCard
                key={recipe.id}
                {...recipe}
                isSaved
                onUnsave={handleUnsave}
                saveLoading={removingIds.has(recipe.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
