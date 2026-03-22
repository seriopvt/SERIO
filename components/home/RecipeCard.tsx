import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Clock, Flame, Leaf } from "lucide-react";
import { FlameKindling } from "lucide-react";

export type RecipeTagType = "spicy" | "fermented" | "vegan";

export interface RecipeCardProps {
  image: string;
  title: string;
  description: string;
  rating: string;
  time: string;
  tag: string;
  tagType: RecipeTagType;
  href?: string;
}

const tagIcons: Record<RecipeTagType, React.ReactNode> = {
  spicy: <Flame size={12} className="text-[var(--color-accent-red)]" />,
  fermented: <FlameKindling size={12} className="text-[var(--color-accent-amber)]" />,
  vegan: <Leaf size={12} className="text-[var(--color-accent-green)]" />,
};

export default function RecipeCard({
  image,
  title,
  description,
  rating,
  time,
  tag,
  tagType,
  href,
}: RecipeCardProps) {
  return (
    <Link
      href={href || `/home/recipes?q=${encodeURIComponent(title)}`}
      className="
        bg-[var(--color-surface-card)]
        rounded-[var(--radius-2xl)] border border-[var(--color-neutral-100)]
        shadow-[var(--shadow-sm)] overflow-hidden
        group hover:shadow-[var(--shadow-md)]
        transition-shadow duration-[var(--transition-base)]
        block cursor-pointer
      "
    >
      {/* Image */}
      <div className="relative h-[160px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-[var(--transition-slow)]"
        />
        <button
          className="
            absolute top-3 right-3
            w-8 h-8 rounded-full
            bg-white/90 backdrop-blur-sm
            flex items-center justify-center
            hover:bg-white transition-colors
            shadow-[var(--shadow-xs)]
            cursor-pointer
          "
        >
          <Heart size={16} className="text-[var(--color-neutral-400)]" />
        </button>
      </div>

      {/* Details */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-bold text-[var(--text-base)] text-[var(--color-neutral-900)]">
            {title}
          </h4>
          <div className="flex items-center gap-1">
            <span className="text-[var(--color-warning)] text-[var(--text-xs)]">★</span>
            <span className="text-[var(--text-xs)] font-semibold text-[var(--color-neutral-600)]">
              {rating}
            </span>
          </div>
        </div>

        <p className="text-[12px] text-[var(--color-neutral-400)] mb-3 line-clamp-1">
          {description}
        </p>

        <div className="flex items-center gap-3 text-[var(--text-xs)] text-[var(--color-neutral-400)]">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1">
            {tagIcons[tagType]}
            <span>{tag}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
