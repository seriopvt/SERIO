"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  LogOut,
  Trash2,
  UserCircle2,
  ShieldAlert,
  Key,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Loader2,
  ExternalLink,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n/I18nContext";

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
  hasApiKey: boolean;
}

export default function AccountClient({ user, stats, hasApiKey: initialHasKey }: AccountClientProps) {
  const router = useRouter();
  const { t } = useI18n();

  // ── Delete account state ─────────────────────────────────────────────
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // ── API Key state ────────────────────────────────────────────────────
  const [hasKey, setHasKey] = useState(initialHasKey);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [keyStatus, setKeyStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [keyError, setKeyError] = useState("");
  const [isRemovingKey, setIsRemovingKey] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (showKeyModal) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setApiKeyInput("");
      setKeyStatus("idle");
      setKeyError("");
      setShowKey(false);
    }
  }, [showKeyModal]);

  // Close modal on Escape or outside click
  useEffect(() => {
    if (!showKeyModal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowKeyModal(false);
    };
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowKeyModal(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [showKeyModal]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  // ── Save API key ─────────────────────────────────────────────────────
  const handleSaveKey = async () => {
    if (!apiKeyInput.trim()) return;
    setKeyStatus("saving");
    setKeyError("");

    try {
      const res = await fetch("/api/account/api-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: apiKeyInput.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setKeyStatus("error");
        setKeyError(data.error || t("account.error.saveKeyFailed"));
        return;
      }

      setKeyStatus("success");
      setHasKey(true);
      // Auto-close after brief success flash
      setTimeout(() => {
        setShowKeyModal(false);
        router.refresh();
      }, 1200);
    } catch {
      setKeyStatus("error");
      setKeyError(t("account.error.network"));
    }
  };

  // ── Remove API key ───────────────────────────────────────────────────
  const handleRemoveKey = async () => {
    setIsRemovingKey(true);
    try {
      await fetch("/api/account/api-key", { method: "DELETE" });
      setHasKey(false);
      router.refresh();
    } catch {
      /* silent */
    } finally {
      setIsRemovingKey(false);
    }
  };

  // ── Delete account ───────────────────────────────────────────────────
  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      const res = await fetch("/api/account", { method: "DELETE" });
      if (!res.ok) throw new Error(t("account.error.deleteAccountInternal"));
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error(error);
      alert(t("account.error.deleteFailed"));
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="space-y-8 animate-fade-in">
        {/* Profile Section */}
        <section className="bg-[var(--color-surface-card)] rounded-[var(--radius-2xl)] p-6 border border-[var(--color-neutral-100)] flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-[var(--color-brand-primary-light)] text-[var(--color-brand-primary)] flex items-center justify-center font-bold text-3xl flex-shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--color-neutral-900)]">{user.name}</h2>
            <p className="text-[var(--color-neutral-700)]">{user.email}</p>
            <p className="text-sm text-[var(--color-neutral-700)] mt-1">{user.memberSince}</p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-[var(--color-surface-card)] rounded-[var(--radius-xl)] p-5 border border-[var(--color-neutral-100)]">
            <p className="text-[var(--color-neutral-700)] text-sm mb-1">{t("account.stats.saved")}</p>
            <p className="text-3xl font-bold text-[var(--color-neutral-900)]">{stats.savedRecipes}</p>
          </div>
          <div className="bg-[var(--color-surface-card)] rounded-[var(--radius-xl)] p-5 border border-[var(--color-neutral-100)]">
            <p className="text-[var(--color-neutral-700)] text-sm mb-1">{t("account.stats.activity")}</p>
            <p className="text-3xl font-bold text-[var(--color-neutral-900)]">{stats.activities}</p>
          </div>
        </section>

        {/* ── API Key Section ──────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-[var(--color-neutral-900)]">{t("account.aiSettings")}</h3>

          <div
            className={`
              bg-[var(--color-surface-card)] rounded-[var(--radius-xl)] border p-5
              ${!hasKey
                ? "border-amber-400/50 bg-amber-50/30 dark:bg-amber-900/10"
                : "border-[var(--color-neutral-100)]"
              }
            `}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                className={`
                  w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0
                  ${hasKey
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-amber-100 text-amber-600"
                  }
                `}
              >
                <Key size={20} />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-semibold text-[var(--color-neutral-900)]">{t("account.apiKey.title")}</p>
                  {hasKey ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-100 rounded-full px-2 py-0.5">
                      <CheckCircle2 size={11} />
                      {t("account.apiKey.connected")}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-100 rounded-full px-2 py-0.5">
                      <XCircle size={11} />
                      {t("account.apiKey.notSet")}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[var(--color-neutral-700)] leading-relaxed">
                  {hasKey
                    ? t("account.apiKey.descSet")
                    : t("account.apiKey.descUnset")}
                </p>
                {!hasKey && (
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[var(--color-brand-primary)] hover:underline mt-1.5"
                  >
                    {t("account.apiKey.getFree")}
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {hasKey && (
                  <button
                    onClick={handleRemoveKey}
                    disabled={isRemovingKey}
                    className="text-xs text-[var(--color-neutral-500)] hover:text-[var(--color-error)] transition-colors px-2 py-1.5 rounded-lg hover:bg-[var(--color-error)]/5 disabled:opacity-50"
                  >
                    {isRemovingKey ? t("common.removing") : t("common.remove")}
                  </button>
                )}
                <button
                  onClick={() => setShowKeyModal(true)}
                  className={`
                    text-sm font-semibold px-4 py-2 rounded-lg transition-colors
                    ${hasKey
                      ? "bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-200)]"
                      : "bg-[var(--color-brand-primary)] text-white hover:bg-[var(--color-brand-primary-hover)] shadow-[var(--shadow-brand)]"
                    }
                  `}
                >
                  {hasKey ? t("account.apiKey.update") : t("account.apiKey.add")}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Account Actions */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-[var(--color-neutral-900)]">{t("account.actions.title")}</h3>

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
                  <p className="font-semibold text-[var(--color-neutral-900)]">{t("account.actions.logoutTitle")}</p>
                  <p className="text-sm text-[var(--color-neutral-700)]">
                    {t("account.actions.logoutDesc")}
                  </p>
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="space-y-4 pt-4 border-t border-[var(--color-neutral-100)]">
          <h3 className="text-lg font-bold text-[var(--color-error)] flex items-center gap-2">
            <ShieldAlert size={20} />
            {t("account.danger.title")}
          </h3>

          <div className="bg-[var(--color-error)]/5 rounded-[var(--radius-xl)] border border-[var(--color-error)]/20 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-[var(--color-error)]">{t("account.danger.deleteTitle")}</p>
                <p className="text-sm text-[var(--color-neutral-700)] mt-1">
                  {t("account.danger.deleteDesc")}
                </p>
              </div>

              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex-shrink-0 px-4 py-2 bg-[var(--color-error)]/10 text-[var(--color-error)] font-semibold rounded-lg hover:bg-[var(--color-error)]/20 transition-colors"
                >
                  {t("common.delete")}
                </button>
              ) : (
                <div className="flex-shrink-0 flex items-center gap-2">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    autoFocus
                    className="px-4 py-2 bg-[var(--color-surface-card)] text-[var(--color-neutral-700)] font-semibold rounded-lg border border-[var(--color-neutral-200)] hover:bg-[var(--color-neutral-50)] transition-colors"
                  >
                    {t("common.cancel")}
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--color-error)] text-white font-semibold rounded-lg hover:opacity-90 transition-colors disabled:opacity-50"
                  >
                    {isDeleting ? t("common.deleting") : t("common.confirm")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          API Key Modal
      ═══════════════════════════════════════════════════════════════════ */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />

          {/* Modal */}
          <div
            ref={modalRef}
            className="
              relative z-10 w-full max-w-md
              bg-[var(--color-surface-card)]
              rounded-[var(--radius-2xl)]
              border border-[var(--color-neutral-100)]
              shadow-[var(--shadow-xl,0_20px_60px_rgba(0,0,0,0.18))]
              p-6
              animate-fade-in
            "
            style={{ animation: "slideUp 0.2s ease-out" }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowKeyModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-100)] transition-colors"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-[var(--color-brand-primary-light)] text-[var(--color-brand-primary)] flex items-center justify-center">
                <Key size={18} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[var(--color-neutral-900)]">
                  {hasKey ? t("account.modal.updateTitle") : t("account.modal.addTitle")}
                </h2>
                <p className="text-xs text-[var(--color-neutral-500)]">
                  {t("account.modal.encrypted")}
                </p>
              </div>
            </div>

            {/* Info callout */}
            <div className="bg-[var(--color-brand-primary-light)] rounded-[var(--radius-lg)] p-3.5 mb-5 text-sm text-[var(--color-brand-primary)] leading-relaxed">
              <strong>{t("account.modal.whereTitle")}</strong>{" "}
              {t("account.modal.whereBodyA")}{" "}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold hover:opacity-80"
              >
                {t("account.modal.whereBodyB")}
              </a>{" "}
              {t("account.modal.whereBodyC")}
            </div>

            {/* Input */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-[var(--color-neutral-700)] mb-1.5">
                {t("account.modal.inputLabel")}
              </label>
              <div className="relative">
                <input
                  ref={inputRef}
                  type={showKey ? "text" : "password"}
                  value={apiKeyInput}
                  onChange={(e) => {
                    setApiKeyInput(e.target.value);
                    setKeyStatus("idle");
                    setKeyError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && apiKeyInput.trim()) handleSaveKey();
                  }}
                  placeholder={t("account.modal.inputPlaceholder")}
                  className="
                    w-full px-4 py-3 pr-11
                    bg-[var(--color-neutral-50)]
                    border border-[var(--color-neutral-200)]
                    rounded-[var(--radius-lg)]
                    text-[var(--color-neutral-900)]
                    placeholder:text-[var(--color-neutral-400)]
                    focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/30 focus:border-[var(--color-brand-primary)]
                    transition-colors font-mono text-sm
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowKey((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-700)] transition-colors"
                >
                  {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Error message */}
              {keyStatus === "error" && (
                <p className="mt-2 text-sm text-[var(--color-error)] flex items-center gap-1.5">
                  <XCircle size={14} />
                  {keyError}
                </p>
              )}

              {/* Success message */}
              {keyStatus === "success" && (
                <p className="mt-2 text-sm text-emerald-600 flex items-center gap-1.5">
                  <CheckCircle2 size={14} />
                  {t("account.modal.success")}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowKeyModal(false)}
                className="flex-1 px-4 py-2.5 rounded-[var(--radius-lg)] border border-[var(--color-neutral-200)] text-[var(--color-neutral-700)] font-semibold text-sm hover:bg-[var(--color-neutral-50)] transition-colors"
              >
                {t("common.cancel")}
              </button>
              <button
                onClick={handleSaveKey}
                disabled={!apiKeyInput.trim() || keyStatus === "saving" || keyStatus === "success"}
                className="
                  flex-1 flex items-center justify-center gap-2
                  px-4 py-2.5 rounded-[var(--radius-lg)]
                  bg-[var(--color-brand-primary)] text-white
                  font-semibold text-sm
                  hover:bg-[var(--color-brand-primary-hover)]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-colors shadow-[var(--shadow-brand)]
                "
              >
                {keyStatus === "saving" ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    {t("common.saving")}
                  </>
                ) : keyStatus === "success" ? (
                  <>
                    <CheckCircle2 size={15} />
                    {t("common.saved")}
                  </>
                ) : (
                  t("account.modal.saveKey")
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
      `}</style>
    </>
  );
}
