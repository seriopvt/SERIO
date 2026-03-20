"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useRegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Something went wrong. Please try again.");
        setIsLoading(false);
        return;
      }

      // Auto sign-in after successful registration
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      setIsLoading(false);

      if (signInRes?.error) {
        setError("Account created but sign-in failed. Please log in manually.");
      } else {
        router.push("/home");
      }
    } catch {
      setIsLoading(false);
      setError("Something went wrong. Please try again.");
    }
  }

  async function handleGoogleSignUp() {
    await signIn("google", { callbackUrl: "/home" });
  }

  function togglePassword() {
    setShowPassword((prev) => !prev);
  }

  return {
    showPassword,
    isLoading,
    error,
    handleSubmit,
    handleGoogleSignUp,
    togglePassword,
  };
}
