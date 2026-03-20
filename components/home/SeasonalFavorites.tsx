"use client";

import React from "react";
import RecipeCard from "./RecipeCard";
import type { RecipeCardProps } from "./RecipeCard";

const SEASONAL_RECIPES: RecipeCardProps[] = [
  {
    image: "/images/doro-wat.png",
    title: "Holiday Doro Wat",
    description: "Slow-cooked chicken stew with...",
    rating: "4.8",
    time: "2h",
    tag: "High",
    tagType: "spicy",
  },
  {
    image: "/images/teff-injera.png",
    title: "Quick Teff Injera",
    description: "Simplified fermentation...",
    rating: "4.7",
    time: "24h",
    tag: "Fermented",
    tagType: "fermented",
  },
  {
    image: "/images/misir-wot.png",
    title: "Spicy Misir Wot",
    description: "Vegan red lentil stew rich in protei...",
    rating: "4.8",
    time: "45m",
    tag: "Vegan",
    tagType: "vegan",
  },
];

export default function SeasonalFavorites() {
  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[var(--text-lg)] font-bold text-[var(--color-neutral-900)]">
          Seasonal Favorites
        </h3>
        <button className="text-[var(--text-base)] font-semibold text-[var(--color-brand-primary)] hover:underline cursor-pointer">
          View All
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {SEASONAL_RECIPES.map((recipe) => (
          <RecipeCard key={recipe.title} {...recipe} />
        ))}
      </div>
    </section>
  );
}
