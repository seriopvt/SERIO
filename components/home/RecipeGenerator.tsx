"use client";

import React, { useState } from "react";
import {
  Sparkles,
  X,
  Clock,
  Flame,
  Leaf,
  MapPin,
  ChefHat,
  Lightbulb,
  Users,
  Loader2,
  BookOpen,
  Heart,
} from "lucide-react";
import { Card, Badge, Button } from "@/components/ui";

// ── Types (mirrors lib/gemini.ts) ─────────────────────────────────────

interface GeneratedRecipe {
  id?: number; // DB ID, populated after saving or cache hit
  title: string;
  category: string;
  region: string;
  spiceLevel: "mild" | "medium" | "hot" | "extra-hot";
  isVegan: boolean;
  servings: number;
  time: number;
  ingredients: string[];
  steps: string[];
  tip?: string;
}

// ── Spice Level Config ────────────────────────────────────────────────

const SPICE_CONFIG: Record<
  string,
  { label: string; color: string; flames: number }
> = {
  mild: { label: "Mild", color: "var(--color-accent-green)", flames: 1 },
  medium: { label: "Medium", color: "var(--color-accent-amber)", flames: 2 },
  hot: { label: "Hot", color: "var(--color-accent-orange)", flames: 3 },
  "extra-hot": {
    label: "Extra Hot",
    color: "var(--color-accent-red)",
    flames: 4,
  },
};

const COMMON_INGREDIENTS = [
  "Berbere",
  "Teff",
  "Red Lentils",
  "Chickpeas",
  "Niter Kibbeh",
  "Red Onions",
  "Garlic",
  "Shiro Powder",
  "Spinach",
  "Tomatoes",
];

// ── Main Component ────────────────────────────────────────────────────

export default function RecipeGenerator() {
  const [inputValue, setInputValue] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isVegan, setIsVegan] = useState(false);
  const [isSpicy, setIsSpicy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<GeneratedRecipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  // Add ingredient from text input
  const addIngredient = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    const parts = trimmed.split(",").map((s) => s.trim()).filter(Boolean);
    setIngredients((prev) => {
      const combined = [...prev];
      for (const part of parts) {
        if (!combined.some((i) => i.toLowerCase() === part.toLowerCase())) {
          combined.push(part);
        }
      }
      return combined;
    });
    setInputValue("");
  };

  const removeIngredient = (idx: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addIngredient(inputValue);
    }
  };

  const handleGenerate = async () => {
    if (ingredients.length === 0) return;
    setLoading(true);
    setError(null);
    setRecipe(null);
    setSaveStatus("idle");

    try {
      const res = await fetch("/api/recipes/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients,
          preferences: {
            ...(isVegan && { vegan: true }),
            ...(isSpicy && { spicy: true }),
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Something went wrong");
      }

      const data: GeneratedRecipe = await res.json();
      setRecipe(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToCookbook = async () => {
    if (!recipe?.id) return;
    setSaveStatus("saving");

    try {
      const res = await fetch("/api/recipes/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId: recipe.id }),
      });

      if (!res.ok) {
        if (res.status === 409) {
          setSaveStatus("saved"); // Already saved
          return;
        }
        throw new Error("Failed to save");
      }

      setSaveStatus("saved");
    } catch (err) {
      console.error(err);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  const spice = recipe ? (SPICE_CONFIG[recipe.spiceLevel] ?? SPICE_CONFIG.medium) : null;

  return (
    <div className="mb-8 space-y-5">
      {/* ── Input Card ── */}
      <Card padding="lg">
        <h3 className="text-[var(--text-xl)] font-bold text-[var(--color-neutral-900)] text-center mb-1">
          What&apos;s in your pantry?
        </h3>
        <p className="text-[var(--text-base)] text-[var(--color-neutral-400)] text-center mb-6">
          Enter your ingredients to generate a traditional Ethiopian recipe
          instantly.
        </p>

        {/* Ingredient Chips */}
        {ingredients.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {ingredients.map((ing, idx) => (
              <span
                key={idx}
                className="
                  inline-flex items-center gap-1.5
                  px-3 py-1.5 rounded-full
                  bg-[var(--color-brand-primary-light)]
                  text-[var(--color-brand-primary)]
                  text-[var(--text-sm)] font-semibold
                "
              >
                {ing}
                <button
                  onClick={() => removeIngredient(idx)}
                  className="hover:opacity-70 transition-opacity cursor-pointer"
                  aria-label={`Remove ${ing}`}
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Text Input Row */}
        <div className="flex items-center gap-3 mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => addIngredient(inputValue)}
            placeholder="e.g. teff, berbere, garlic... (press Enter or comma to add)"
            className="
              flex-1 px-5 py-3.5 rounded-full
              bg-[var(--color-neutral-50)]
              border border-[var(--color-neutral-200)]
              text-[var(--text-base)] text-[var(--color-neutral-700)]
              placeholder:text-[var(--color-neutral-500)]
              focus:outline-none focus:border-[var(--color-brand-primary)]
              focus:ring-2 focus:ring-[var(--color-brand-primary-shadow)]
              transition-all duration-[var(--transition-base)]
            "
          />
          <Button
            variant="primary"
            size="lg"
            onClick={handleGenerate}
            disabled={ingredients.length === 0 || loading}
            className="shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Cooking…
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Inspire Me
              </>
            )}
          </Button>
        </div>

        {/* Preferences Row */}
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={() => setIsVegan((v) => !v)}
            className={`
              inline-flex items-center gap-1.5 px-4 py-2 rounded-full
              border text-[var(--text-sm)] font-semibold
              transition-all duration-[var(--transition-base)] cursor-pointer
              ${isVegan
                ? "bg-[var(--color-accent-green)] border-[var(--color-accent-green)] text-white"
                : "border-[var(--color-neutral-200)] text-[var(--color-neutral-500)] hover:border-[var(--color-accent-green)] hover:text-[var(--color-accent-green)]"
              }
            `}
          >
            <Leaf size={14} />
            Vegan
          </button>
          <button
            onClick={() => setIsSpicy((v) => !v)}
            className={`
              inline-flex items-center gap-1.5 px-4 py-2 rounded-full
              border text-[var(--text-sm)] font-semibold
              transition-all duration-[var(--transition-base)] cursor-pointer
              ${isSpicy
                ? "bg-[var(--color-accent-red)] border-[var(--color-accent-red)] text-white"
                : "border-[var(--color-neutral-200)] text-[var(--color-neutral-500)] hover:border-[var(--color-accent-red)] hover:text-[var(--color-accent-red)]"
              }
            `}
          >
            <Flame size={14} />
            Spicy
          </button>
        </div>

        {/* Common Ingredient Badges */}
        <div className="text-center">
          <p className="text-[var(--text-xs)] font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider mb-3">
            Common Ethiopian Ingredients
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {COMMON_INGREDIENTS.map((ing) => (
              <Badge
                key={ing}
                label={ing}
                showPlus={!ingredients.some((i) => i.toLowerCase() === ing.toLowerCase())}
                onClick={() =>
                  setIngredients((prev) => {
                    if (prev.some((i) => i.toLowerCase() === ing.toLowerCase()))
                      return prev;
                    return [...prev, ing];
                  })
                }
              />
            ))}
          </div>
        </div>
      </Card>

      {/* ── Error State ── */}
      {error && (
        <div className="
          flex items-center gap-3 px-5 py-4 rounded-[var(--radius-xl)]
          bg-red-50 border border-red-100
          text-[var(--color-error)] text-[var(--text-base)]
        ">
          <X size={16} className="shrink-0" />
          {error}
        </div>
      )}

      {/* ── Loading Skeleton ── */}
      {loading && (
        <Card padding="lg">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-48 bg-[var(--color-neutral-100)] rounded-full" />
            <div className="flex gap-2">
              <div className="h-5 w-20 bg-[var(--color-neutral-100)] rounded-full" />
              <div className="h-5 w-20 bg-[var(--color-neutral-100)] rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-[var(--color-neutral-100)] rounded" />
              <div className="h-4 w-5/6 bg-[var(--color-neutral-100)] rounded" />
              <div className="h-4 w-4/6 bg-[var(--color-neutral-100)] rounded" />
            </div>
          </div>
        </Card>
      )}

      {/* ── Recipe Result ── */}
      {recipe && !loading && (
        <Card padding="lg">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[var(--text-xs)] font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider">
                  {recipe.category}
                </span>
                <span className="text-[var(--color-neutral-300)]">·</span>
                <span className="flex items-center gap-1 text-[var(--text-xs)] text-[var(--color-neutral-400)]">
                  <MapPin size={11} />
                  {recipe.region}
                </span>
              </div>
              <h3 className="text-[var(--text-2xl)] font-extrabold text-[var(--color-neutral-900)] leading-tight">
                {recipe.title}
              </h3>
            </div>
            <button
              onClick={() => setRecipe(null)}
              className="text-[var(--color-neutral-300)] hover:text-[var(--color-neutral-500)] transition-colors cursor-pointer"
              aria-label="Dismiss recipe"
            >
              <X size={18} />
            </button>
          </div>

          {/* Meta Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {/* Time */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)] text-[var(--text-sm)]">
              <Clock size={13} />
              {recipe.time} min
            </span>
            {/* Servings */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)] text-[var(--text-sm)]">
              <Users size={13} />
              {recipe.servings} servings
            </span>
            {/* Spice Level */}
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[var(--text-sm)] font-semibold"
              style={{
                backgroundColor: `color-mix(in srgb, ${spice?.color} 15%, white)`,
                color: spice?.color,
              }}
            >
              {Array.from({ length: spice?.flames ?? 1 }).map((_, i) => (
                <Flame key={i} size={12} />
              ))}
              {spice?.label}
            </span>
            {/* Vegan */}
            {recipe.isVegan && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-[var(--color-accent-green)] text-[var(--text-sm)] font-semibold">
                <Leaf size={13} />
                Vegan
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Ingredients */}
            <div>
              <h4 className="flex items-center gap-2 text-[var(--text-base)] font-bold text-[var(--color-neutral-900)] mb-3">
                <ChefHat size={16} className="text-[var(--color-brand-primary)]" />
                Ingredients
              </h4>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2 text-[var(--text-base)] text-[var(--color-neutral-600)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-primary)] shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div>
              <h4 className="flex items-center gap-2 text-[var(--text-base)] font-bold text-[var(--color-neutral-900)] mb-3">
                <Sparkles size={16} className="text-[var(--color-brand-primary)]" />
                Instructions
              </h4>
              <ol className="space-y-3">
                {recipe.steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="
                      flex-shrink-0 w-5 h-5 rounded-full
                      bg-[var(--color-brand-primary-light)]
                      text-[var(--color-brand-primary)]
                      text-[var(--text-xs)] font-bold
                      flex items-center justify-center mt-0.5
                    ">
                      {i + 1}
                    </span>
                    <p className="text-[var(--text-base)] text-[var(--color-neutral-600)] leading-relaxed">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Chef's Tip */}
          {recipe.tip && (
            <div className="
              mt-6 flex gap-3 p-4 rounded-[var(--radius-xl)]
              bg-[var(--color-brand-primary-light)]
              border border-orange-100
            ">
              <Lightbulb size={16} className="text-[var(--color-brand-primary)] shrink-0 mt-0.5" />
              <p className="text-[var(--text-base)] text-[var(--color-neutral-700)] leading-relaxed">
                <span className="font-semibold text-[var(--color-brand-primary)]">Chef&apos;s Tip: </span>
                {recipe.tip}
              </p>
            </div>
          )}

          {/* Re-generate & Save */}
          <div className="mt-8 flex justify-end gap-3">
            <Button
              variant="secondary"
              size="md"
              onClick={handleGenerate}
              disabled={loading}
            >
              <Sparkles size={14} />
              Regenerate
            </Button>
            
            {recipe.id && (
              <Button
                variant="primary"
                size="md"
                onClick={handleSaveToCookbook}
                disabled={saveStatus === "saving" || saveStatus === "saved"}
                className={saveStatus === "saved" ? "!bg-[var(--color-success)] !shadow-none" : ""}
              >
                {saveStatus === "saving" ? (
                  <><Loader2 size={14} className="animate-spin" /> Saving...</>
                ) : saveStatus === "saved" ? (
                  <><Heart size={14} className="fill-white" /> Saved to Cookbook</>
                ) : saveStatus === "error" ? (
                  "Error Saving"
                ) : (
                  <><BookOpen size={14} /> Save to Cookbook</>
                )}
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
