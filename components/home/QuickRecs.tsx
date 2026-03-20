"use client";

import React from "react";
import Image from "next/image";
import { RefreshCw } from "lucide-react";
import { Card, ProgressBar } from "@/components/ui";

interface QuickRecItemData {
  image: string;
  title: string;
  subtitle: string;
  match: number;
}

const QUICK_RECS: QuickRecItemData[] = [
  {
    image: "/images/awaze-tibs.png",
    title: "Awaze Tibs",
    subtitle: "Based on your pantry",
    match: 95,
  },
  {
    image: "/images/atkilt-wot.png",
    title: "Atkilt Wot",
    subtitle: "Use your carrots",
    match: 88,
  },
  {
    image: "/images/timatim-salata.png",
    title: "Timatim Salata",
    subtitle: "Quick & Light",
    match: 82,
  },
];

function QuickRecItem({ image, title, subtitle, match }: QuickRecItemData) {
  return (
    <div
      className="
        flex items-center gap-3 mb-3
        p-2 rounded-[var(--radius-xl)]
        hover:bg-[var(--color-neutral-50)]
        transition-colors duration-[var(--transition-base)]
        cursor-pointer
      "
    >
      <div className="w-12 h-12 rounded-[var(--radius-xl)] overflow-hidden flex-shrink-0 relative">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[var(--text-base)] font-semibold text-[var(--color-neutral-900)]">
          {title}
        </p>
        <p className="text-[var(--text-xs)] text-[var(--color-neutral-400)] truncate">
          {subtitle}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <ProgressBar value={match} />
          <span className="text-[10px] font-semibold text-[var(--color-brand-primary)]">
            {match}% Match
          </span>
        </div>
      </div>
    </div>
  );
}

export default function QuickRecs() {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-[var(--text-base)] font-bold text-[var(--color-neutral-900)]">
          Quick Recs
        </h4>
        <button className="text-[var(--color-brand-primary)] hover:rotate-180 transition-transform duration-[var(--transition-slow)] cursor-pointer">
          <RefreshCw size={16} />
        </button>
      </div>

      {QUICK_RECS.map((item) => (
        <QuickRecItem key={item.title} {...item} />
      ))}

      <button className="w-full text-center text-[var(--text-base)] font-semibold text-[var(--color-neutral-500)] mt-3 py-2 hover:text-[var(--color-brand-primary)] transition-colors cursor-pointer">
        View Full List
      </button>
    </Card>
  );
}
