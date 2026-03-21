"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  UtensilsCrossed,
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
  href: string;
  exact?: boolean;
}

function SidebarItem({ icon, label, href, exact = false }: SidebarItemProps) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`
        flex items-center gap-3 w-full
        px-3 py-2.5 rounded-[var(--radius-xl)]
        text-[var(--text-base)] font-medium
        transition-colors duration-[var(--transition-base)]
        ${
          active
            ? "bg-[var(--color-brand-primary-light)] text-[var(--color-brand-primary)]"
            : "text-[var(--color-neutral-500)] hover:bg-[var(--color-neutral-50)] hover:text-[var(--color-neutral-700)]"
        }
      `}
    >
      {icon}
      {label}
    </Link>
  );
}

interface SidebarProps {
  userName?: string;
  userEmail?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getDisplayName(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length <= 1) return name;
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}

export default function Sidebar({ userName = "", userEmail = "" }: SidebarProps) {
  const initials = userName ? getInitials(userName) : "??";
  const displayName = userName ? getDisplayName(userName) : userEmail || "User";

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
        <Link href="/home" className="flex items-center gap-2 mb-8 px-2">
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
        </Link>

        {/* Main Navigation */}
        <nav className="flex flex-col gap-1">
          <SidebarItem
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            href="/home"
            exact
          />
          <SidebarItem
            icon={<UtensilsCrossed size={18} />}
            label="Recipes"
            href="/home/recipes"
          />
          <SidebarItem
            icon={<BookOpen size={18} />}
            label="My Cookbook"
            href="/home/cookbook"
          />
          <SidebarItem
            icon={<Settings size={18} />}
            label="Settings"
            href="/home/settings"
          />

          {/* Quick Access Divider */}
          <div className="mt-6 mb-2 px-3">
            <span className="text-[10px] font-semibold text-[var(--color-neutral-400)] uppercase tracking-wider">
              Quick Access
            </span>
          </div>

          <SidebarItem
            icon={<ShoppingBasket size={18} />}
            label="My Pantry"
            href="/home/pantry"
          />
          <SidebarItem
            icon={<ScanLine size={18} />}
            label="Recent Scans"
            href="/home/scans"
          />
          <SidebarItem
            icon={<Heart size={18} />}
            label="Favorites"
            href="/home/favorites"
          />
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
        <Avatar initials={initials} />
        <div className="flex-1 min-w-0">
          <p className="text-[var(--text-base)] font-semibold text-[var(--color-neutral-900)] truncate">
            {displayName}
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
