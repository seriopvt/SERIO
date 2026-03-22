"use client";

import React from "react";
import { Bell, Plus, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Link from "next/link";

interface HeaderProps {
  greeting: string;
  subtitle: string;
  hasApiKey?: boolean;
}

export default function Header({ greeting, subtitle, hasApiKey }: HeaderProps) {
  return (
    <header
      className="
        relative
        flex items-center justify-between
        px-8 py-5
        bg-[var(--color-surface-card)]
        border-b border-[var(--color-neutral-100)]
        transition-colors duration-300
      "
    >
      {hasApiKey === false && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pt-3 z-10">
          <Link 
            href="/home/account" 
            className="
              flex items-center gap-1.5 px-3.5 py-1.5 
              bg-amber-50 dark:bg-amber-900/30 
              text-amber-700 dark:text-amber-400 
              text-xs font-semibold 
              rounded-full border border-amber-200 dark:border-amber-800/50 
              shadow-sm hover:shadow hover:bg-amber-100 dark:hover:bg-amber-900/50 
              transition-all shrink-0 animate-in fade-in slide-in-from-top-2
            "
          >
            <AlertCircle size={14} className="text-amber-600 dark:text-amber-500" />
            Missing Gemini API Key
          </Link>
        </div>
      )}

      <div>
        <h2 className="text-[var(--text-xl)] font-bold text-[var(--color-neutral-900)]">
          {greeting}
        </h2>
        <p className="text-[var(--text-base)] text-[var(--color-brand-primary)]">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        {/* <Button variant="icon" size="md">
          <Bell size={18} />
        </Button>
        <Button variant="primary" size="md">
          <Plus size={16} />
          New Recipe
        </Button> */}
      </div>
    </header>
  );
}
