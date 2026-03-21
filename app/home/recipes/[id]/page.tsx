"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Clock,
  Flame,
  Leaf,
  ChefHat,
  Lightbulb,
  Users,
  Loader2,
  BookmarkCheck,
  Bookmark,
  ArrowLeft,
  MapPin,
  CheckCircle2,
} from "lucide-react";

interface RecipeDetail {
  id: number;
  name: string;
  title: string;
  category: string;
  region: string;
  difficulty?: string | null;
  spiceLevel: string;
  isVegan: boolean;
  prepTime?: string | null;
  cookTime?: string | null;
  time?: number | null;
  servings?: string | null;
  ingredients: string[];
  steps: string[];
  tip?: string | null;
  isSaved: boolean;
}

const SPICE_CONFIG: Record<string, { label: string; color: string; bg: string; flames: number }> = {
  mild:        { label: "Mild",      color: "#22c55e", bg: "rgba(34,197,94,0.12)",  flames: 1 },
  medium:      { label: "Medium",    color: "#f59e0b", bg: "rgba(245,158,11,0.12)", flames: 2 },
  hot:         { label: "Hot",       color: "#f97316", bg: "rgba(249,115,22,0.12)", flames: 3 },
  "extra-hot": { label: "Extra Hot", color: "#ef4444", bg: "rgba(239,68,68,0.12)",  flames: 4 },
};

const DIFFICULTY_STYLE: Record<string, { dot: string }> = {
  easy:   { dot: "#22c55e" },
  medium: { dot: "#f59e0b" },
  hard:   { dot: "#ef4444" },
};

const CARD_GRADIENTS = [
  ["#fff7ed", "#fef3c7"],
  ["#fff1f2", "#fff7ed"],
  ["#fef9c3", "#fff7ed"],
  ["#f0fdf4", "#fefce8"],
  ["#fff5f5", "#fff1f2"],
  ["#fff8f0", "#fef3c7"],
];

const CARD_MOTIFS = ["🍲", "🌿", "🫘", "🌶️", "🧅", "🥘"];

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "unsaving">("idle");
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/recipes/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Recipe not found");
        return r.json();
      })
      .then((data) => {
        setRecipe(data);
        setSaveStatus(data.isSaved ? "saved" : "idle");
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = useCallback(async () => {
    if (!recipe) return;
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/recipes/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId: recipe.id }),
      });
      if (res.ok || res.status === 409) setSaveStatus("saved");
      else throw new Error();
    } catch {
      setSaveStatus("idle");
    }
  }, [recipe]);

  const handleUnsave = useCallback(async () => {
    if (!recipe) return;
    setSaveStatus("unsaving");
    try {
      const res = await fetch(`/api/recipes/saved?recipeId=${recipe.id}`, { method: "DELETE" });
      if (res.ok) setSaveStatus("idle");
      else throw new Error();
    } catch {
      setSaveStatus("saved");
    }
  }, [recipe]);

  const toggleStep = (i: number) => {
    setCheckedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  /* ── Loading skeleton ── */
  if (loading) {
    const numId = parseInt(id ?? "0", 10);
    const [g1, g2] = CARD_GRADIENTS[numId % CARD_GRADIENTS.length];
    return (
      <div className="animate-pulse">
        <div className="h-5 w-28 bg-[var(--color-neutral-100)] rounded-full mb-8" />
        <div
          className="w-full h-64 rounded-[var(--radius-2xl)] mb-8"
          style={{ background: `linear-gradient(135deg, ${g1}, ${g2})` }}
        />
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div className="space-y-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-5 bg-[var(--color-neutral-100)] rounded" style={{ width: `${80 - i * 5}%` }} />
            ))}
          </div>
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-10 bg-[var(--color-neutral-100)] rounded-[var(--radius-xl)]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Error ── */
  if (error || !recipe) {
    return (
      <div className="text-center py-24">
        <p className="text-[var(--color-error)] text-[var(--text-lg)] mb-4">{error ?? "Recipe not found"}</p>
        <button
          onClick={() => router.push("/home/recipes")}
          className="text-[var(--color-brand-primary)] hover:underline text-[var(--text-base)] cursor-pointer"
        >
          ← Back to Recipes
        </button>
      </div>
    );
  }

  const spice = SPICE_CONFIG[recipe.spiceLevel] ?? SPICE_CONFIG.medium;
  const displayDiff = (recipe.difficulty ?? "").toLowerCase();
  const diff = DIFFICULTY_STYLE[displayDiff];
  const displayTime = recipe.time ? `${recipe.time} min` : recipe.cookTime ?? recipe.prepTime ?? null;
  const numId = recipe.id;
  const [g1, g2] = CARD_GRADIENTS[numId % CARD_GRADIENTS.length];
  const motif = CARD_MOTIFS[numId % CARD_MOTIFS.length];
  const completedCount = checkedSteps.size;
  const totalSteps = recipe.steps.length;

  return (
    <div>
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="
          flex items-center gap-1.5 mb-8
          text-[var(--text-sm)] font-medium
          text-[var(--color-neutral-500)]
          hover:text-[var(--color-neutral-900)]
          transition-colors cursor-pointer
        "
      >
        <ArrowLeft size={14} />
        Back
      </button>

      {/* ── Hero Banner ── */}
      <div
        className="
          relative w-full rounded-[var(--radius-2xl)] overflow-hidden mb-8
          border border-[var(--color-neutral-100)]
          shadow-[var(--shadow-md)]
        "
        style={{
          background: `linear-gradient(135deg, ${g1} 0%, ${g2} 100%)`,
          minHeight: "280px",
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-10 -right-10 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: spice.color, opacity: 0.08 }}
        />
        <div
          className="absolute -bottom-16 -left-8 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: spice.color, opacity: 0.06 }}
        />

        {/* Big decorative motif */}
        <div className="absolute right-10 inset-y-0 flex items-center pointer-events-none select-none">
          <span className="text-[140px] opacity-15">{motif}</span>
        </div>

        {/* Content */}
        <div className="relative z-10 p-10 flex flex-col justify-between h-full" style={{ minHeight: "280px" }}>
          {/* Top pill row */}
          <div className="flex items-center gap-2 flex-wrap">
            {recipe.category && (
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-[var(--text-xs)] font-bold uppercase tracking-wider"
                style={{ background: spice.bg, color: spice.color }}
              >
                {recipe.category}
              </span>
            )}
            {recipe.region && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/5 text-[var(--text-xs)] font-medium text-[var(--color-neutral-600)]">
                <MapPin size={11} />
                {recipe.region}
              </span>
            )}
          </div>

          {/* Title */}
          <div>
            <h1 className="text-4xl font-extrabold text-[var(--color-neutral-900)] leading-tight mb-5 max-w-xl">
              {recipe.title || recipe.name}
            </h1>

            {/* Meta badges row */}
            <div className="flex flex-wrap items-center gap-2">
              {diff && recipe.difficulty && (
                <span
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[var(--text-sm)] font-semibold bg-white/70 backdrop-blur-sm text-[var(--color-neutral-700)]"
                >
                  <span className="w-2 h-2 rounded-full" style={{ background: diff.dot }} />
                  {recipe.difficulty}
                </span>
              )}
              {displayTime && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[var(--text-sm)] bg-white/70 backdrop-blur-sm text-[var(--color-neutral-700)]">
                  <Clock size={13} />
                  {displayTime}
                </span>
              )}
              {recipe.servings && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[var(--text-sm)] bg-white/70 backdrop-blur-sm text-[var(--color-neutral-700)]">
                  <Users size={13} />
                  {recipe.servings} servings
                </span>
              )}
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[var(--text-sm)] font-semibold"
                style={{ background: spice.bg, color: spice.color }}
              >
                {Array.from({ length: spice.flames }).map((_, i) => (
                  <Flame key={i} size={12} fill="currentColor" />
                ))}
                {spice.label}
              </span>
              {recipe.isVegan && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[var(--text-sm)] font-semibold bg-green-50 text-green-600">
                  <Leaf size={12} fill="currentColor" />
                  Vegan
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Spice accent stripe at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: `linear-gradient(to right, ${spice.color}, transparent)` }}
        />
      </div>

      {/* ── Save button (full-width on mobile, auto on desktop) ── */}
      <div className="mb-8">
        <button
          id="save-recipe-btn"
          onClick={saveStatus === "saved" ? handleUnsave : handleSave}
          disabled={saveStatus === "saving" || saveStatus === "unsaving"}
          className={`
            inline-flex items-center gap-2
            px-6 py-3 rounded-full
            text-[var(--text-base)] font-bold
            shadow-[var(--shadow-sm)]
            transition-all duration-200 cursor-pointer
            disabled:opacity-60 disabled:cursor-not-allowed
            ${
              saveStatus === "saved"
                ? "bg-[var(--color-brand-primary)] text-white shadow-[var(--shadow-brand)] hover:bg-[var(--color-brand-primary-hover)]"
                : "bg-white border border-[var(--color-neutral-200)] text-[var(--color-neutral-700)] hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] hover:shadow-[var(--shadow-brand)]"
            }
          `}
        >
          {saveStatus === "saving" || saveStatus === "unsaving" ? (
            <><Loader2 size={16} className="animate-spin" />{saveStatus === "saving" ? "Saving…" : "Removing…"}</>
          ) : saveStatus === "saved" ? (
            <><BookmarkCheck size={16} />Saved to Cookbook</>
          ) : (
            <><Bookmark size={16} />Save to Cookbook</>
          )}
        </button>
      </div>

      {/* ── Body: 2-col layout ── */}
      <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">

        {/* LEFT: Instructions */}
        <div>
          {/* Progress bar (if steps have been checked) */}
          {totalSteps > 0 && (
            <div className="bg-white rounded-[var(--radius-2xl)] border border-[var(--color-neutral-100)] shadow-[var(--shadow-sm)] p-6 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[var(--text-lg)] font-extrabold text-[var(--color-neutral-900)]">
                  Instructions
                </h2>
                <span className="text-[var(--text-sm)] font-semibold text-[var(--color-neutral-500)]">
                  {completedCount}/{totalSteps} done
                </span>
              </div>

              {/* Progress track */}
              <div className="h-1.5 bg-[var(--color-neutral-100)] rounded-full mb-6 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0}%`,
                    background: `linear-gradient(to right, ${spice.color}, color-mix(in srgb, ${spice.color} 60%, orange))`,
                  }}
                />
              </div>

              <ol className="space-y-3">
                {recipe.steps.map((step, i) => {
                  const done = checkedSteps.has(i);
                  return (
                    <li key={i}>
                      <button
                        onClick={() => toggleStep(i)}
                        className="
                          w-full text-left flex gap-4 items-start
                          p-4 rounded-[var(--radius-xl)]
                          transition-all duration-200 cursor-pointer
                          group
                        "
                        style={{
                          background: done ? `color-mix(in srgb, ${spice.color} 6%, white)` : "transparent",
                          border: done
                            ? `1px solid color-mix(in srgb, ${spice.color} 25%, white)`
                            : "1px solid transparent",
                        }}
                      >
                        {/* Step number / check */}
                        <div className="shrink-0 mt-0.5">
                          {done ? (
                            <CheckCircle2
                              size={22}
                              style={{ color: spice.color }}
                              fill={`color-mix(in srgb, ${spice.color} 15%, white)`}
                            />
                          ) : (
                            <span
                              className="
                                flex items-center justify-center
                                w-6 h-6 rounded-full
                                text-[var(--text-xs)] font-extrabold
                                border-2 transition-colors duration-200
                                group-hover:border-opacity-100
                              "
                              style={{
                                borderColor: `color-mix(in srgb, ${spice.color} 40%, var(--color-neutral-200))`,
                                color: spice.color,
                              }}
                            >
                              {i + 1}
                            </span>
                          )}
                        </div>
                        <p
                          className="text-[var(--text-base)] leading-relaxed transition-all duration-200"
                          style={{
                            color: done ? "var(--color-neutral-400)" : "var(--color-neutral-700)",
                            textDecoration: done ? "line-through" : "none",
                          }}
                        >
                          {step}
                        </p>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          {/* Chef's Tip */}
          {recipe.tip && (
            <div
              className="flex gap-4 p-6 rounded-[var(--radius-2xl)] border"
              style={{
                background: `linear-gradient(135deg, color-mix(in srgb, ${spice.color} 6%, white), color-mix(in srgb, ${spice.color} 3%, white))`,
                borderColor: `color-mix(in srgb, ${spice.color} 20%, white)`,
              }}
            >
              <div
                className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center"
                style={{ background: spice.bg }}
              >
                <Lightbulb size={18} style={{ color: spice.color }} />
              </div>
              <div>
                <p className="text-[var(--text-sm)] font-extrabold uppercase tracking-wider mb-1.5" style={{ color: spice.color }}>
                  Chef&apos;s Tip
                </p>
                <p className="text-[var(--text-base)] text-[var(--color-neutral-700)] leading-relaxed">
                  {recipe.tip}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Ingredients */}
        <div className="sticky top-8">
          <div className="bg-white rounded-[var(--radius-2xl)] border border-[var(--color-neutral-100)] shadow-[var(--shadow-sm)] overflow-hidden">
            {/* Header */}
            <div
              className="px-6 py-5 flex items-center gap-3"
              style={{
                background: `linear-gradient(135deg, color-mix(in srgb, ${spice.color} 8%, white), color-mix(in srgb, ${spice.color} 4%, white))`,
                borderBottom: `1px solid color-mix(in srgb, ${spice.color} 15%, white)`,
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: spice.bg }}
              >
                <ChefHat size={17} style={{ color: spice.color }} />
              </div>
              <div>
                <h2 className="text-[var(--text-md)] font-extrabold text-[var(--color-neutral-900)]">
                  Ingredients
                </h2>
                <p className="text-[var(--text-xs)] text-[var(--color-neutral-400)]">
                  {recipe.ingredients.length} items
                </p>
              </div>
            </div>

            {/* List */}
            <ul className="divide-y divide-[var(--color-neutral-50)] px-6 py-2">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-3 py-3">
                  <span
                    className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                    style={{ background: spice.color, opacity: 0.7 }}
                  />
                  <span className="text-[var(--text-base)] text-[var(--color-neutral-700)] leading-snug">
                    {ing}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
