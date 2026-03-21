"use client";

import React, { useState } from "react";
import { LogOut, Trash2, UserCircle2, ShieldAlert } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AccountClientProps {
  user: {
    name: string;
    email: string;
    memberSince: string;
  };
  stats: {
    savedRecipes: number;
    activities: number;
  };
}

export default function AccountClient({ user, stats }: AccountClientProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      const res = await fetch("/api/account", {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete account");
      }

      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error(error);
      alert("Failed to delete your account. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Profile Section */}
      <section className="bg-[var(--color-surface-card)] rounded-[var(--radius-2xl)] p-6 border border-[var(--color-neutral-100)] flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-[var(--color-brand-primary-light)] text-[var(--color-brand-primary)] flex items-center justify-center font-bold text-3xl">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-bold text-[var(--color-neutral-900)]">
            {user.name}
          </h2>
          <p className="text-[var(--color-neutral-500)]">{user.email}</p>
          <p className="text-sm text-[var(--color-neutral-400)] mt-1">
            {user.memberSince}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-[var(--color-surface-card)] rounded-[var(--radius-xl)] p-5 border border-[var(--color-neutral-100)]">
          <p className="text-[var(--color-neutral-500)] text-sm mb-1">Saved Recipes</p>
          <p className="text-3xl font-bold text-[var(--color-neutral-900)]">
            {stats.savedRecipes}
          </p>
        </div>
        <div className="bg-[var(--color-surface-card)] rounded-[var(--radius-xl)] p-5 border border-[var(--color-neutral-100)]">
          <p className="text-[var(--color-neutral-500)] text-sm mb-1">Activity Days</p>
          <p className="text-3xl font-bold text-[var(--color-neutral-900)]">
            {stats.activities}
          </p>
        </div>
      </section>

      {/* Settings Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-[var(--color-neutral-900)]">
          Account Actions
        </h3>
        
        <div className="bg-[var(--color-surface-card)] rounded-[var(--radius-xl)] border border-[var(--color-neutral-100)] overflow-hidden">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-4 hover:bg-[var(--color-neutral-50)] transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-neutral-100)] flex items-center justify-center text-[var(--color-neutral-700)]">
                <LogOut size={20} />
              </div>
              <div>
                <p className="font-semibold text-[var(--color-neutral-900)]">
                  Log Out
                </p>
                <p className="text-sm text-[var(--color-neutral-500)]">
                  Sign out of your account on this device
                </p>
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="space-y-4 pt-4 border-t border-[var(--color-neutral-100)]">
        <h3 className="text-lg font-bold text-red-600 flex items-center gap-2">
          <ShieldAlert size={20} />
          Danger Zone
        </h3>
        
        <div className="bg-red-50 rounded-[var(--radius-xl)] border border-red-100 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-red-900">
                Delete Account
              </p>
              <p className="text-sm text-red-700 mt-1">
                Permanently delete your account and all associated data, including
                saved recipes and history. This action cannot be undone.
              </p>
            </div>
            
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex-shrink-0 px-4 py-2 bg-red-100 text-red-600 font-semibold rounded-lg hover:bg-red-200 transition-colors"
              >
                Delete
              </button>
            ) : (
              <div className="flex-shrink-0 flex items-center gap-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  autoFocus
                  className="px-4 py-2 bg-white text-neutral-600 font-semibold rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Confirm"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
