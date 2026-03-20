"use client";

import React from "react";
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  Settings,
  ShoppingBasket,
  ScanLine,
  Heart,
  ChevronDown,
} from "lucide-react";
import { Avatar } from "@/components/ui";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href?: string;
}

function SidebarItem({ icon, label, active = false }: SidebarItemProps) {
  return (
    <button
      className={`
        flex items-center gap-3 w-full text-left
        px-3 py-2.5 rounded-[var(--radius-xl)]
        text-[var(--text-base)] font-medium
        transition-colors duration-[var(--transition-base)]
        cursor-pointer
        ${
          active
            ? "bg-[var(--color-brand-primary-light)] text-[var(--color-brand-primary)]"
            : "text-[var(--color-neutral-500)] hover:bg-[var(--color-neutral-50)] hover:text-[var(--color-neutral-700)]"
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
}

export default function Sidebar() {
  return (
    <aside
      className="
        w-[var(--sidebar-width)] flex-shrink-0
        bg-[var(--color-surface-card)]
        border-r border-[var(--color-neutral-100)]
        flex flex-col justify-between
        py-6 px-4 fixed h-screen z-20
      "
    >
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 bg-[var(--color-brand-primary)] rounded-[var(--radius-lg)] flex items-center justify-center">
            <span className="text-white font-bold text-lg">✕</span>
          </div>
          <div>
            <h1 className="text-[var(--text-base)] font-bold text-[var(--color-neutral-900)] leading-none">
              SERIO
            </h1>
            <p className="text-[10px] text-[var(--color-neutral-400)] tracking-wider uppercase">
              Ethiopian Kitchen
            </p>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex flex-col gap-1">
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
          <SidebarItem icon={<BookOpen size={18} />} label="My Cookbook" />
          {/* <SidebarItem icon={<Sparkles size={18} />} label="Generate" /> */}
          <SidebarItem icon={<Settings size={18} />} label="Settings" />

          {/* Quick Access Divider */}
          <div className="mt-6 mb-2 px-3">
            <span className="text-[10px] font-semibold text-[var(--color-neutral-400)] uppercase tracking-wider">
              Quick Access
            </span>
          </div>

          <SidebarItem icon={<ShoppingBasket size={18} />} label="My Pantry" />
          <SidebarItem icon={<ScanLine size={18} />} label="Recent Scans" />
          <SidebarItem icon={<Heart size={18} />} label="Favorites" />
        </nav>
      </div>

      {/* User Profile */}
      <div
        className="
          flex items-center gap-3
          px-2 py-3 rounded-[var(--radius-xl)]
          hover:bg-[var(--color-neutral-50)]
          cursor-pointer transition-colors duration-[var(--transition-base)]
        "
      >
        <Avatar initials="AT" />
        <div className="flex-1 min-w-0">
          <p className="text-[var(--text-base)] font-semibold text-[var(--color-neutral-900)] truncate">
            Abeba T.
          </p>
          <p className="text-[var(--text-xs)] text-[var(--color-neutral-400)]">
            Pro Member
          </p>
        </div>
        <ChevronDown size={14} className="text-[var(--color-neutral-400)]" />
      </div>
    </aside>
  );
}
