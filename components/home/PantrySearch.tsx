"use client";

import React from "react";
import { Card, Badge, SearchInput, Button } from "@/components/ui";

const COMMON_INGREDIENTS = [
  ["Berbere", "Shiro Powder", "Red Onions"],
  ["Garlic", "Teff"],
];

export default function PantrySearch() {
  return (
    <Card padding="lg" className="mb-8">
      <h3 className="text-[var(--text-xl)] font-bold text-[var(--color-neutral-900)] text-center mb-1">
        What&apos;s in your pantry?
      </h3>
      <p className="text-[var(--text-base)] text-[var(--color-neutral-500)] text-center mb-6">
        Enter ingredients to generate traditional Ethiopian recipes instantly.
      </p>

      {/* Search Row */}
      <div className="flex items-center gap-3 mb-4">
        <SearchInput
          placeholder="e.g. teff flour, berbere, garlic..."
          className="flex-1"
        />
        <Button variant="primary" size="lg">
          Inspire Me
        </Button>
      </div>

      {/* Common Ingredients */}
      <div className="text-center">
        <p className="text-[var(--text-xs)] font-semibold text-[var(--color-brand-primary)] uppercase tracking-wider mb-3">
          Common Ingredients
        </p>
        {COMMON_INGREDIENTS.map((row, i) => (
          <div key={i} className="flex items-center justify-center gap-2 flex-wrap mb-2">
            {row.map((ingredient) => (
              <Badge key={ingredient} label={ingredient} />
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
}
