"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useLoginForm() {
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

  function togglePassword() {
    setShowPassword((prev) => !prev);
  }

  return {
    showPassword,
    isLoading,
    error,
    handleSubmit,
    handleGoogleSignIn,
    togglePassword,
  };
}
