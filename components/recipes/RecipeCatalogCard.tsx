"use client";

import React from "react";
import Link from "next/link";
import { Clock, Flame, Leaf, ChefHat, Bookmark, BookmarkCheck, Loader2, Users } from "lucide-react";

export interface RecipeCatalogCardProps {
  id: number;
  name: string;
  difficulty?: string | null;
  prepTime?: string | null;
  cookTime?: string | null;
  servings?: string | null;
  ingredients: string[];
  spiceLevel?: string;
  isVegan?: boolean;
  category?: string;
  region?: string;
  time?: number | null;
  // Cookbook variant
  isSaved?: boolean;
  onSave?: (id: number) => void;
  onUnsave?: (id: number) => void;
  saveLoading?: boolean;
}

const SPICE_CONFIG: Record<string, { label: string; color: string; flames: number }> = {
  mild: { label: "Mild", color: "var(--color-accent-green)", flames: 1 },
  medium: { label: "Medium", color: "var(--color-accent-amber)", flames: 2 },
  hot: { label: "Hot", color: "var(--color-accent-orange)", flames: 3 },
  "extra-hot": { label: "Extra Hot", color: "var(--color-accent-red)", flames: 4 },
};

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "bg-green-50 text-green-600",
  medium: "bg-amber-50 text-amber-600",
  hard: "bg-red-50 text-red-600",
};

export default function RecipeCatalogCard({
  id,
  name,
  difficulty,
  prepTime,
  cookTime,
  servings,
  ingredients,
  spiceLevel = "medium",
  isVegan = false,
  category,
  time,
  isSaved = false,
  onSave,
  onUnsave,
  saveLoading = false,
}: RecipeCatalogCardProps) {
  const spice = SPICE_CONFIG[spiceLevel] ?? SPICE_CONFIG.medium;
  const diffKey = (difficulty ?? "").toLowerCase();
  const diffColor = DIFFICULTY_COLORS[diffKey] ?? "bg-[var(--color-neutral-100)] text-[var(--color-neutral-500)]";
  const displayTime = time ? `${time} min` : cookTime ?? prepTime ?? null;

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (saveLoading) return;
    if (isSaved) onUnsave?.(id);
    else onSave?.(id);
  };

  return (
    <Link href={`/home/recipes/${id}`} className="group block">
      <div
        className="
          bg-[var(--color-surface-card)]
          rounded-[var(--radius-2xl)]
          border border-[var(--color-neutral-100)]
          shadow-[var(--shadow-sm)]
          hover:shadow-[var(--shadow-md)]
          transition-all duration-[var(--transition-base)]
          overflow-hidden
          h-full flex flex-col
        "
      >
        {/* Colored header strip */}
        <div
          className="h-2 w-full"
          style={{
            background: `linear-gradient(to right, color-mix(in srgb, ${spice.color} 40%, white), color-mix(in srgb, ${spice.color} 20%, white))`,
          }}
        />

        <div className="p-5 flex flex-col flex-1">
          {/* Top row: category + bookmark */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex flex-wrap gap-1.5">
              {category && (
                <span className="text-[var(--text-xs)] font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider">
                  {category}
                </span>
              )}
            </div>
            {(onSave || onUnsave) && (
              <button
                onClick={handleBookmark}
                disabled={saveLoading}
                aria-label={isSaved ? "Remove from cookbook" : "Save to cookbook"}
                className="
                  w-7 h-7 flex items-center justify-center rounded-full
                  hover:bg-[var(--color-neutral-100)]
                  transition-colors duration-[var(--transition-fast)]
                  cursor-pointer disabled:opacity-50
                "
              >
                {saveLoading ? (
                  <Loader2 size={14} className="animate-spin text-[var(--color-brand-primary)]" />
                ) : isSaved ? (
                  <BookmarkCheck size={14} className="text-[var(--color-brand-primary)]" />
                ) : (
                  <Bookmark size={14} className="text-[var(--color-neutral-400)] group-hover:text-[var(--color-neutral-600)]" />
                )}
              </button>
            )}
          </div>

          {/* Recipe name */}
          <h3 className="font-bold text-[var(--text-md)] text-[var(--color-neutral-900)] leading-snug mb-3 group-hover:text-[var(--color-brand-primary)] transition-colors duration-[var(--transition-fast)]">
            {name}
          </h3>

          {/* Ingredient preview */}
          {ingredients.length > 0 && (
            <p className="text-[var(--text-xs)] text-[var(--color-neutral-400)] mb-4 line-clamp-2 leading-relaxed">
              {ingredients.slice(0, 4).join(" · ")}
              {ingredients.length > 4 && ` +${ingredients.length - 4} more`}
            </p>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Bottom meta row */}
          <div className="flex items-center flex-wrap gap-2 pt-3 border-t border-[var(--color-neutral-100)]">
            {difficulty && (
              <span className={`text-[var(--text-xs)] font-semibold px-2 py-0.5 rounded-full ${diffColor}`}>
                <ChefHat size={11} className="inline mr-1" />
                {difficulty}
              </span>
            )}
            {displayTime && (
              <span className="flex items-center gap-1 text-[var(--text-xs)] text-[var(--color-neutral-400)]">
                <Clock size={11} />
                {displayTime}
              </span>
            )}
            {servings && (
              <span className="flex items-center gap-1 text-[var(--text-xs)] text-[var(--color-neutral-400)]">
                <Users size={11} />
                {servings}
              </span>
            )}
            {isVegan && (
              <span className="flex items-center gap-1 text-[var(--text-xs)] font-semibold text-[var(--color-accent-green)]">
                <Leaf size={11} />
                Vegan
              </span>
            )}
            <span
              className="ml-auto flex items-center gap-0.5 text-[var(--text-xs)] font-semibold"
              style={{ color: spice.color }}
            >
              {Array.from({ length: spice.flames }).map((_, i) => (
                <Flame key={i} size={11} />
              ))}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
