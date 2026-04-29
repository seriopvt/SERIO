"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Clock,
  Flame,
  Leaf,
  ChefHat,
  Loader2,
  UtensilsCrossed,
} from "lucide-react";
import { Card } from "@/components/ui";
import { useI18n } from "@/lib/i18n/I18nContext";

// ── Types ─────────────────────────────────────────────────────────────

type SearchType = "all" | "title" | "ingredient";

interface SearchResult {
  id: number;
  name: string;
  difficulty: string | null;
  prepTime: string | null;
  cookTime: string | null;
  servings: string | null;
  ingredients: string[];
  spiceLevel: "mild" | "medium" | "hot" | "extra-hot";
  isVegan: boolean;
}

// ── Spice Level Config ─────────────────────────────────────────────────

const SPICE_CONFIG: Record<string, { labelKey: string; color: string }> = {
  mild:        { labelKey: "recipes.spice.mild",     color: "var(--color-accent-green)"  },
  medium:      { labelKey: "recipes.spice.medium",   color: "var(--color-accent-amber)"  },
  hot:         { labelKey: "recipes.spice.hot",      color: "var(--color-accent-orange)" },
  "extra-hot": { labelKey: "recipes.spice.extraHot", color: "var(--color-accent-red)"    },
};

const TABS: { id: SearchType; labelKey: string }[] = [
  { id: "all",        labelKey: "home.recipeSearch.tab.all" },
  { id: "title",      labelKey: "home.recipeSearch.tab.title" },
  { id: "ingredient", labelKey: "home.recipeSearch.tab.ingredient" },
];

// ── Main Component ─────────────────────────────────────────────────────

export default function RecipeSearch() {
  const { t } = useI18n();
  const [query, setQuery]       = useState("");
  const [type, setType]         = useState<SearchType>("all");
  const [results, setResults]   = useState<SearchResult[]>([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Debounced search ─────────────────────────────────────────────────
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < 2) {
      setResults([]);
      setHasSearched(false);
      setError(null);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/recipes/search?q=${encodeURIComponent(query.trim())}&type=${type}`
        );

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error ?? t("home.recipeSearch.error.searchFailed"));
        }

        const data = await res.json();
        setResults(data.results ?? []);
        setHasSearched(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : t("home.recipeSearch.error.generic"));
        setResults([]);
        setHasSearched(true);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, type]);

  return (
    <Card padding="lg" className="mb-6">
      {/* ── Header ── */}
      <div className="flex items-center gap-2 mb-1">
        <Search size={16} className="text-[var(--color-brand-primary)]" />
        <h3 className="text-[var(--text-xl)] font-bold text-[var(--color-neutral-900)]">
          {t("home.recipeSearch.title")}
        </h3>
      </div>
      <p className="text-[var(--text-base)] text-[var(--color-neutral-400)] mb-5">
        {t("home.recipeSearch.subtitle")}
      </p>

      {/* ── Search Input ── */}
      <div
        className="
          flex items-center gap-3
          bg-[var(--color-neutral-50)]
          border border-[var(--color-neutral-200)]
          rounded-full px-5 py-3
          focus-within:border-[var(--color-brand-primary)]
          focus-within:ring-2 focus-within:ring-[var(--color-brand-primary-shadow)]
          transition-all duration-[var(--transition-base)]
          mb-4
        "
      >
        {loading ? (
          <Loader2
            size={16}
            className="text-[var(--color-brand-primary)] animate-spin shrink-0"
          />
        ) : (
          <Search size={16} className="text-[var(--color-neutral-500)] shrink-0" />
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            type === "ingredient"
              ? t("home.recipeSearch.placeholder.ingredient")
              : type === "title"
              ? t("home.recipeSearch.placeholder.title")
              : t("home.recipeSearch.placeholder.all")
          }
          className="
            flex-1 bg-transparent
            text-[var(--text-base)] text-[var(--color-neutral-700)]
            placeholder:text-[var(--color-neutral-500)]
            outline-none
          "
        />
      </div>

      {/* ── Mode Tabs ── */}
      <div className="flex items-center gap-1.5 mb-5">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setType(tab.id)}
            className={`
              px-3.5 py-1.5 rounded-full
              text-[var(--text-sm)] font-semibold
              border transition-all duration-[var(--transition-base)]
              cursor-pointer
              ${
                type === tab.id
                  ? "bg-[var(--color-brand-primary)] border-[var(--color-brand-primary)] text-white shadow-[var(--shadow-brand)]"
                  : "border-[var(--color-neutral-200)] text-[var(--color-neutral-500)] hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)]"
              }
            `}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      {/* ── Results ── */}
      {error && (
        <div className="flex items-center gap-2 py-3 px-4 rounded-[var(--radius-xl)] bg-red-50 border border-red-100 text-[var(--color-error)] text-[var(--text-base)]">
          <span>{error}</span>
        </div>
      )}

      {!error && hasSearched && !loading && results.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <UtensilsCrossed
            size={32}
            className="text-[var(--color-neutral-300)]"
          />
          <p className="text-[var(--text-base)] font-semibold text-[var(--color-neutral-500)]">
            {t("home.recipeSearch.empty.title")}
          </p>
          <p className="text-[var(--text-sm)] text-[var(--color-neutral-400)]">
            {t("home.recipeSearch.empty.subtitle")}
          </p>
        </div>
      )}

      {!error && results.length > 0 && (
        <ul className="space-y-2">
          {results.map((recipe) => (
            <SearchResultItem key={recipe.id} recipe={recipe} />
          ))}
        </ul>
      )}

      {/* ── Loading skeleton ── */}
      {loading && results.length === 0 && (
        <ul className="space-y-2">
          {[1, 2, 3].map((i) => (
            <li
              key={i}
              className="
                animate-pulse h-[72px]
                bg-[var(--color-neutral-50)]
                rounded-[var(--radius-xl)]
                border border-[var(--color-neutral-100)]
              "
            />
          ))}
        </ul>
      )}
    </Card>
  );
}

// ── Result Item ────────────────────────────────────────────────────────

function SearchResultItem({ recipe }: { recipe: SearchResult }) {
  const { t } = useI18n();
  const spice = SPICE_CONFIG[recipe.spiceLevel] ?? SPICE_CONFIG.medium;
  const totalTime =
    recipe.prepTime && recipe.cookTime
      ? `${recipe.prepTime} + ${recipe.cookTime}`
      : recipe.prepTime ?? recipe.cookTime ?? null;

  return (
    <li
      className="
        flex items-center gap-4
        p-3.5 rounded-[var(--radius-xl)]
        border border-[var(--color-neutral-100)]
        bg-[var(--color-surface-card)]
        hover:border-[var(--color-brand-primary)]
        hover:shadow-[var(--shadow-sm)]
        transition-all duration-[var(--transition-base)]
        group cursor-default
      "
    >
      {/* Icon */}
      <div
        className="
          w-10 h-10 rounded-[var(--radius-lg)] shrink-0
          bg-[var(--color-brand-primary-light)]
          text-[var(--color-brand-primary)]
          flex items-center justify-center
          group-hover:bg-[var(--color-brand-primary)]
          group-hover:text-white
          transition-colors duration-[var(--transition-base)]
        "
      >
        <ChefHat size={18} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-[var(--text-base)] text-[var(--color-neutral-900)] truncate">
          {recipe.name}
        </p>
        <p className="text-[var(--text-xs)] text-[var(--color-neutral-400)] truncate mt-0.5">
          {recipe.ingredients.join(", ")}
          {recipe.ingredients.length === 5 ? "…" : ""}
        </p>
      </div>

      {/* Meta badges */}
      <div className="flex items-center gap-1.5 shrink-0">
        {totalTime && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)] text-[var(--text-xs)]">
            <Clock size={10} />
            {totalTime}
          </span>
        )}
        <span
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[var(--text-xs)] font-semibold"
          style={{
            backgroundColor: `color-mix(in srgb, ${spice.color} 12%, white)`,
            color: spice.color,
          }}
        >
          <Flame size={10} />
          {t(spice.labelKey)}
        </span>
        {recipe.isVegan && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-[var(--color-accent-green)] text-[var(--text-xs)] font-semibold">
            <Leaf size={10} />
            {t("recipes.card.vegan")}
          </span>
        )}
      </div>
    </li>
  );
}
