"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Clock, Flame, Leaf, UtensilsCrossed } from "lucide-react";
import { Card } from "@/components/ui";
import { useI18n } from "@/lib/i18n/I18nContext";

interface QuickRec {
  id: number;
  name: string;
  difficulty?: string | null;
  time?: number | null;
  spiceLevel?: string;
  isVegan?: boolean;
  category?: string;
}

const SPICE_COLORS: Record<string, string> = {
  mild: "#22c55e",
  medium: "#f59e0b",
  hot: "#f97316",
  "extra-hot": "#ef4444",
};

const MOTIFS = ["🍲", "🌿", "🫘", "🌶️", "🧅", "🥘"];
const GRADIENTS = [
  ["#fff7ed", "#fef3c7"],
  ["#fff1f2", "#fff7ed"],
  ["#f0fdf4", "#fefce8"],
  ["#fef9c3", "#fff7ed"],
];

function RecItem({ rec }: { rec: QuickRec }) {
  const { t } = useI18n();
  const spiceColor = SPICE_COLORS[rec.spiceLevel ?? "medium"] ?? SPICE_COLORS.medium;
  const motif = MOTIFS[rec.id % MOTIFS.length];
  const [g1, g2] = GRADIENTS[rec.id % GRADIENTS.length];

  return (
    <Link
      href={`/home/recipes/${rec.id}`}
      className="
        flex items-center gap-3 p-2.5
        rounded-[var(--radius-xl)]
        hover:bg-[var(--color-neutral-50)]
        transition-colors duration-[var(--transition-base)]
        group
      "
    >
      {/* Mini illustration */}
      <div
        className="w-11 h-11 rounded-[var(--radius-lg)] flex-shrink-0 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${g1}, ${g2})` }}
      >
        <span className="text-xl select-none">{motif}</span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[var(--text-base)] font-semibold text-[var(--color-neutral-900)] truncate group-hover:text-[var(--color-brand-primary)] transition-colors">
          {rec.name}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          {rec.time && (
            <span className="flex items-center gap-0.5 text-[11px] text-[var(--color-neutral-400)]">
              <Clock size={10} />
              {t("home.quickRecs.timeMinutesShort", { minutes: String(rec.time) })}
            </span>
          )}
          {rec.isVegan && (
            <span className="flex items-center gap-0.5 text-[11px] text-green-500 font-medium">
              <Leaf size={10} fill="currentColor" />
              {t("home.quickRecs.vegan")}
            </span>
          )}
          <span
            className="flex items-center gap-0.5 text-[11px] font-semibold ml-auto"
            style={{ color: spiceColor }}
          >
            <Flame size={10} fill="currentColor" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function QuickRecs() {
  const { t } = useI18n();
  const [recs, setRecs] = useState<QuickRec[]>([]);
  const [loading, setLoading] = useState(true);
  const [spinning, setSpinning] = useState(false);

  const fetchRecs = async () => {
    setSpinning(true);
    try {
      const res = await fetch("/api/recipes/random?count=3");
      const data = await res.json();
      setRecs(data.results ?? []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
      setTimeout(() => setSpinning(false), 400);
    }
  };

  useEffect(() => { fetchRecs(); }, []);

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <UtensilsCrossed size={15} className="text-[var(--color-brand-primary)]" />
          <h4 className="text-[var(--text-base)] font-bold text-[var(--color-neutral-900)]">
            {t("home.quickRecs.title")}
          </h4>
        </div>
        <button
          onClick={fetchRecs}
          disabled={spinning}
          className="text-[var(--color-brand-primary)] hover:opacity-70 transition-opacity cursor-pointer disabled:opacity-40"
          aria-label={t("home.quickRecs.refresh")}
        >
          <RefreshCw
            size={14}
            className={spinning ? "animate-spin" : ""}
          />
        </button>
      </div>

      {loading ? (
        <div className="space-y-2.5 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 p-2.5">
              <div className="w-11 h-11 rounded-[var(--radius-lg)] bg-[var(--color-neutral-100)] shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3.5 bg-[var(--color-neutral-100)] rounded w-3/4" />
                <div className="h-2.5 bg-[var(--color-neutral-100)] rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : recs.length === 0 ? (
        <p className="text-[var(--text-xs)] text-[var(--color-neutral-400)] text-center py-4">
          {t("home.quickRecs.empty")}
        </p>
      ) : (
        <div className="space-y-0.5">
          {recs.map((rec) => <RecItem key={rec.id} rec={rec} />)}
        </div>
      )}

      <Link
        href="/home/recipes"
        className="block w-full text-center text-[var(--text-sm)] font-semibold text-[var(--color-neutral-500)] mt-3 pt-3 border-t border-[var(--color-neutral-100)] hover:text-[var(--color-brand-primary)] transition-colors"
      >
        {t("home.quickRecs.browseAll")}
      </Link>
    </Card>
  );
}
