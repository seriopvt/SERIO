"use client";

import React from "react";
import Link from "next/link";
import { Clock, Flame, Leaf, Bookmark, BookmarkCheck, Loader2, Users, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nContext";

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
  isSaved?: boolean;
  onSave?: (id: number) => void;
  onUnsave?: (id: number) => void;
  saveLoading?: boolean;
}

const SPICE_CONFIG: Record<string, { labelKey: string; color: string; bg: string; flames: number }> = {
  mild:        { labelKey: "recipes.spice.mild",      color: "#22c55e", bg: "rgba(34,197,94,0.12)",  flames: 1 },
  medium:      { labelKey: "recipes.spice.medium",    color: "#f59e0b", bg: "rgba(245,158,11,0.12)", flames: 2 },
  hot:         { labelKey: "recipes.spice.hot",       color: "#f97316", bg: "rgba(249,115,22,0.12)", flames: 3 },
  "extra-hot": { labelKey: "recipes.spice.extraHot",  color: "#ef4444", bg: "rgba(239,68,68,0.12)",  flames: 4 },
};

// Deterministic pastel gradient per recipe id
const CARD_GRADIENTS = [
  "from-orange-500/10 via-amber-500/10 to-yellow-500/10",
  "from-rose-500/10 via-orange-500/10 to-amber-500/10",
  "from-amber-500/10 via-orange-500/10 to-red-500/10",
  "from-yellow-500/10 via-lime-500/10 to-green-500/10",
  "from-red-500/10 via-rose-500/10 to-orange-500/10",
  "from-orange-500/10 via-red-500/10 to-rose-500/10",
];

// Ethiopian-themed emoji motifs shown as decorative art
const CARD_MOTIFS = ["🍲", "🌿", "🫘", "🌶️", "🧅", "🥘"];

const DIFFICULTY_STYLE: Record<string, { dot: string; textKey: string }> = {
  easy:   { dot: "#22c55e", textKey: "recipes.difficulty.easy" },
  medium: { dot: "#f59e0b", textKey: "recipes.difficulty.medium" },
  hard:   { dot: "#ef4444", textKey: "recipes.difficulty.hard" },
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
  const { t } = useI18n();
  const spice = SPICE_CONFIG[spiceLevel] ?? SPICE_CONFIG.medium;
  const diffKey = (difficulty ?? "").toLowerCase();
  const diff = DIFFICULTY_STYLE[diffKey];
  const displayTime = time ? t("recipes.card.timeMinutes", { minutes: String(time) }) : cookTime ?? prepTime ?? null;
  const gradientClass = CARD_GRADIENTS[id % CARD_GRADIENTS.length];
  const motif = CARD_MOTIFS[id % CARD_MOTIFS.length];

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (saveLoading) return;
    if (isSaved) onUnsave?.(id);
    else onSave?.(id);
  };

  return (
    <Link href={`/home/recipes/${id}`} className="group block h-full">
      <div
        className="
          relative h-full flex flex-col
          bg-[var(--color-surface-card)] rounded-[var(--radius-2xl)]
          border border-[var(--color-neutral-100)]
          shadow-[var(--shadow-sm)]
          hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)]
          hover:-translate-y-1
          transition-all duration-300
          overflow-hidden
        "
      >
        {/* ── Illustration Area ── */}
        <div className={`relative h-[140px] bg-gradient-to-br ${gradientClass} overflow-hidden flex-shrink-0`}>
          {/* Decorative rings */}
          <div
            className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-20"
            style={{ background: spice.color }}
          />
          <div
            className="absolute -bottom-8 -left-4 w-20 h-20 rounded-full opacity-10"
            style={{ background: spice.color }}
          />
          {/* Motif emoji */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl opacity-25 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 select-none">
              {motif}
            </span>
          </div>
          {/* Category pill */}
          {category && (
            <div className="absolute top-3 left-3">
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
                style={{ background: spice.bg, color: spice.color }}
              >
                {category}
              </span>
            </div>
          )}
          {/* Bookmark button */}
          {(onSave || onUnsave) && (
            <button
              onClick={handleBookmark}
              disabled={saveLoading}
              aria-label={isSaved ? t("recipes.card.unsave") : t("recipes.card.save")}
              className="
                absolute top-3 right-3
                w-8 h-8 flex items-center justify-center
                rounded-full bg-[var(--color-surface-card)]/90 backdrop-blur-sm
                shadow-[var(--shadow-sm)]
                hover:bg-[var(--color-surface-elevated)] hover:scale-110
                transition-all duration-200
                cursor-pointer disabled:opacity-50
              "
            >
              {saveLoading ? (
                <Loader2 size={13} className="animate-spin text-[var(--color-brand-primary)]" />
              ) : isSaved ? (
                <BookmarkCheck size={13} className="text-[var(--color-brand-primary)]" fill="currentColor" />
              ) : (
                <Bookmark size={13} className="text-[var(--color-neutral-400)] group-hover:text-[var(--color-neutral-700)]" />
              )}
            </button>
          )}
          {/* Spice flames */}
          <div
            className="absolute bottom-3 right-3 flex items-center gap-0.5"
            style={{ color: spice.color }}
          >
            {Array.from({ length: spice.flames }).map((_, i) => (
              <Flame key={i} size={12} fill="currentColor" className="opacity-80" />
            ))}
          </div>
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col flex-1 p-5">
          {/* Name */}
          <h3
            className="
              font-extrabold text-[var(--text-md)] text-[var(--color-neutral-900)] leading-snug mb-2
              group-hover:text-[var(--color-brand-primary)]
              transition-colors duration-200
            "
          >
            {name}
          </h3>

          {/* Ingredient chips */}
          {ingredients.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {ingredients.slice(0, 3).map((ing, i) => (
                <span
                  key={i}
                  className="
                    px-2 py-0.5 rounded-full
                    bg-[var(--color-surface-card)]
                    text-[var(--color-neutral-600)]
                    text-[11px] font-medium
                    border border-[var(--color-neutral-200)]
                  "
                >
                  {ing}
                </span>
              ))}
              {ingredients.length > 3 && (
                <span className="px-2 py-0.5 text-[11px] text-[var(--color-neutral-400)]">
                  +{ingredients.length - 3}
                </span>
              )}
            </div>
          )}

          <div className="flex-1" />

          {/* Footer row */}
          <div className="flex items-center gap-3 pt-3 border-t border-[var(--color-neutral-100)]">
            {/* Difficulty dot */}
            {diff && (
              <span className="flex items-center gap-1.5 text-[var(--text-xs)] font-semibold text-[var(--color-neutral-600)]">
                <span className="w-2 h-2 rounded-full" style={{ background: diff.dot }} />
                {t(diff.textKey)}
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
              <span className="flex items-center gap-1 text-[11px] font-semibold text-[var(--color-accent-green)]">
                <Leaf size={11} fill="currentColor" />
                {t("recipes.card.vegan")}
              </span>
            )}

            {/* Arrow CTA */}
            <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <ArrowRight size={14} className="text-[var(--color-brand-primary)]" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
