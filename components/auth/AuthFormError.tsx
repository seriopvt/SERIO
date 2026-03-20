import React from "react";

interface AuthFormErrorProps {
  message: string;
}

export default function AuthFormError({ message }: AuthFormErrorProps) {
  if (!message) return null;

  return (
    <div className="mb-4 p-3 rounded-[var(--radius-lg)] bg-red-50 border border-red-200 text-[var(--text-base)] text-red-600">
      {message}
    </div>
  );
}
