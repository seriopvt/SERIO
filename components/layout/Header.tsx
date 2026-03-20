"use client";

import React from "react";
import { Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui";

interface HeaderProps {
  greeting: string;
  subtitle: string;
}

export default function Header({ greeting, subtitle }: HeaderProps) {
  return (
    <header
      className="
        flex items-center justify-between
        px-8 py-5
        bg-[var(--color-surface-card)]
        border-b border-[var(--color-neutral-100)]
      "
    >
      <div>
        <h2 className="text-[var(--text-xl)] font-bold text-[var(--color-neutral-900)]">
          {greeting}
        </h2>
        <p className="text-[var(--text-base)] text-[var(--color-brand-primary)]">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="icon" size="md">
          <Bell size={18} />
        </Button>
        <Button variant="primary" size="md">
          <Plus size={16} />
          New Recipe
        </Button>
      </div>
    </header>
  );
}
