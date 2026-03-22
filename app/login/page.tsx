"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ArrowRight, ChefHat } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });

    setIsLoading(false);

    if (res?.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      router.push("/home");
    }
  }

  async function handleGoogleSignIn() {
    await signIn("google", { callbackUrl: "/home" });
  }

  return (
    <div className="min-h-screen flex font-[var(--font-family-sans)]">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex w-[45%] bg-gradient-to-br from-[#3a2a1a] to-[#1e1510] relative overflow-hidden flex-col justify-between p-12">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(232,101,44,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(232,101,44,0.1),transparent_50%)]" />

        <div className="relative z-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mb-16">
            <div className="w-9 h-9 bg-[var(--color-brand-primary)] rounded-[var(--radius-lg)] flex items-center justify-center">
              <ChefHat size={20} strokeWidth={2.5} className="text-white" />
            </div>
            <div>
              <span className="text-[var(--text-md)] font-bold text-white leading-none">
                SERIO
              </span>
            </div>
          </Link>

          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Welcome
            <br />
            Back, Chef.
          </h2>
          <p className="text-[var(--text-md)] text-white/60 max-w-sm leading-relaxed">
            Your pantry is waiting. Sign in to discover recipes tailored to what
            you have.
          </p>
        </div>

        {/* Bottom quote */}
        <div className="relative z-10">
          <div className="border-t border-white/10 pt-6">
            <p className="text-[var(--text-base)] text-white/50 italic">
              &ldquo;The secret of Ethiopian cooking is patience, love, and the
              right spices.&rdquo;
            </p>
            <p className="text-[var(--text-xs)] text-white/30 mt-2">
              — Traditional Proverb
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-[var(--color-surface-page)] relative">
        <div className="absolute top-6 right-6 z-50">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-[var(--color-brand-primary)] rounded-[var(--radius-lg)] flex items-center justify-center">
              <ChefHat size={18} strokeWidth={2.5} className="text-white" />
            </div>
            <span className="text-[var(--text-base)] font-bold text-[var(--color-neutral-900)]">
              SERIO
            </span>
          </div>

          <h1 className="text-2xl font-extrabold text-[var(--color-neutral-900)] mb-2">
            Sign In
          </h1>
          <p className="text-[var(--text-base)] text-[var(--color-neutral-500)] mb-8">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[var(--color-brand-primary)] font-semibold hover:underline"
            >
              Create one
            </Link>
          </p>

          {/* Google OAuth */}
          <button
            onClick={handleGoogleSignIn}
            className="
              w-full flex items-center justify-center gap-3
              bg-[var(--color-surface-card)] border border-[var(--color-neutral-200)]
              rounded-[var(--radius-xl)] px-4 py-3
              text-[var(--text-base)] font-semibold text-[var(--color-neutral-700)]
              hover:bg-[var(--color-neutral-50)] hover:border-[var(--color-neutral-300)]
              transition-all duration-[var(--transition-base)]
              cursor-pointer
              shadow-[var(--shadow-xs)]
            "
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[var(--color-neutral-200)]" />
            <span className="text-[var(--text-xs)] text-[var(--color-neutral-400)] font-medium uppercase tracking-wider">
              or
            </span>
            <div className="flex-1 h-px bg-[var(--color-neutral-200)]" />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 rounded-[var(--radius-lg)] bg-red-50 border border-red-200 text-[var(--text-base)] text-red-600">
              {error}
            </div>
          )}

          {/* Credentials Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-[var(--text-sm)] font-semibold text-[var(--color-neutral-700)] mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-neutral-500)]"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="
                    w-full pl-11 pr-4 py-3
                    bg-[var(--color-surface-card)] border border-[var(--color-neutral-200)]
                    rounded-[var(--radius-xl)]
                    text-[var(--text-base)] text-[var(--color-neutral-900)]
                    placeholder-[var(--color-neutral-500)]
                    focus:outline-none focus:border-[var(--color-brand-primary)]
                    focus:ring-2 focus:ring-[var(--color-brand-primary-shadow)]
                    transition-all duration-[var(--transition-base)]
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="text-[var(--text-sm)] font-semibold text-[var(--color-neutral-700)]"
                >
                  Password
                </label>
                {/* <a
                  href="#"
                  className="text-[var(--text-xs)] font-semibold text-[var(--color-brand-primary)] hover:underline"
                >
                  Forgot password?
                </a> */}
              </div>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-neutral-500)]"
                />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  className="
                    w-full pl-11 pr-11 py-3
                    bg-[var(--color-surface-card)] border border-[var(--color-neutral-200)]
                    rounded-[var(--radius-xl)]
                    text-[var(--text-base)] text-[var(--color-neutral-900)]
                    placeholder-[var(--color-neutral-500)]
                    focus:outline-none focus:border-[var(--color-brand-primary)]
                    focus:ring-2 focus:ring-[var(--color-brand-primary-shadow)]
                    transition-all duration-[var(--transition-base)]
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-neutral-500)] hover:text-[var(--color-neutral-700)] transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="
                w-full flex items-center justify-center gap-2
                bg-[var(--color-brand-primary)] text-white
                px-6 py-3 rounded-[var(--radius-xl)]
                text-[var(--text-base)] font-semibold
                hover:bg-[var(--color-brand-primary-hover)]
                transition-all duration-[var(--transition-base)]
                shadow-[var(--shadow-brand)]
                disabled:opacity-60 disabled:cursor-not-allowed
                cursor-pointer
              "
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* Google SVG icon */
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}