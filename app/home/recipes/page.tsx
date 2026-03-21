"use client";

import React, { useCallback } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import RecipeCatalogCard, { RecipeCatalogCardProps } from "@/components/recipes/RecipeCatalogCard";
import FilterBar from "@/components/recipes/FilterBar";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

const SKELETON_GRADIENTS = [
  ["#fff7ed", "#fef3c7"],
  ["#fff1f2", "#fff7ed"],
  ["#fef9c3", "#fff7ed"],
  ["#f0fdf4", "#fefce8"],
  ["#fff5f5", "#fff1f2"],
  ["#fff8f0", "#fef3c7"],
  ["#fef3c7", "#fff7ed"],
  ["#fff7ed", "#fefce8"],
  ["#fff1f2", "#fef9c3"],
];

interface PaginatedRecipe extends Omit<RecipeCatalogCardProps, "onSave" | "onUnsave" | "saveLoading" | "isSaved"> {}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

function RecipeGrid() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const difficulty = searchParams.get("difficulty") ?? "";
  const page = parseInt(searchParams.get("page") ?? "1", 10);

  const [data, setData] = React.useState<{ results: PaginatedRecipe[]; pagination: Pagination } | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [savedIds, setSavedIds] = React.useState<Set<number>>(new Set());
  const [loadingIds, setLoadingIds] = React.useState<Set<number>>(new Set());

  React.useEffect(() => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (difficulty) params.set("difficulty", difficulty);
    params.set("page", String(page));
    fetch(`/api/recipes?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => setError("Failed to load recipes"))
      .finally(() => setLoading(false));
  }, [q, difficulty, page]);

  const handleSave = useCallback(async (id: number) => {
    setLoadingIds((s) => new Set(s).add(id));
    try {
      const res = await fetch("/api/recipes/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId: id }),
      });
      if (res.ok || res.status === 409) setSavedIds((s) => new Set(s).add(id));
    } finally {
      setLoadingIds((s) => { const n = new Set(s); n.delete(id); return n; });
    }
  }, []);

  const handleUnsave = useCallback(async (id: number) => {
    setLoadingIds((s) => new Set(s).add(id));
    try {
      const res = await fetch(`/api/recipes/saved?recipeId=${id}`, { method: "DELETE" });
      if (res.ok) setSavedIds((s) => { const n = new Set(s); n.delete(id); return n; });
    } finally {
      setLoadingIds((s) => { const n = new Set(s); n.delete(id); return n; });
    }
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 9 }).map((_, i) => {
          const [g1, g2] = SKELETON_GRADIENTS[i % SKELETON_GRADIENTS.length];
          return (
            <div key={i} className="bg-white rounded-[var(--radius-2xl)] border border-[var(--color-neutral-100)] shadow-[var(--shadow-sm)] overflow-hidden animate-pulse">
              <div
                className="h-[140px]"
                style={{ background: `linear-gradient(135deg, ${g1}, ${g2})` }}
              />
              <div className="p-5 space-y-3">
                <div className="h-3 w-20 bg-[var(--color-neutral-100)] rounded-full" />
                <div className="h-5 w-3/4 bg-[var(--color-neutral-100)] rounded" />
                <div className="flex gap-1.5">
                  <div className="h-5 w-16 bg-[var(--color-neutral-100)] rounded-full" />
                  <div className="h-5 w-14 bg-[var(--color-neutral-100)] rounded-full" />
                  <div className="h-5 w-12 bg-[var(--color-neutral-100)] rounded-full" />
                </div>
                <div className="h-px bg-[var(--color-neutral-100)] mt-2" />
                <div className="flex gap-2 pt-1">
                  <div className="h-4 w-14 bg-[var(--color-neutral-100)] rounded-full" />
                  <div className="h-4 w-12 bg-[var(--color-neutral-100)] rounded-full" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-[var(--color-error)]">{error}</div>
    );
  }

  if (!data?.results?.length) {
    return (
      <div className="text-center py-20">
        <div className="w-14 h-14 rounded-full bg-[var(--color-neutral-100)] flex items-center justify-center mx-auto mb-4">
          <BookOpen size={24} className="text-[var(--color-neutral-400)]" />
        </div>
        <h3 className="font-bold text-[var(--text-md)] text-[var(--color-neutral-700)] mb-2">No recipes found</h3>
        <p className="text-[var(--text-base)] text-[var(--color-neutral-400)]">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="text-[var(--text-sm)] text-[var(--color-neutral-400)] mb-4">
        {data.pagination.total} recipe{data.pagination.total !== 1 ? "s" : ""} found
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.results.map((recipe) => (
          <RecipeCatalogCard
            key={recipe.id}
            {...recipe}
            isSaved={savedIds.has(recipe.id)}
            onSave={handleSave}
            onUnsave={handleUnsave}
            saveLoading={loadingIds.has(recipe.id)}
          />
        ))}
      </div>

      {/* Pagination */}
      {data.pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-10">
          <a
            href={`?${new URLSearchParams({ ...(q && { q }), ...(difficulty && { difficulty }), page: String(Math.max(1, page - 1)) }).toString()}`}
            className={`
              w-9 h-9 flex items-center justify-center rounded-full border
              transition-colors duration-[var(--transition-base)]
              ${page <= 1
                ? "border-[var(--color-neutral-100)] text-[var(--color-neutral-300)] pointer-events-none"
                : "border-[var(--color-neutral-200)] text-[var(--color-neutral-600)] hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)]"
              }
            `}
          >
            <ChevronLeft size={16} />
          </a>
          <span className="text-[var(--text-sm)] text-[var(--color-neutral-500)]">
            Page {page} of {data.pagination.totalPages}
          </span>
          <a
            href={`?${new URLSearchParams({ ...(q && { q }), ...(difficulty && { difficulty }), page: String(Math.min(data.pagination.totalPages, page + 1)) }).toString()}`}
            className={`
              w-9 h-9 flex items-center justify-center rounded-full border
              transition-colors duration-[var(--transition-base)]
              ${page >= data.pagination.totalPages
                ? "border-[var(--color-neutral-100)] text-[var(--color-neutral-300)] pointer-events-none"
                : "border-[var(--color-neutral-200)] text-[var(--color-neutral-600)] hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)]"
              }
            `}
          >
            <ChevronRight size={16} />
          </a>
        </div>
      )}
    </>
  );
}

export default function RecipesCatalogPage() {
  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-[var(--text-3xl)] font-extrabold text-[var(--color-neutral-900)] leading-tight mb-1">
          Recipe Catalog
        </h1>
        <p className="text-[var(--text-base)] text-[var(--color-neutral-500)]">
          Browse all Ethiopian recipes — filter by difficulty or search by name and ingredient.
        </p>
      </div>

      {/* Filter bar — needs Suspense for useSearchParams */}
      <Suspense>
        <FilterBar />
      </Suspense>

      {/* Grid — needs Suspense for useSearchParams */}
      <Suspense>
        <RecipeGrid />
      </Suspense>
    </div>
  );
}
