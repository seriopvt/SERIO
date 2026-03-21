"use client";

import React, { useState, useEffect } from "react";
import { RefreshCw, Sparkles } from "lucide-react";

interface Tip {
  id: number;
  tip: string;
  author?: string | null;
}

// Fallback tips while DB is being seeded or if fetch fails
const FALLBACK_TIPS: Tip[] = [
  {
    id: 0,
    tip: "Toast your Berbere spice mix in a dry pan before adding oil — it awakens the flavors and deepens the color.",
    author: "Traditional Kitchen",
  },
  {
    id: 1,
    tip: "Always caramelize your onions low and slow for Wot — the deeper the brown, the richer the stew.",
    author: "Chef Yohannes",
  },
  {
    id: 2,
    tip: "Add a splash of tej (honey wine) to your Doro Wat for a subtle sweetness that balances the heat.",
    author: "Addis Kitchen",
  },
  {
    id: 3,
    tip: "Rest your Injera batter at room temperature for 2–3 days for maximum sourness and fermentation.",
    author: "Traditional Kitchen",
  },
  {
    id: 4,
    tip: "Niter Kibbeh is the soul of Ethiopian cooking — make a big batch and refrigerate it for up to a month.",
    author: "Chef Tigist",
  },
];

export default function ChefSecret() {
  const [tip, setTip] = useState<Tip | null>(null);
  const [loading, setLoading] = useState(true);
  const [localIdx, setLocalIdx] = useState(0);

  const fetchTip = async () => {
    try {
      const res = await fetch("/api/tips/daily");
      const data = await res.json();
      if (data.tip) {
        setTip(data.tip);
        return;
      }
    } catch { /* fall through */ }
    // Use fallback keyed by day of year
    const day = Math.floor(Date.now() / 86_400_000);
    setTip(FALLBACK_TIPS[day % FALLBACK_TIPS.length]);
  };

  useEffect(() => {
    fetchTip().finally(() => setLoading(false));
  }, []);

  const cycleTip = () => {
    const nextIdx = (localIdx + 1) % FALLBACK_TIPS.length;
    setLocalIdx(nextIdx);
    setTip(FALLBACK_TIPS[nextIdx]);
  };

  const displayTip = tip ?? FALLBACK_TIPS[0];

  return (
    <div
      className="
        bg-gradient-to-br from-[#3a2a1a] to-[#2a1e12]
        rounded-[var(--radius-2xl)]
        p-5 text-white relative overflow-hidden
      "
    >
      {/* Background decoration */}
      <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-orange-500/10 pointer-events-none" />
      <div className="absolute -bottom-6 -left-3 w-16 h-16 rounded-full bg-orange-600/8 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
            <Sparkles size={12} className="text-orange-300" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-orange-300">
            Chef&apos;s Secret
          </p>
        </div>
        <button
          onClick={cycleTip}
          aria-label="Next tip"
          className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
        >
          <RefreshCw size={11} className="text-white/70" />
        </button>
      </div>

      {/* Tip text */}
      {loading ? (
        <div className="animate-pulse space-y-2 mb-3">
          <div className="h-3 bg-white/10 rounded w-full" />
          <div className="h-3 bg-white/10 rounded w-5/6" />
          <div className="h-3 bg-white/10 rounded w-4/6" />
        </div>
      ) : (
        <p className="text-[var(--text-sm)] leading-relaxed text-white/90 mb-3 relative z-10">
          &ldquo;{displayTip.tip}&rdquo;
        </p>
      )}

      {/* Author */}
      {displayTip.author && (
        <p className="text-[11px] text-orange-300/70 font-medium relative z-10">
          — {displayTip.author}
        </p>
      )}
    </div>
  );
}
