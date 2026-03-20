import React from "react";
import { Card } from "@/components/ui";

interface CookingStreakProps {
  days: number;
  goal: number;
}

export default function CookingStreak({ days, goal }: CookingStreakProps) {
  const remaining = Math.max(0, goal - days);

  return (
    <Card>
      <h4 className="text-[var(--text-base)] font-bold text-[var(--color-neutral-900)] mb-3">
        Cooking Streak
      </h4>
      <div className="flex items-end gap-2 mb-2">
        <span className="text-4xl font-extrabold text-[var(--color-brand-primary)] leading-none">
          {days}
        </span>
        <span className="text-[var(--text-base)] text-[var(--color-neutral-500)] pb-1">
          days in a row
        </span>
      </div>
      <p className="text-[12px] text-[var(--color-neutral-400)]">
        Cook {remaining} more days to reach your weekly goal!
      </p>
    </Card>
  );
}
