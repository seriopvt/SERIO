"use client";

import React, { useState, useEffect } from "react";
import { Flame, Zap } from "lucide-react";
import { Card } from "@/components/ui";
import { useI18n } from "@/lib/i18n/I18nContext";

const WEEKLY_GOAL = 7;

// Returns today's day-of-week index (0 = Sun)
function todayDow() {
  return new Date().getDay();
}

// Returns an array of the last 7 day-of-week labels ending today
function getWeekLabels(daysOfWeek: string[]): string[] {
  const dow = todayDow();
  return Array.from({ length: 7 }, (_, i) => daysOfWeek[(dow - 6 + i + 7) % 7]);
}

// Which of the last 7 slots are "active" given a streak count
function getActiveSlots(streak: number): boolean[] {
  const clamped = Math.min(streak, 7);
  return Array.from({ length: 7 }, (_, i) => i >= 7 - clamped);
}

export default function CookingStreak() {
  const { t } = useI18n();
  const [streak, setStreak] = useState<number | null>(null);
  const [todayActive, setTodayActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/streak")
      .then((r) => r.json())
      .then((d) => {
        setStreak(d.streak ?? 0);
        setTodayActive(d.todayActive ?? false);
      })
      .catch(() => {
        setStreak(0);
      })
      .finally(() => setLoading(false));
  }, []);

  const daysOfWeek = [
    t("home.streak.dow.sun"),
    t("home.streak.dow.mon"),
    t("home.streak.dow.tue"),
    t("home.streak.dow.wed"),
    t("home.streak.dow.thu"),
    t("home.streak.dow.fri"),
    t("home.streak.dow.sat"),
  ];
  const labels = getWeekLabels(daysOfWeek);
  const activeSlots = getActiveSlots(streak ?? 0);
  const remaining = Math.max(0, WEEKLY_GOAL - (streak ?? 0));
  const pct = Math.min(100, ((streak ?? 0) / WEEKLY_GOAL) * 100);

  return (
    <Card>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[var(--color-brand-primary-light)] flex items-center justify-center">
            <Flame size={14} className="text-[var(--color-brand-primary)]" fill="currentColor" />
          </div>
          <h4 className="text-[var(--text-base)] font-bold text-[var(--color-neutral-900)]">
            {t("home.streak.title")}
          </h4>
        </div>
        {todayActive && (
          <span className="flex items-center gap-1 text-[11px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
            <Zap size={10} fill="currentColor" />
            {t("home.streak.activeToday")}
          </span>
        )}
      </div>

      {loading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-10 w-24 bg-[var(--color-neutral-100)] rounded" />
          <div className="flex gap-1.5">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex-1 h-7 bg-[var(--color-neutral-100)] rounded-full" />
            ))}
          </div>
          <div className="h-1.5 bg-[var(--color-neutral-100)] rounded-full" />
        </div>
      ) : (
        <>
          {/* Streak count */}
          <div className="flex items-end gap-2 mb-4">
            <span className="text-4xl font-extrabold text-[var(--color-brand-primary)] leading-none tabular-nums">
              {streak}
            </span>
            <span className="text-[var(--text-sm)] text-[var(--color-neutral-600)] pb-1">
              {t("home.streak.daysInRow", { suffix: streak !== 1 ? "s" : "" })}
            </span>
          </div>

          {/* Day bubbles */}
          <div className="flex gap-1.5 mb-3">
            {labels.map((label, i) => {
              const active = activeSlots[i];
              const isToday = i === 6;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full aspect-square rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: active
                        ? isToday
                          ? "var(--color-brand-primary)"
                          : "color-mix(in srgb, var(--color-brand-primary) 30%, white)"
                        : "var(--color-neutral-100)",
                    }}
                  >
                    {active && (
                      <Flame
                        size={10}
                        fill="currentColor"
                        className={isToday ? "text-white" : "text-[var(--color-brand-primary)]"}
                      />
                    )}
                  </div>
                  <span
                    className="text-[10px] font-semibold"
                    style={{
                      color: isToday
                        ? "var(--color-brand-primary)"
                        : "var(--color-neutral-600)",
                    }}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress bar to weekly goal */}
          <div className="h-1.5 bg-[var(--color-neutral-100)] rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${pct}%`,
                background: "linear-gradient(to right, var(--color-brand-primary), #f97316)",
              }}
            />
          </div>

          <p className="text-[11px] text-[var(--color-neutral-600)] mt-2">
            {remaining === 0
              ? t("home.streak.weeklyGoalReached")
              : t("home.streak.weeklyGoalRemaining", {
                  remaining: String(remaining),
                  suffix: remaining !== 1 ? "s" : "",
                })}
          </p>
        </>
      )}
    </Card>
  );
}
